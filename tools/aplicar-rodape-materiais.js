// Adiciona "Materiais" logo abaixo de "Serviços" na lista "Institucional" do rodapé, em todas as páginas.
// Idempotente. Uso: node tools/aplicar-rodape-materiais.js   (rodar na raiz do repositório)

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
  const i = h.indexOf('<footer');
  if (i < 0) continue;
  let rodape = h.slice(i);
  rodape = rodape.replace(/<li id="menu-item-materiais"[\s\S]*?<\/li>/, '');
  const prof = path.relative(SITE, path.dirname(f)).split(path.sep).filter(Boolean).length;
  const rel = '../'.repeat(prof);
  const re = /<li [^>]*>(?:(?!<\/li>)[\s\S])*?<span itemprop="name">Serviços<\/span>[\s\S]*?<\/li>/;
  if (!re.test(rodape)) { console.log('sem item Serviços no rodapé:', f); continue; }
  rodape = rodape.replace(re, m => m + `<li id="menu-item-materiais" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-materiais nav-item"><a itemprop="url" href="${rel}materiais/index.html" class="nav-link"><span itemprop="name">Materiais</span></a></li>`);
  fs.writeFileSync(f, h.slice(0, i) + rodape);
  n++;
}
console.log('páginas atualizadas:', n);
