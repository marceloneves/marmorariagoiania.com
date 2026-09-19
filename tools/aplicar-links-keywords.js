// Distribui as palavras de keywords-hiperlinks pelas páginas de serviço, material, bairro e cidade,
// cada uma linkada para a sua página contextual (abrangentes -> página principal).
// Garantias:
//   - cada página recebe 1 palavra abrangente (rotacionando as 12, sem repetir "Marmoraria Goiânia" em tudo)
//     e ao menos 1 específica relacionada ao tema da página (nunca linkando para si mesma);
//   - TODAS as palavras da lista aparecem linkadas em pelo menos uma página (o script falha se sobrar alguma).
// Usa a primeira ocorrência natural do termo no texto; se não houver, acrescenta uma frase curta
// (<p data-kwp="1">) antes do CTA final. Os links levam data-kw="1". Idempotente: a cada execução
// remove o que ele mesmo criou antes e refaz a distribuição.
// Uso: node tools/aplicar-links-keywords.js [--survey]   (rodar por último, depois dos geradores)

const fs = require('fs');
const path = require('path');
const { SITE, alvo, lista } = require('./keywords-alvos');
const { bairros } = require('./bairros-conteudo');
const { cidades } = require('./cidades-conteudo');

const SURVEY = process.argv.includes('--survey');
const escopo = /^(servico|materiais|bairros|regioes-atendidas)\/[^/]+\/index\.html$/;
const MAX_ESPECIFICAS = 3;

const abrangentes = lista.filter(k => alvo[k] === 'index.html');
const especificas = lista.filter(k => alvo[k] !== 'index.html');
const tit = k => (k[0].toUpperCase() + k.slice(1)).split('goiânia').join('Goiânia');
const txt = k => k.split('goiânia').join('Goiânia');
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const reDe = k => new RegExp('(?<![\\p{L}])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}])', 'iu');

// ---------- páginas ----------
function paginas(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'wp-content') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) paginas(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const cortes = h => ({ ini: h.indexOf('<div class="writen_content">'), fim: h.indexOf('</main>') });

const INICIOS_ANTIGOS = /^<p>(?:Pedido frequente|Para complementar o projeto|Se você procura a|Quer contratar a|Procurando|Para quem busca)/;
function limpar(corpo) {
  corpo = corpo.replace(/<p data-kwp="1">[\s\S]*?<\/p>/g, '');
  corpo = corpo.replace(/<p>[\s\S]*?<\/p>/g, b => (b.includes('data-kw="1"') && b.length < 700 && INICIOS_ANTIGOS.test(b) ? '' : b));
  return corpo.replace(/<a href="[^"]*" title="[^"]*" data-kw="1">([^<]*)<\/a>/g, '$1');
}

const paginasEscopo = paginas(SITE)
  .map(f => ({ f, rel: path.relative(SITE, f).split(path.sep).join('/') }))
  .filter(p => escopo.test(p.rel))
  .sort((a, b) => a.rel.localeCompare(b.rel));

for (const p of paginasEscopo) {
  p.html = fs.readFileSync(p.f, 'utf8');
  const { ini, fim } = cortes(p.html);
  if (ini < 0 || fim < 0) throw new Error('sem corpo: ' + p.rel);
  p.ini = ini;
  p.fim = fim;
  p.corpo = limpar(p.html.slice(ini, fim));
  p.h1 = (p.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, '');
  p.dir = p.rel.replace(/\/index\.html$/, '');
}

// ---------- afinidade palavra x página ----------
const PARADAS = new Set(['de', 'em', 'para', 'com', 'e', 'a', 'o', 'sob', 'medida', 'goiania', 'preco', 'perto', 'mim', 'do', 'da', 'no', 'na', 'pedra', 'pedras', 'marmoraria']);
const tokens = s => new Set(norm(s).split(/[^a-z0-9]+/).filter(t => t && !PARADAS.has(t)).map(t => (t.length > 4 ? t.replace(/s$/, '') : t)));
const GRUPOS = [
  ['granito', 'marmore', 'quartzito', 'quartzo', 'silestone'],
  ['porcelanato', 'dekton', 'nanoglass', 'supernano'],
  ['travertino', 'limestone', 'calcario', 'ardosia', 'onix'],
];
const grupoDe = t => GRUPOS.findIndex(g => [...t].some(x => g.includes(x)));
const TEMAS = {
  cozinha: ['bancada', 'cozinha', 'ilha', 'gourmet', 'churrasqueira', 'balcao', 'tampa', 'pia'],
  banheiro: ['pia', 'lavatorio', 'cuba', 'nicho', 'banheiro', 'lavabo', 'bancada'],
  piso: ['piso', 'revestimento', 'rodape', 'soleira', 'escada', 'degrau', 'peitoril', 'pingadeira', 'moldura'],
  externo: ['fachada', 'soleira', 'peitoril', 'pingadeira', 'escada', 'churrasqueira', 'travertino', 'ardosia'],
  cuidado: ['polimento', 'restauracao', 'impermeabilizacao', 'cristalizacao', 'manutencao', 'instalacao', 'montagem', 'corte', 'cnc', 'medicao', 'projeto', 'obra'],
  decor: ['mesa', 'lareira', 'aparador', 'painel', 'tampo', 'onix', 'detalhe', 'decorativo', 'revestimento'],
};
const temasDe = t => new Set(Object.entries(TEMAS).filter(([, v]) => [...t].some(x => v.includes(x))).map(([k]) => k));
const FUNERARIAS = new Set(['mármore para túmulo', 'granito para túmulo', 'lápide de granito', 'lápide de granito goiânia', 'placa de granito para túmulo']);

for (const p of paginasEscopo) {
  p.tok = tokens(`${p.dir} ${p.h1}`);
  const dados = p.dir.startsWith('bairros/') ? bairros.find(b => p.dir.endsWith(b.slug))
    : p.dir.startsWith('regioes-atendidas/') ? cidades.find(c => p.dir.endsWith(c.slug)) : null;
  if (dados) p.tok = new Set([...p.tok, ...tokens(dados.demandas.map(d => d[0][1]).join(' '))]);
  p.grupo = grupoDe(p.tok);
  p.temas = temasDe(p.tok);
}

function afinidade(k, p) {
  if (alvo[k] === p.rel) return -1;
  const tk = tokens(k);
  let s = 0;
  for (const t of tk) if (p.tok.has(t)) s += 2;
  const g = grupoDe(tk);
  if (g >= 0 && g === p.grupo) s += 2;
  for (const t of temasDe(tk)) if (p.temas.has(t)) s += 3;
  return s;
}

// ---------- distribuição ----------
const usoEsp = new Map(paginasEscopo.map(p => [p.rel, []]));
const usoKw = new Map(especificas.map(k => [k, 0]));
// palavras funerárias só fazem sentido nas páginas de granito e mármore (uma cita a outra)
const funHost = {
  'materiais/marmore/index.html': especificas.filter(k => FUNERARIAS.has(k) && alvo[k] === 'materiais/granito/index.html'),
  'materiais/granito/index.html': especificas.filter(k => FUNERARIAS.has(k) && alvo[k] === 'materiais/marmore/index.html'),
};

// passo A: cada palavra específica vai para a página mais afim (com carga balanceada)
for (const k of [...especificas].filter(k => !FUNERARIAS.has(k)).sort((a, b) => b.length - a.length)) {
  let melhor = null, mScore = -Infinity;
  for (const p of paginasEscopo) {
    const carga = usoEsp.get(p.rel).length;
    if (carga >= MAX_ESPECIFICAS) continue;
    const s = afinidade(k, p);
    if (s < 0) continue;
    const total = s * 10 - carga * 6;
    if (total > mScore) { mScore = total; melhor = p; }
  }
  if (!melhor) throw new Error('nenhuma página hospeda: ' + k);
  usoEsp.get(melhor.rel).push(k);
  usoKw.set(k, usoKw.get(k) + 1);
}
// passo B: páginas sem nenhuma específica recebem a mais afim (menos usada)
for (const p of paginasEscopo) {
  if (usoEsp.get(p.rel).length) continue;
  const c = especificas
    .map(k => ({ k, s: afinidade(k, p), u: usoKw.get(k) }))
    .filter(x => x.s >= 0 && !FUNERARIAS.has(x.k))
    .sort((a, b) => b.s - a.s || a.u - b.u || a.k.localeCompare(b.k))[0];
  usoEsp.get(p.rel).push(c.k);
  usoKw.set(c.k, usoKw.get(c.k) + 1);
}
// abrangentes: rotação estável pela ordem das páginas
paginasEscopo.forEach((p, i) => { p.abr = abrangentes[i % abrangentes.length]; });

// ---------- aplicação ----------
const locais = {};
for (const b of bairros) locais[`bairros/marmoraria-no-${b.slug}`] = `no ${b.nome}`;
for (const c of cidades) locais[`regioes-atendidas/marmoraria-em-${c.slug}`] = `em ${c.nome}`;

const fraseEsp = [
  a => `Procurando por ${a}? Veja detalhes, vantagens e cuidados na página dedicada.`,
  a => `Quem busca ${a} também encontra orientações sobre materiais, medidas e instalação.`,
  a => `Para quem pesquisa ${a}, preparamos uma página com as principais dúvidas e opções.`,
  a => `Veja também a nossa página de ${a}, com informações para planejar o projeto.`,
];
const fraseFun = a => `A mesma pedra também é usada em projetos funerários: veja ${a}.`;
const fraseAbr = [
  (a, em) => `Se você procura por ${a}${em}, a Marmoraria Goiânia atende com visita técnica e orçamento.`,
  (a, em) => `Buscando ${a}${em}? Fale com a nossa equipe e peça um orçamento.`,
  (a, em) => `Para quem pesquisa ${a}${em}, o atendimento começa com uma visita técnica sem complicação.`,
  (a, em) => `Precisa de ${a}${em}? A equipe faz a medição no local e cuida de todo o projeto.`,
];

function varrer(corpo, fn) {
  return corpo.replace(/<(p|li)(\s[^>]*)?>[\s\S]*?<\/\1>/g, bloco => {
    if (/text-align:\s*center/.test(bloco.slice(0, 80))) return bloco;
    let prof = 0;
    return bloco.split(/(<[^>]+>)/).map(parte => {
      if (parte.startsWith('<')) {
        if (/^<a[\s>]/i.test(parte)) prof++;
        else if (/^<\/a>/i.test(parte)) prof--;
        return parte;
      }
      return prof > 0 ? parte : fn(parte);
    }).join('');
  });
}

function linkarNatural(corpo, k, href) {
  let feito = false;
  const re = reDe(k);
  const novo = varrer(corpo, parte => {
    if (feito) return parte;
    const m = re.exec(parte);
    if (!m) return parte;
    if (k === 'marmoraria' && /^\s+Goiânia/.test(parte.slice(m.index + m[0].length))) return parte;
    feito = true;
    return parte.slice(0, m.index) + `<a href="${href}" title="${tit(k)}" data-kw="1">${m[0]}</a>` + parte.slice(m.index + m[0].length);
  });
  return feito ? novo : null;
}

const listar = a => (a.length > 1 ? a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1] : a[0]);
const cobertura = new Map();
let naturais = 0, frases = 0;

paginasEscopo.forEach((p, i) => {
  const href = k => path.posix.relative(path.posix.dirname(p.rel), alvo[k]);
  const em = locais[p.dir] ? ' ' + locais[p.dir] : '';
  const sentencas = [];
  let corpo = p.corpo;

  [...usoEsp.get(p.rel), p.abr].forEach((k, j) => {
    if (alvo[k] === p.rel) throw new Error(`${p.rel}: ${k} aponta para a própria página`);
    cobertura.set(k, (cobertura.get(k) || 0) + 1);
    const nat = linkarNatural(corpo, k, href(k));
    if (nat) { corpo = nat; naturais++; return; }
    const a = `<a href="${href(k)}" title="${tit(k)}" data-kw="1">${txt(k)}</a>`;
    if (k === p.abr) sentencas.push(fraseAbr[(i + j) % fraseAbr.length](a, em));
    else if (FUNERARIAS.has(k)) sentencas.push(fraseFun(a));
    else sentencas.push(fraseEsp[(i + j) % fraseEsp.length](a));
    frases++;
  });

  if (funHost[p.rel]) {
    const links = funHost[p.rel].map(k => { cobertura.set(k, (cobertura.get(k) || 0) + 1); return `<a href="${href(k)}" title="${tit(k)}" data-kw="1">${txt(k)}</a>`; });
    sentencas.push(p.rel.includes('marmore') ? `Em projetos funerários, o granito é a pedra mais usada: veja ${listar(links)}.` : `Para jazigos e túmulos, o mármore também é uma opção: veja ${links[0]}.`);
    frases++;
  }
  if (sentencas.length) {
    const par = `<p data-kwp="1">${sentencas.join(' ')}</p>`;
    const cta = corpo.lastIndexOf('<h2 style="text-align:center">');
    if (cta > corpo.length / 2) corpo = corpo.slice(0, cta) + par + corpo.slice(cta);
    else {
      const u = corpo.lastIndexOf('</p>') + 4;
      corpo = corpo.slice(0, u) + par + corpo.slice(u);
    }
  }
  p.novo = p.html.slice(0, p.ini) + corpo + p.html.slice(p.fim);
});

const faltando = lista.filter(k => !cobertura.get(k));
if (faltando.length) throw new Error('palavras sem hiperlink em nenhuma página: ' + faltando.join(', '));

if (!SURVEY) for (const p of paginasEscopo) if (p.novo !== p.html) fs.writeFileSync(p.f, p.novo);

const abrUso = {};
for (const p of paginasEscopo) abrUso[p.abr] = (abrUso[p.abr] || 0) + 1;
console.log(`páginas: ${paginasEscopo.length} | links naturais: ${naturais} | frases novas: ${frases} | palavras da lista cobertas: ${lista.length - faltando.length}/${lista.length}`);
console.log('abrangentes por palavra:', JSON.stringify(abrUso));
console.log('específicas usadas mais de uma vez:', [...usoKw].filter(([, n]) => n > 1).length, '| páginas com >1 específica:', [...usoEsp.values()].filter(a => a.length > 1).length);
