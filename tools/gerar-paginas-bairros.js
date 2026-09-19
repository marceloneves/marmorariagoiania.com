// Gera bairros/marmoraria-no-<slug>/index.html a partir da página de Trindade
// (mesmo cabeçalho, menu, rodapé e CSS) e liga os bairros da home às páginas.
// Uso: node tools/gerar-paginas-bairros.js   (rodar na raiz do repositório)
// Idempotente: sobrescreve as páginas de bairro e só linka <li> ainda sem <a>.

const fs = require('fs');
const path = require('path');
const { bairros } = require('./bairros-conteudo');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';
const BASE = 'https://marmorariagoiania.com';
const HOJE = '2026-09-19T12:00:00-03:00';
const WA = 'https://api.whatsapp.com/send?phone=556292861117&amp;text=Ol%C3%A1,%20estou%20entrando%20em%20contato%20pelo%20site';

const tpl = fs.readFileSync(path.join(SITE, 'regioes-atendidas/marmoraria-em-trindade/index.html'), 'utf8');
const porSlug = Object.fromEntries(bairros.map(b => [b.slug, b]));
const dir = b => `marmoraria-no-${b.slug}`;
const url = b => `${BASE}/bairros/${dir(b)}/`;
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function replaceOnce(html, from, to) {
  if (!html.includes(from)) throw new Error('trecho não encontrado: ' + from.slice(0, 80));
  return html.replace(from, () => to);
}

function conteudo(b) {
  const l = b.demandas.map(([[s, rot], txt]) =>
    `<li><a href="../../servico/${s}/index.html" title="${esc(rot)}">${rot[0].toUpperCase() + rot.slice(1)}</a>: ${txt}</li>`).join('');
  const faq = b.faq.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join('');
  const viz = b.vizinhos.map(s => `<a href="../${dir(porSlug[s])}/index.html" title="Marmoraria no ${porSlug[s].nome}">${porSlug[s].nome}</a>`).join(', ');
  return `<div class="writen_content"><h2>Marmoraria no ${b.nome}, Goiânia</h2>` +
    `<p>${b.intro}</p><h2>${b.perfilTitulo}</h2>${b.perfil.map(p => `<p>${p}</p>`).join('')}` +
    `<h2>${b.demandasTitulo}</h2><ul>${l}</ul>` +
    `<h2>${b.logisticaTitulo}</h2><p>${b.logistica}</p>` +
    `<h2>Perguntas frequentes sobre pedras no ${b.nome}</h2>${faq}` +
    `<p>Também atendemos bairros como ${viz}. <a href="../../regioes-atendidas/index.html" title="Regiões atendidas">Veja todas as regiões atendidas</a>.</p>` +
    `<h2 style="text-align:center">Precisa de marmoraria no ${b.nome}?</h2>` +
    `<p style="text-align: center;"> <i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:6292861117" title="Telefone" style="display: inline-block;" rel="nofollow">(62) 9286-1117</a> | <i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="${WA}" title="Whatsapp" rel="nofollow external noopener" target="_blank" style="display: inline-block;">(62) 9286-1117</a></p>` +
    `<div class="contact-form"></div></div>`;
}

function tituloDe(b) {
  for (const t of [`Marmoraria no ${b.nome}, Goiânia | Marmoraria Goiânia`, `Marmoraria no ${b.nome}, Goiânia`]) if ([...t].length <= 60) return t;
  throw new Error('title longo demais: ' + b.nome);
}

function setRe(html, re, to) {
  if (!re.test(html)) throw new Error('não encontrado: ' + re);
  return html.replace(re, () => to);
}

function pagina(b) {
  const titulo = tituloDe(b);
  if ([...b.meta].length > 160) throw new Error(`${b.nome}: description com ${[...b.meta].length} caracteres`);
  const h1 = `Marmoraria no ${b.nome}`;
  const u = url(b);
  let h = tpl;
  h = h.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[\s\S]*?<\/script>/g, '');
  h = h.replace(/<section class="widget widget_categories" id="bairros-sidebar">[\s\S]*?<\/section>/, '');
  h = setRe(h, /<title>[^<]*<\/title>/,`<title>${esc(titulo)}</title>`);
  h = setRe(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(b.meta)}">`);
  h = setRe(h, /<meta property="og:title" content="[^"]*" >/, `<meta property="og:title" content="${esc(titulo)}" >`);
  h = setRe(h, /<meta property="og:description" content="[^"]*" >/, `<meta property="og:description" content="${esc(b.meta)}" >`);
  h = setRe(h, /<meta name="twitter:title" content="[^"]*" >/, `<meta name="twitter:title" content="${esc(titulo)}" >`);
  h = setRe(h, /<meta name="twitter:description" content="[^"]*" >/, `<meta name="twitter:description" content="${esc(b.meta)}" >`);
  h = h.split(`${BASE}/regioes-atendidas/marmoraria-em-trindade/`).join(u);
  h = h.replace(/(og:updated_time" content=")[^"]*/, `$1${HOJE}`);

  const wp = `{"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(h1)},"url":"${u}","description":${JSON.stringify(b.meta)},"publisher":{"@type":"Organization","name":"Marmoraria Goiânia","url":"${BASE}"},"datePublished":"${HOJE}","dateModified":"${HOJE}"}`;
  h = h.replace(/(<script type="application\/ld\+json">)\{"@context":"https:\/\/schema.org","@type":"WebPage"[\s\S]*?(<\/script>)/, () => `<script type="application/ld+json">${wp}</script>`);
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: b.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const bc = `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Marmoraria Goiânia","item":"${BASE}"},{"@type":"ListItem","position":2,"name":"Regiões atendidas","item":"${BASE}/regioes-atendidas/"},{"@type":"ListItem","position":3,"name":${JSON.stringify(h1)},"item":"${u}"}]}`;
  h = h.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"BreadcrumbList"[\s\S]*?<\/script>/, () =>
    `<script type="application/ld+json">${bc}</script><script type="application/ld+json">${JSON.stringify(faqLd)}</script>`);

  // Visível: h1, breadcrumb, sidebar, conteúdo
  h = replaceOnce(h, '<h1>Marmoraria em Trindade</h1>', `<h1>${h1}</h1>`);
  h = replaceOnce(h, '<a itemprop="item" title="Regiões atendidas" href="../index.html">', '<a itemprop="item" title="Regiões atendidas" href="../../regioes-atendidas/index.html">');
  h = replaceOnce(h, '<a itemprop="item" title="Marmoraria em Trindade" href="index.html"><span itemprop="name">Marmoraria em Trindade</span>', `<a itemprop="item" title="${h1}" href="index.html"><span itemprop="name">${h1}</span>`);
  const side = '<section class="widget widget_categories"><h2 class="widget-title">Bairros atendidos em Goiânia</h2><ul>' +
    bairros.map(x => `<li><a href="../${dir(x)}/index.html" title="Marmoraria no ${x.nome}">${x.nome}</a></li>`).join('') +
    '</ul></section>';
  h = h.replace(/<section class="widget widget_categories">[\s\S]*?<\/section>/, () => side);
  h = h.replace(/<div class="writen_content">[\s\S]*?<div class="contact-form"><\/div><\/div>/, () => conteudo(b));
  h = h.split('href="../index.html"').join('href="../../regioes-atendidas/index.html"');
  return h;
}

for (const b of bairros) {
  const out = path.join(SITE, 'bairros', dir(b), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, pagina(b));
  console.log('ok', out.replace(SITE, ''));
}

// Home: hiperlinka os bairros da seção "Principais Bairros Atendidos"
const homePath = path.join(SITE, 'index.html');
let home = fs.readFileSync(homePath, 'utf8');
let n = 0;
for (const b of bairros) {
  const from = `<strong>${b.nome}</strong></li>`;
  const to = `<strong><a href="bairros/${dir(b)}/index.html" title="Marmoraria no ${b.nome}" style="color:#0066cc;text-decoration:none;">${b.nome}</a></strong></li>`;
  if (home.includes(from)) { home = home.replace(from, to); n++; }
}
fs.writeFileSync(homePath, home);
console.log('links na home:', n);
