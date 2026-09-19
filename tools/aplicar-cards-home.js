// Torna clicáveis os cards da seção "Tipos de Materiais que Trabalhamos" da home,
// ligando cada um à sua página em /materiais/, e adiciona o link para o índice de materiais.
// Também corrige as descrições de Quartzo e Porcelanato. Idempotente.
// Uso: node tools/aplicar-cards-home.js   (rodar na raiz do repositório)

const fs = require('fs');
const path = require('path');
const { materiais } = require('./materiais-conteudo');

const HOME = path.join('C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main', 'index.html');

const cards = {
  'Mármore': 'marmore', 'Granito': 'granito', 'Quartzo': 'quartzo', 'Quartzito': 'quartzito',
  'Silestone': 'silestone', 'Ardósia': 'ardosia', 'Travertino': 'travertino', 'Ônix': 'onix',
  'Nanoglass': 'nanoglass', 'Dekton': 'dekton', 'Limestone (Calcário)': 'limestone', 'Porcelanato': 'porcelanato',
};
const nomeDe = slug => materiais.find(m => m.slug === slug).nome;

const ini = '<section class="materials-area pt-70 pb-70">';
let h = fs.readFileSync(HOME, 'utf8');
const a = h.indexOf(ini);
const b = h.indexOf('</section>', a);
if (a < 0 || b < 0) throw new Error('seção de materiais não encontrada');
let sec = h.slice(a, b);

sec = sec.replace(/<a href="materiais\/[^"]*" title="[^"]*" style="display:block;color:inherit;text-decoration:none">(<div style="padding: 25px[\s\S]*?<\/p><\/div>)<\/a>/g, (_, card) => card.replace(' height: 100%; box-sizing: border-box;', ''));
sec = sec.replace(/<p id="ver-materiais"[\s\S]*?<\/p>/, '');

const estilo = 'padding: 25px; background: white; border-top: 4px solid #0066cc; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);';
let n = 0;
for (const [rotulo, slug] of Object.entries(cards)) {
  const re = new RegExp(`<div style="${estilo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"><h3 style="[^"]*">${rotulo.replace(/[()]/g, '\\$&')}</h3><p style="[^"]*">([^<]*)</p></div>`);
  const m = re.exec(sec);
  if (!m) throw new Error('card não encontrado: ' + rotulo);
  let desc = m[1];
  if (slug === 'quartzo' || slug === 'porcelanato') desc = materiais.find(x => x.slug === slug).resumo;
  const novo = m[0].replace(m[1], desc).replace(estilo, estilo + ' height: 100%; box-sizing: border-box;');
  sec = sec.replace(m[0], `<a href="materiais/${slug}/index.html" title="${nomeDe(slug)} em Goiânia" style="display:block;color:inherit;text-decoration:none">${novo}</a>`);
  n++;
}

const botao = '<p id="ver-materiais" style="text-align:center;margin-top:30px"><a href="materiais/index.html" title="Materiais em Goiânia" class="default-btn">Compare todos os materiais<span></span></a></p>';
if (!sec.endsWith('</a></div></div>')) sec += '</div>';
sec = sec.replace(/<\/div>$/, botao + '</div>');
h = h.slice(0, a) + sec + h.slice(b);
fs.writeFileSync(HOME, h);
console.log('cards ligados na home:', n);
