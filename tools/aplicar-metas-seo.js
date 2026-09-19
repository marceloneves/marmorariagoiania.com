// Padroniza as metas de robots (uma única declaração, com googlebot e bingbot) e gera
// meta keywords contextuais por tipo de página. Idempotente.
// Uso: node tools/aplicar-metas-seo.js   (rodar na raiz, DEPOIS dos geradores de bairros e cidades)

const fs = require('fs');
const path = require('path');
const { materiais } = require('./materiais-conteudo');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';
const ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

const fixas = {
  'index.html': 'marmoraria goiania, marmoraria, marmoraria go, marmores goiania, marmores go, marmoraria perto, marmoraria em goiania, marmoraria em go',
  'quem-somos/index.html': 'marmoraria goiânia, quem somos, marmoraria em goiânia, empresa de mármore e granito, marmoraria go, marmoraria sob medida',
  'contato/index.html': 'contato marmoraria goiânia, orçamento de marmoraria, marmoraria em goiânia, whatsapp marmoraria, telefone marmoraria, visita técnica marmoraria',
  'servicos/index.html': 'serviços de marmoraria, marmoraria em goiânia, bancada de granito, bancada de mármore, bancada de quartzito, escada de mármore, revestimento em pedra',
  'politica-de-privacidade/index.html': 'política de privacidade, privacidade marmoraria goiânia, proteção de dados, lgpd, marmoraria goiânia',
  'blog/index.html': 'blog de marmoraria, dicas de mármore e granito, como limpar granito, manchas em mármore, marmoraria em goiânia, cuidados com pedras',
  'blog/page/2/index.html': 'blog de marmoraria, artigos sobre mármore e granito, custo do metro do granito, melhor granito para cozinha, marmoraria em goiânia',
  'materiais/index.html': 'materiais para bancadas, granito, mármore, quartzito, quartzo, porcelanato, supernano, qual pedra escolher, marmoraria em goiânia',
  'regioes-atendidas/index.html': 'regiões atendidas, marmoraria em goiânia, marmoraria em aparecida de goiânia, marmoraria em anápolis, marmoraria em trindade, marmoraria em senador canedo, bairros de goiânia',
};

const min = s => s.replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/[​-‍﻿]/g, '').replace(/[?!.\s]+$/, '').trim().toLowerCase();
const h1De = h => min((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, ''));
const unicas = a => [...new Set(a.filter(Boolean))].join(', ');

function keywords(rel, h) {
  if (fixas[rel]) return fixas[rel];
  const mat = materiais.find(m => rel === `materiais/${m.slug}/index.html`);
  if (mat) return mat.kw;
  const h1 = h1De(h);
  if (rel.startsWith('regioes-atendidas/')) {
    const c = h1.replace(/^marmoraria em /, '');
    return unicas([h1, `marmoraria ${c}`, `marmoraria em ${c} go`, `granito em ${c}`, `mármore em ${c}`, `bancada de granito em ${c}`, `bancada de cozinha em ${c}`, 'marmoraria goiânia']);
  }
  if (rel.startsWith('bairros/')) {
    const b = h1.replace(/^marmoraria no /, '');
    return unicas([h1, `marmoraria ${b} goiânia`, `marmoraria em goiânia ${b}`, `granito ${b}`, `mármore ${b}`, `bancada de cozinha ${b}`, 'marmoraria em goiânia', 'marmoraria goiânia']);
  }
  if (rel.startsWith('servico/')) {
    return unicas([h1, `${h1} em goiânia`, `${h1} sob medida`, `orçamento de ${h1}`, 'marmoraria em goiânia', 'marmoraria goiânia']);
  }
  if (rel.startsWith('blog/')) {
    return unicas([h1, 'marmoraria goiânia', 'dicas de mármore e granito', 'cuidados com pedras naturais', 'marmoraria em goiânia']);
  }
  throw new Error('sem regra de keywords: ' + rel);
}

function paginas(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'wp-content') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) paginas(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

let n = 0;
for (const f of paginas(SITE)) {
  const rel = path.relative(SITE, f).split(path.sep).join('/');
  let h = fs.readFileSync(f, 'utf8');
  const kw = keywords(rel, h);

  h = h.replace(/<meta name="(?:robots|googlebot|bingbot|keywords)"[^>]*>\s*/g, '');
  const bloco = `<meta name="robots" content="${ROBOTS}"><meta name="googlebot" content="${ROBOTS}"><meta name="bingbot" content="${ROBOTS}"><meta name="keywords" content="${kw.replace(/"/g, '&quot;')}">`;
  const re = /<meta name="description" content="[^"]*"\s*>/;
  if (!re.test(h)) throw new Error('sem meta description: ' + rel);
  h = h.replace(re, m => m + bloco);
  fs.writeFileSync(f, h);
  n++;
}
console.log('páginas atualizadas:', n);
