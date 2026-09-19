// Linka, no corpo de serviços, blog, cidades e bairros, a primeira menção de cada material
// (granito, mármore, quartzito, quartzo, porcelanato, supernano) para a página do material.
// Regras: só dentro de <p>/<li> do conteúdo; nunca dentro de links, títulos ou CTAs;
// no máximo 1 link por material e 4 materiais por página; "quartzo" não é linkado no blog
// (ali aparece como mineral do granito). Idempotente.
// Uso: node tools/aplicar-links-materiais.js   (rodar na raiz, depois de gerar-paginas-materiais.js)

const fs = require('fs');
const path = require('path');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';
const MAX_POR_PAGINA = 4;

const MATERIAIS = [
  { slug: 'granito', nome: 'Granito', re: /(?<![\p{L}])granitos?(?![\p{L}])/iu },
  { slug: 'marmore', nome: 'Mármore', re: /(?<![\p{L}])m[áa]rmores?(?![\p{L}])/iu },
  { slug: 'quartzito', nome: 'Quartzito', re: /(?<![\p{L}])quartzitos?(?![\p{L}])/iu },
  { slug: 'quartzo', nome: 'Quartzo', re: /(?<![\p{L}])quartzo(?![\p{L}])/iu },
  { slug: 'porcelanato', nome: 'Porcelanato', re: /(?<![\p{L}])porcelanatos?(?![\p{L}])/iu },
  { slug: 'supernano', nome: 'Supernano', re: /(?<![\p{L}])supernano(?![\p{L}])/iu },
  { slug: 'silestone', nome: 'Silestone', re: /(?<![\p{L}])silestone(?![\p{L}])/iu },
  { slug: 'nanoglass', nome: 'Nanoglass', re: /(?<![\p{L}])nanoglass(?![\p{L}])/iu },
  { slug: 'dekton', nome: 'Dekton', re: /(?<![\p{L}])dekton(?![\p{L}])/iu },
  { slug: 'travertino', nome: 'Travertino', re: /(?<![\p{L}])travertinos?(?![\p{L}])/iu },
  { slug: 'ardosia', nome: 'Ardósia', re: /(?<![\p{L}])ard[óo]sias?(?![\p{L}])/iu },
  { slug: 'onix', nome: 'Ônix', re: /(?<![\p{L}])[ôo]nix(?![\p{L}])/iu },
];

function paginas(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'wp-content' || e.name === 'materiais') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) paginas(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

let total = 0, arquivos = 0;
for (const f of paginas(SITE)) {
  const rel = path.relative(SITE, f).split(path.sep).join('/');
  if (!/^(servico|blog|regioes-atendidas|bairros)\/./.test(rel) || rel.startsWith('blog/page/')) continue;

  let h = fs.readFileSync(f, 'utf8');
  const ini = h.indexOf('<div class="writen_content">');
  const fim = h.indexOf('</main>');
  if (ini < 0 || fim < 0) continue;
  let corpo = h.slice(ini, fim);

  const prefixo = '../'.repeat(rel.split('/').length - 1);
  const feitos = new Set(MATERIAIS.filter(m => corpo.includes(`materiais/${m.slug}/index.html`)).map(m => m.slug));
  const ehBlog = rel.startsWith('blog/');
  let novos = 0;

  corpo = corpo.replace(/<(p|li)(\s[^>]*)?>[\s\S]*?<\/\1>/g, bloco => {
    if (feitos.size >= MAX_POR_PAGINA || /text-align:\s*center/.test(bloco.slice(0, 80))) return bloco;
    let prof = 0;
    return bloco.split(/(<[^>]+>)/).map(parte => {
      if (parte.startsWith('<')) {
        if (/^<a[\s>]/i.test(parte)) prof++;
        else if (/^<\/a>/i.test(parte)) prof--;
        return parte;
      }
      if (prof > 0 || feitos.size >= MAX_POR_PAGINA) return parte;
      for (const m of MATERIAIS) {
        if (feitos.has(m.slug) || (ehBlog && m.slug === 'quartzo')) continue;
        const hit = m.re.exec(parte);
        if (!hit) continue;
        feitos.add(m.slug);
        novos++;
        const a = `<a href="${prefixo}materiais/${m.slug}/index.html" title="${m.nome}">${hit[0]}</a>`;
        parte = parte.slice(0, hit.index) + a + parte.slice(hit.index + hit[0].length);
        if (feitos.size >= MAX_POR_PAGINA) break;
      }
      return parte;
    }).join('');
  });

  if (novos) {
    fs.writeFileSync(f, h.slice(0, ini) + corpo + h.slice(fim));
    total += novos;
    arquivos++;
  }
}
console.log(`links inseridos: ${total} em ${arquivos} páginas`);
