// Adiciona "Regiões atendidas" ao menu do cabeçalho (desktop e mobile) em todas as páginas,
// à direita de "Contato". Idempotente: reposiciona o item se já existir.
// Uso: node tools/aplicar-menu-regioes.js   (rodar na raiz do repositório)

const fs = require('fs');
const path = require('path');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';

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
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/<li [^>]*menu-item-regioes[^>]*>[\s\S]*?<\/li>/g, '');
  const prof = path.relative(SITE, path.dirname(f)).split(path.sep).filter(Boolean).length;
  const rel = '../'.repeat(prof);
  const re = /<li [^>]*menu-item-434[^>]*>[\s\S]*?<\/li>/g;
  if (!re.test(h)) { console.log('sem menu:', f); continue; }
  h = h.replace(re, m => {
    const id = m.startsWith('<li id=') ? ' id="menu-item-regioes"' : '';
    return m + `<li${id} class="menu-item menu-item-type-post_type menu-item-object-page menu-item-regioes nav-item"><a itemprop="url" href="${rel}regioes-atendidas/index.html" class="nav-link"><span itemprop="name">Regiões atendidas</span></a></li>`;
  });
  fs.writeFileSync(f, h);
  n++;
}
console.log('páginas atualizadas:', n);
