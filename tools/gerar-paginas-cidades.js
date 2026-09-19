// Reescreve as páginas de cidade (regioes-atendidas/marmoraria-em-<slug>/) com conteúdo,
// meta title (<= 60) e meta description (<= 160) próprios, e monta a página
// "Regiões atendidas" com cards de cidades e de bairros de Goiânia.
// Uso: node tools/gerar-paginas-cidades.js   (rodar na raiz do repositório)
// Idempotente: pode ser rodado várias vezes.

const fs = require('fs');
const path = require('path');
const { cidades } = require('./cidades-conteudo');
const { bairros } = require('./bairros-conteudo');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';
const BASE = 'https://marmorariagoiania.com';
const HOJE = '2026-09-19T12:00:00-03:00';
const WA = 'https://api.whatsapp.com/send?phone=556292861117&amp;text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20pelo%20site';

const dir = c => `marmoraria-em-${c.slug}`;
const bdir = b => `marmoraria-no-${b.slug}`;
const url = c => `${BASE}/regioes-atendidas/${dir(c)}/`;
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const porSlug = Object.fromEntries(cidades.map(c => [c.slug, c]));

function checar(nome, titulo, meta) {
  if ([...titulo].length > 60) throw new Error(`${nome}: title com ${[...titulo].length} caracteres`);
  if ([...meta].length > 160) throw new Error(`${nome}: description com ${[...meta].length} caracteres`);
}

function setMeta(h, re, novo) {
  if (!re.test(h)) throw new Error('não encontrado: ' + re);
  return h.replace(re, () => novo);
}

function conteudo(c) {
  const l = c.demandas.map(([[s, rot], txt]) =>
    `<li><a href="../../servico/${s}/index.html" title="${esc(rot)}">${rot[0].toUpperCase() + rot.slice(1)}</a>: ${txt}</li>`).join('');
  const faq = c.faq.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join('');
  const viz = c.vizinhos.map(s => `<a href="../${dir(porSlug[s])}/index.html" title="Marmoraria em ${porSlug[s].nome}">${porSlug[s].nome}</a>`).join(', ');
  return `<div class="writen_content"><h2>Marmoraria em ${c.nome}</h2>` +
    `<p>${c.intro}</p><h2>${c.perfilTitulo}</h2>${c.perfil.map(p => `<p>${p}</p>`).join('')}` +
    `<h2>${c.demandasTitulo}</h2><ul>${l}</ul>` +
    `<h2>${c.logisticaTitulo}</h2><p>${c.logistica}</p>` +
    `<h2>Perguntas frequentes sobre pedras em ${c.nome}</h2>${faq}` +
    `<p>Também atendemos ${viz}. Se você está em Goiânia, veja os <a href="../index.html#bairros-atendidos" title="Bairros atendidos em Goiânia">bairros de Goiânia que atendemos</a> ou consulte <a href="../index.html" title="Regiões atendidas">todas as regiões atendidas</a>.</p>` +
    `<h2 style="text-align:center">Precisa de marmoraria em ${c.nome}?</h2>` +
    `<p style="text-align: center;"> <i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:6292861117" title="Telefone" style="display: inline-block;" rel="nofollow">(62) 9286-1117</a> | <i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="${WA}" title="Whatsapp" rel="nofollow external noopener" target="_blank" style="display: inline-block;">(62) 9286-1117</a></p>` +
    `<div class="contact-form"></div></div>`;
}

function pagina(c, h) {
  const titulo = `Marmoraria em ${c.nome} | Marmoraria Goiânia`;
  const h1 = `Marmoraria em ${c.nome}`;
  checar(c.nome, titulo, c.meta);
  const u = url(c);

  h = setMeta(h, /<title>[^<]*<\/title>/, `<title>${esc(titulo)}</title>`);
  h = setMeta(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(c.meta)}">`);
  h = setMeta(h, /<meta property="og:title" content="[^"]*" >/, `<meta property="og:title" content="${esc(titulo)}" >`);
  h = setMeta(h, /<meta property="og:description" content="[^"]*" >/, `<meta property="og:description" content="${esc(c.meta)}" >`);
  h = setMeta(h, /<meta name="twitter:title" content="[^"]*" >/, `<meta name="twitter:title" content="${esc(titulo)}" >`);
  h = setMeta(h, /<meta name="twitter:description" content="[^"]*" >/, `<meta name="twitter:description" content="${esc(c.meta)}" >`);
  h = h.replace(/(og:updated_time" content=")[^"]*/, `$1${HOJE}`);

  const wp = `{"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(h1)},"url":"${u}","description":${JSON.stringify(c.meta)},"publisher":{"@type":"Organization","name":"Marmoraria Goiânia","url":"${BASE}"},"datePublished":"2025-12-01T20:34:37-03:00","dateModified":"${HOJE}"}`;
  h = setMeta(h, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"WebPage"[\s\S]*?<\/script>/, `<script type="application/ld+json">${wp}</script>`);

  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const bc = `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Marmoraria Goiânia","item":"${BASE}"},{"@type":"ListItem","position":2,"name":"Regiões atendidas","item":"${BASE}/regioes-atendidas/"},{"@type":"ListItem","position":3,"name":${JSON.stringify(h1)},"item":"${u}"}]}`;
  h = h.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[\s\S]*?<\/script>/g, '');
  h = setMeta(h, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"BreadcrumbList"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${bc}</script><script type="application/ld+json">${JSON.stringify(faqLd)}</script>`);

  const bairrosSec = '<section class="widget widget_categories" id="bairros-sidebar"><h2 class="widget-title">Bairros de Goiânia</h2><ul>' +
    bairros.map(b => `<li><a href="../../bairros/${bdir(b)}/index.html" title="Marmoraria no ${b.nome}">${b.nome}</a></li>`).join('') + '</ul></section>';
  h = h.replace(/<section class="widget widget_categories" id="bairros-sidebar">[\s\S]*?<\/section>/, '');
  const reReg = /<section class="widget widget_categories"><h2 class="widget-title">Regiões atendidas<\/h2>[\s\S]*?<\/section>/;
  if (!reReg.test(h)) throw new Error('sidebar de regiões não encontrada');
  h = h.replace(reReg, m => m + bairrosSec);
  h = setMeta(h, /<div class="writen_content">[\s\S]*?<div class="contact-form"><\/div><\/div>/, conteudo(c));
  return h;
}

for (const c of cidades) {
  const f = path.join(SITE, 'regioes-atendidas', dir(c), 'index.html');
  fs.writeFileSync(f, pagina(c, fs.readFileSync(f, 'utf8')));
  console.log('ok', f.replace(SITE, ''));
}

// Página "Regiões atendidas": cards de cidades + cards de bairros
const card = (href, nome, titulo) =>
  `<div class="col-lg-4 col-md-6"><a href="${href}" title="${esc(titulo)}" style="display:block;color:inherit"><div class="blog-item"><div class="image"></div><div class="content" style="margin-top:0px"><h3 style="display:flex;align-items:center;justify-content:center;height:84px;text-align:center;margin-top:0px">${nome}</h3></div></div></a></div>`;

const idx = path.join(SITE, 'regioes-atendidas/index.html');
let h = fs.readFileSync(idx, 'utf8');
const tituloIdx = 'Regiões atendidas em Goiânia e cidades vizinhas';
const metaIdx = 'Veja as cidades e os bairros de Goiânia atendidos pela Marmoraria Goiânia: bancadas, pias, escadas e revestimentos em pedra com visita técnica e orçamento.';
checar('regioes-atendidas', tituloIdx, metaIdx);

h = setMeta(h, /<title>[^<]*<\/title>/, `<title>${tituloIdx}</title>`);
h = setMeta(h, /<meta name="description" content="[^"]*"\s*>/, `<meta name="description" content="${metaIdx}">`);
h = h.replace(/(<meta property="og:title" content=")[^"]*/, `$1${tituloIdx}`);
h = h.replace(/(<meta property="og:description" content=")[^"]*/, `$1${metaIdx}`);
h = h.replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${tituloIdx}`);
h = h.replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${metaIdx}`);
h = h.replace('<h1>Regiões</h1>', '<h1>Regiões atendidas</h1>');

const cidadesOrd = [...cidades].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
const secCidades = `<section class="blog-area pt-70 pb-70"><div class="container"><div class="section-title"><h2>Cidades atendidas</h2><p>Levamos projetos em mármore, granito, quartzito e porcelanato a Goiânia e às cidades vizinhas, com medição no local, corte sob medida e instalação.</p></div><div class="row">` +
  cidadesOrd.map(c => card(`${dir(c)}/index.html`, `Marmoraria em ${c.nome}`, `Marmoraria em ${c.nome}`)).join('') + '</div></div></section>';
const secBairros = `<section class="blog-area pb-70" id="bairros-atendidos"><div class="container"><div class="section-title"><h2>Bairros atendidos em Goiânia</h2><p>Conheça o que fazemos em cada bairro e como funciona o atendimento na sua região.</p></div><div class="row">` +
  bairros.map(b => card(`../bairros/${bdir(b)}/index.html`, `Marmoraria no ${b.nome}`, `Marmoraria no ${b.nome}`)).join('') + '</div></div></section>';

h = h.replace(/<section class="blog-area pb-70" id="bairros-atendidos">[\s\S]*?<\/section>/, '');
h = setMeta(h, /<section class="blog-area pt-70 pb-70"><div class="container"><div class="section-title"><h2>(?:Regiões|Cidades) atendidas<\/h2>[\s\S]*?<\/section>/, secCidades + secBairros);
fs.writeFileSync(idx, h);
console.log('ok /regioes-atendidas/index.html');
