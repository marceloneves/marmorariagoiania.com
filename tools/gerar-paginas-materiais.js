// Gera materiais/index.html (índice + comparativo) e materiais/<slug>/index.html.
// Usa a página de Trindade como modelo das páginas internas e a de Regiões como modelo do índice.
// Uso: node tools/gerar-paginas-materiais.js   (rodar na raiz do repositório)
// Idempotente. Rode antes de aplicar-links-materiais.js e aplicar-metas-seo.js.

const fs = require('fs');
const path = require('path');
const { materiais, BLOG } = require('./materiais-conteudo');
const { bairros, S } = require('./bairros-conteudo');
const { cidades } = require('./cidades-conteudo');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';
const BASE = 'https://marmorariagoiania.com';
const HOJE = '2026-09-19T12:00:00-03:00';
const WA = 'https://api.whatsapp.com/send?phone=556292861117&amp;text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20pelo%20site';

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const porSlug = Object.fromEntries(materiais.map(m => [m.slug, m]));
const bairroPorSlug = Object.fromEntries(bairros.map(b => [b.slug, b]));
const cidadePorSlug = Object.fromEntries(cidades.map(c => [c.slug, c]));
const url = m => `${BASE}/materiais/${m.slug}/`;

function checar(nome, titulo, meta, termo) {
  if (termo && !meta.toLowerCase().includes(termo.toLowerCase())) throw new Error(`${nome}: description sem o termo "${termo}"`);
  if ([...titulo].length > 60) throw new Error(`${nome}: title com ${[...titulo].length} caracteres`);
  if ([...meta].length > 160) throw new Error(`${nome}: description com ${[...meta].length} caracteres`);
}

function setRe(html, re, to) {
  if (!re.test(html)) throw new Error('não encontrado: ' + re);
  return html.replace(re, () => to);
}

// Expande [[tipo:chave|texto]] em links (páginas em materiais/<slug>/ ou seções do índice)
function L(texto, prefixo) {
  return texto.replace(/\[\[([a-z]+):?([^|\]]*)\|([^\]]+)\]\]/g, (_, tipo, chave, txt) => {
    let href, title = txt;
    if (tipo === 'm') { href = `${prefixo.m}${chave}/index.html`; title = porSlug[chave].nome; }
    else if (tipo === 's') { href = `${prefixo.raiz}servico/${S[chave][0]}/index.html`; title = S[chave][1]; }
    else if (tipo === 'b') { href = `${prefixo.raiz}blog/${BLOG[chave]}/index.html`; }
    else if (tipo === 'c') { href = `${prefixo.raiz}regioes-atendidas/marmoraria-em-${chave}/index.html`; title = `Marmoraria em ${cidadePorSlug[chave].nome}`; }
    else if (tipo === 'bairro') { href = `${prefixo.raiz}bairros/marmoraria-no-${chave}/index.html`; title = `Marmoraria no ${bairroPorSlug[chave].nome}`; }
    else if (tipo === 'r') { href = `${prefixo.raiz}regioes-atendidas/index.html`; title = 'Regiões atendidas'; }
    else throw new Error('token desconhecido: ' + tipo);
    return `<a href="${href}" title="${esc(title)}">${txt}</a>`;
  });
}

const cta = (nome, termo) => `<h2 style="text-align:center">Quer orçamento de ${nome.toLowerCase()}${termo ? ' em Goiânia' : ''}?</h2>` +
  `<p style="text-align: center;"> <i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:6292861117" title="Telefone" style="display: inline-block;" rel="nofollow">(62) 9286-1117</a> | <i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="${WA}" title="Whatsapp" rel="nofollow external noopener" target="_blank" style="display: inline-block;">(62) 9286-1117</a></p>` +
  `<div class="contact-form"></div>`;

function conteudo(m, i) {
  const P = { m: '../', raiz: '../../' };
  const usos = m.usos.map(([[s, rot], txt]) =>
    `<li><a href="../../servico/${s}/index.html" title="${esc(rot)}">${rot[0].toUpperCase() + rot.slice(1)}</a>: ${txt}</li>`).join('');
  const secoes = m.secoes.map(s => `<h2>${s.h}</h2>${s.ps.map(p => `<p>${L(p, P)}</p>`).join('')}`).join('');
  const faq = m.faq.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join('');
  const bs = [0, 1, 2].map(k => bairros[(i * 3 + k) % bairros.length]);
  const cs = [0, 1, 2].map(k => cidades[(i + k * 2) % cidades.length]);
  const link = (x, tipo) => tipo === 'b'
    ? `<a href="../../bairros/marmoraria-no-${x.slug}/index.html" title="Marmoraria no ${x.nome}">${x.nome}</a>`
    : `<a href="../../regioes-atendidas/marmoraria-em-${x.slug}/index.html" title="Marmoraria em ${x.nome}">${x.nome}</a>`;
  const rel = m.relacionados.map(s => `<a href="../${s}/index.html" title="${porSlug[s].nome}">${porSlug[s].nome.toLowerCase()}</a>`).join(', ');
  return `<div class="writen_content"><h2>Por que escolher ${m.nome.toLowerCase()} em Goiânia</h2><p>${L(m.intro, P)}</p>` +
    secoes +
    `<h2>Onde usar ${m.nome.toLowerCase()} em Goiânia</h2><ul>${usos}</ul>` +
    `<h2>${m.compTitulo}</h2>${m.comp.map(p => `<p>${L(p, P)}</p>`).join('')}` +
    `<h2>Onde fazemos ${m.nome.toLowerCase()} em Goiânia e região</h2><p>Executamos projetos de ${m.nome.toLowerCase()} em Goiânia e nas cidades vizinhas, com páginas dedicadas a bairros como ${bs.map(b => link(b, 'b')).join(', ')}, e nas cidades de ${cs.map(c => link(c, 'c')).join(', ')}. Veja todas as <a href="../../regioes-atendidas/index.html" title="Regiões atendidas">regiões atendidas</a>.</p>` +
    `<h2>Perguntas frequentes sobre ${m.nome.toLowerCase()} em Goiânia</h2>${faq}` +
    `<p>Quer comparar com outros materiais? Veja também ${rel} ou volte para <a href="../index.html" title="Materiais">todos os materiais</a>.</p>` +
    cta(m.nome, true) + '</div>';
}

function jsonLd(h, nome, u, meta, itens) {
  const wp = `{"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(nome)},"url":"${u}","description":${JSON.stringify(meta)},"publisher":{"@type":"Organization","name":"Marmoraria Goiânia","url":"${BASE}"},"datePublished":"${HOJE}","dateModified":"${HOJE}"}`;
  h = setRe(h, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"WebPage"[\s\S]*?<\/script>/, `<script type="application/ld+json">${wp}</script>`);
  const bc = `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${itens.map((x, k) => `{"@type":"ListItem","position":${k + 1},"name":${JSON.stringify(x[0])},"item":"${x[1]}"}`).join(',')}]}`;
  return { h, bc };
}

function metas(h, titulo, meta, u, uAntiga) {
  h = setRe(h, /<title>[^<]*<\/title>/, `<title>${esc(titulo)}</title>`);
  h = setRe(h, /<meta name="description" content="[^"]*"\s*>/, `<meta name="description" content="${esc(meta)}">`);
  h = setRe(h, /<meta property="og:title" content="[^"]*"\s*>/, `<meta property="og:title" content="${esc(titulo)}" >`);
  h = setRe(h, /<meta property="og:description" content="[^"]*"\s*>/, `<meta property="og:description" content="${esc(meta)}" >`);
  h = setRe(h, /<meta name="twitter:title" content="[^"]*"\s*>/, `<meta name="twitter:title" content="${esc(titulo)}" >`);
  h = setRe(h, /<meta name="twitter:description" content="[^"]*"\s*>/, `<meta name="twitter:description" content="${esc(meta)}" >`);
  h = h.split(uAntiga).join(u);
  return h.replace(/(og:updated_time" content=")[^"]*/, `$1${HOJE}`);
}

// ---------- páginas de material ----------
const tpl = fs.readFileSync(path.join(SITE, 'regioes-atendidas/marmoraria-em-trindade/index.html'), 'utf8');

materiais.forEach((m, i) => {
  const termo = `${m.nome} em Goiânia`;
  const titulo = `${termo} | Marmoraria Goiânia`;
  checar(m.nome, titulo, m.meta, termo);
  const u = url(m);
  const h1 = termo;
  let h = tpl;
  h = h.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[\s\S]*?<\/script>/g, '');
  h = h.replace(/<section class="widget widget_categories" id="bairros-sidebar">[\s\S]*?<\/section>/, '');
  h = metas(h, titulo, m.meta, u, `${BASE}/regioes-atendidas/marmoraria-em-trindade/`);

  const r = jsonLd(h, h1, u, m.meta, [['Marmoraria Goiânia', BASE], ['Materiais', `${BASE}/materiais/`], [m.nome, u]]);
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: m.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  h = setRe(r.h, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"BreadcrumbList"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${r.bc}</script><script type="application/ld+json">${JSON.stringify(faqLd)}</script>`);

  h = setRe(h, /<h1>Marmoraria em Trindade<\/h1>/, `<h1>${h1}</h1>`);
  h = setRe(h, /<a itemprop="item" title="Regiões atendidas" href="\.\.\/index\.html"><span itemprop="name">Regiões atendidas<\/span>/, '<a itemprop="item" title="Materiais" href="../index.html"><span itemprop="name">Materiais</span>');
  h = setRe(h, /<a itemprop="item" title="Marmoraria em Trindade" href="index\.html"><span itemprop="name">Marmoraria em Trindade<\/span>/, `<a itemprop="item" title="${m.nome}" href="index.html"><span itemprop="name">${m.nome}</span>`);

  const side = '<section class="widget widget_categories"><h2 class="widget-title">Materiais</h2><ul>' +
    materiais.map(x => `<li><a href="../${x.slug}/index.html" title="${x.nome}">${x.nome}</a></li>`).join('') + '</ul></section>';
  h = setRe(h, /<section class="widget widget_categories"><h2 class="widget-title">Regiões atendidas<\/h2>[\s\S]*?<\/section>/, side);
  h = setRe(h, /<div class="writen_content">[\s\S]*?<div class="contact-form"><\/div><\/div>/, conteudo(m, i));

  const out = path.join(SITE, 'materiais', m.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, h);
  console.log('ok', `/materiais/${m.slug}/`);
});

// ---------- índice /materiais/ ----------
const tituloIdx = 'Materiais em Goiânia | Marmoraria Goiânia';
const metaIdx = 'Compare granito, mármore, quartzito, quartzo, porcelanato e supernano: resistência, manchas, calor e uso externo. Veja qual combina com seu projeto.';
checar('materiais', tituloIdx, metaIdx);
const uIdx = `${BASE}/materiais/`;
let x = fs.readFileSync(path.join(SITE, 'regioes-atendidas/index.html'), 'utf8');
x = metas(x, tituloIdx, metaIdx, uIdx, `${BASE}/regioes-atendidas/`);
const r = jsonLd(x, 'Materiais para bancadas e revestimentos', uIdx, metaIdx, [['Marmoraria Goiânia', BASE], ['Materiais', uIdx]]);
x = setRe(r.h, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"BreadcrumbList"[\s\S]*?<\/script>/, `<script type="application/ld+json">${r.bc}</script>`);
x = setRe(x, /<h1>Regiões atendidas<\/h1>/, '<h1>Materiais</h1>');
x = setRe(x, /<a itemprop="item" title="Regiões atendidas" href="index\.html"><span itemprop="name">Regiões atendidas<\/span>/, '<a itemprop="item" title="Materiais" href="index.html"><span itemprop="name">Materiais</span>');

const card = m => `<div class="col-lg-4 col-md-6"><a href="${m.slug}/index.html" title="${m.nome} em Goiânia" style="display:block;color:inherit"><div class="blog-item"><div class="content" style="margin-top:0px;padding:28px 18px"><h3 style="margin-bottom:10px!important">${m.nome}</h3><p>${m.resumo}</p></div></div></a></div>`;
const linhas = [
  ['Granito', 'Alta', 'Média (depende da cor)', 'Alta', 'Sim'],
  ['Mármore', 'Baixa a média', 'Baixa (sensível a ácidos)', 'Alta', 'Não recomendado'],
  ['Quartzito', 'Alta', 'Média a alta', 'Alta', 'Sim'],
  ['Quartzo', 'Alta', 'Alta', 'Média', 'Não recomendado'],
  ['Porcelanato', 'Alta', 'Alta', 'Alta', 'Em áreas cobertas'],
  ['Supernano', 'Média', 'Alta', 'Média', 'Não recomendado'],
  ['Silestone', 'Alta', 'Alta', 'Média', 'Não recomendado'],
  ['Ardósia', 'Média', 'Média (com resina)', 'Alta', 'Sim'],
  ['Travertino', 'Baixa a média', 'Baixa (sensível a ácidos)', 'Alta', 'Em áreas cobertas'],
  ['Ônix', 'Baixa', 'Baixa', 'Média', 'Não recomendado'],
  ['Nanoglass', 'Média', 'Alta', 'Média', 'Não recomendado'],
  ['Dekton', 'Alta', 'Alta', 'Muito alta', 'Sim'],
  ['Limestone', 'Baixa a média', 'Baixa (sensível a ácidos)', 'Alta', 'Em áreas cobertas'],
];
const th = 'style="border:1px solid #ddd;padding:10px;text-align:left;background:#f5f5f5"';
const td = 'style="border:1px solid #ddd;padding:10px"';
const tabela = `<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:15px"><thead><tr>${['Material', 'Resistência a riscos', 'Resistência a manchas', 'Resistência ao calor', 'Área externa'].map(c => `<th ${th}>${c}</th>`).join('')}</tr></thead><tbody>` +
  linhas.map(l => { const sl = materiais.find(m => m.nome === l[0]).slug; return `<tr><td ${td}><a href="${sl}/index.html" title="${l[0]}">${l[0]}</a></td>${l.slice(1).map(c => `<td ${td}>${c}</td>`).join('')}</tr>`; }).join('') +
  '</tbody></table></div>';
const PI = { m: '', raiz: '../' };
const secMat = `<section class="blog-area pt-70 pb-70"><div class="container"><div class="section-title"><h2>Escolha o material do seu projeto</h2><p>Trabalhamos com pedras naturais, superfícies engenheiradas e porcelanato. Cada material tem pontos fortes e cuidados diferentes.</p></div><div class="row">${materiais.map(card).join('')}</div></div></section>` +
  `<section class="pb-70"><div class="container"><div class="writen_content"><h2>Comparativo rápido entre os materiais</h2>${tabela}` +
  `<p style="margin-top:15px">Referência geral: o comportamento muda conforme o tipo de pedra e o fabricante. Na visita técnica levamos amostras e avaliamos o uso real do ambiente.</p>` +
  `<h2>Como escolher</h2>` +
  `<p>${L('Para a cozinha de uso intenso, o [[m:granito|granito]] e o [[m:quartzito|quartzito]] entregam resistência com aparência natural, e o [[m:quartzo|quartzo]] ou o [[m:porcelanato|porcelanato]] são boas escolhas se você prefere uma superfície não porosa. Veja os detalhes em [[s:cozinha|bancadas de cozinha]].', PI)}</p>` +
  `<p>${L('Em banheiros e lavabos, o [[m:marmore|mármore]] traz sofisticação, e o [[m:supernano|supernano]] atende a quem quer um branco uniforme. Conheça as opções de [[s:pias|pias e lavatórios]] e [[s:cubas|cubas esculpidas]].', PI)}</p>` +
  `<p>${L('Para áreas gourmet e externas, o granito e o quartzito lidam melhor com sol, chuva e gordura. Veja [[s:gourmet|ilhas gourmet e bancadas para churrasqueira]] e a página de [[s:impermeab|impermeabilização de pedras]].', PI)}</p>` +
  `<p>${L('Atendemos Goiânia e cidades vizinhas. Veja as [[r|regiões atendidas]] e fale com a nossa equipe para receber orientação e orçamento.', PI)}</p>` +
  cta('seu projeto') + '</div></div></section>';
x = setRe(x, /<section class="blog-area pt-70 pb-70">[\s\S]*?<section class="blog-area pb-70" id="bairros-atendidos">[\s\S]*?<\/section>/, secMat);
fs.mkdirSync(path.join(SITE, 'materiais'), { recursive: true });
fs.writeFileSync(path.join(SITE, 'materiais/index.html'), x);
console.log('ok /materiais/');
