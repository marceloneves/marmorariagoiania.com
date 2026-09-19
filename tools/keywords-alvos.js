// Destino (página contextual) de cada palavra de keywords-hiperlinks.
// Abrangentes -> página principal; específicas -> serviço, material ou página institucional.

const fs = require('fs');
const path = require('path');

const SITE = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';

const S = 'servico/';
const M = 'materiais/';
const alvo = {
  // abrangentes -> página principal
  'marmoraria': 'index.html', 'marmoraria goiânia': 'index.html', 'marmoraria em goiânia': 'index.html',
  'marmoraria perto': 'index.html', 'marmoraria perto de mim': 'index.html', 'marmoraria mais próxima': 'index.html',
  'marmoraria mais próxima de goiânia': 'index.html', 'melhor marmoraria': 'index.html', 'melhor marmoraria de goiânia': 'index.html',
  'loja de mármore e granito': 'index.html', 'loja de mármore e granito em goiânia': 'index.html', 'marmoraria e granitos': 'index.html',
  // institucionais / contextuais gerais
  'marmoraria orçamento': 'contato/index.html', 'marmoraria preço': 'contato/index.html',
  'marmoraria a domicílio': S + 'consultoria-e-medicao-tecnica-no-local-visita-tecnica/index.html',
  'marmoraria sob medida': 'servicos/index.html', 'projeto de marmoraria': 'servicos/index.html',
  // bancadas
  'bancada de granito': M + 'granito/index.html', 'bancada de granito goiânia': M + 'granito/index.html', 'bancada de granito preço': M + 'granito/index.html',
  'manutenção de bancada de granito': M + 'granito/index.html',
  'bancada de granito para cozinha pequena': S + 'bancadas-de-cozinha-em-marmore-granito-ou-quartzo/index.html',
  'bancada de cozinha em granito': S + 'bancadas-de-cozinha-em-marmore-granito-ou-quartzo/index.html',
  'bancada sob medida': S + 'bancadas-de-cozinha-em-marmore-granito-ou-quartzo/index.html',
  'instalação de bancada de granito': S + 'montagem-e-instalacao-de-pedras-em-obras/index.html',
  'instalação de bancada de granito goiânia': S + 'montagem-e-instalacao-de-pedras-em-obras/index.html',
  'bancada de granito com cuba esculpida': S + 'cubas-esculpidas-em-pedra-banheiro-lavabo/index.html',
  'bancada de mármore': M + 'marmore/index.html',
  'bancada de banheiro em mármore': S + 'pias-e-lavatorios-para-banheiros/index.html',
  'bancada de quartzo': M + 'quartzo/index.html',
  'bancada de quartzito': S + 'bancada-de-quartzito/index.html',
  'bancada de silestone': M + 'silestone/index.html', 'bancada de silestone goiânia': M + 'silestone/index.html',
  'bancada de ônix': M + 'onix/index.html', 'detalhe decorativo em ônix': M + 'onix/index.html', 'painel de ônix iluminado': M + 'onix/index.html',
  'painel de nanoglass': M + 'nanoglass/index.html', 'bancada de nanoglass': M + 'nanoglass/index.html',
  'bancada de dekton': M + 'dekton/index.html', 'bancada de dekton goiânia': M + 'dekton/index.html',
  'bancada de porcelanato': S + 'bancada-de-porcelanato/index.html',
  // pias, cubas, lavatórios
  'pia de granito': S + 'pias-e-lavatorios-para-banheiros/index.html', 'pia de mármore': S + 'pias-e-lavatorios-para-banheiros/index.html',
  'lavatório de mármore': S + 'pias-e-lavatorios-para-banheiros/index.html',
  'pia de granito para cozinha': S + 'bancadas-de-cozinha-em-marmore-granito-ou-quartzo/index.html',
  'cuba esculpida em granito': S + 'cubas-esculpidas-em-pedra-banheiro-lavabo/index.html', 'lavatório esculpido em pedra': S + 'cubas-esculpidas-em-pedra-banheiro-lavabo/index.html',
  // pisos e revestimentos
  'piso de mármore': S + 'revestimento-de-pisos-em-pedra-natural/index.html', 'piso de granito': S + 'revestimento-de-pisos-em-pedra-natural/index.html',
  'piso de granito goiânia': S + 'revestimento-de-pisos-em-pedra-natural/index.html', 'piso de granilite': S + 'revestimento-de-pisos-em-pedra-natural/index.html',
  'revestimento de mármore': M + 'marmore/index.html', 'revestimento de granito': M + 'granito/index.html',
  'piso de porcelanato': M + 'porcelanato/index.html', 'revestimento de porcelanato': M + 'porcelanato/index.html', 'painel de porcelanato': M + 'porcelanato/index.html',
  'piso de quartzito': M + 'quartzito/index.html', 'revestimento de quartzito': M + 'quartzito/index.html',
  'piso de ardósia': M + 'ardosia/index.html', 'revestimento de ardósia': M + 'ardosia/index.html',
  'piso de travertino': M + 'travertino/index.html', 'revestimento de travertino goiânia': M + 'travertino/index.html', 'fachada de travertino': M + 'travertino/index.html',
  'piso de calcário': M + 'limestone/index.html', 'revestimento em limestone': M + 'limestone/index.html',
  // fachadas, escadas, acabamentos
  'fachada em granito': S + 'fachadas-comerciais-em-granito-marmore/index.html', 'fachada em mármore': S + 'fachadas-comerciais-em-granito-marmore/index.html',
  'escada de mármore': S + 'escadas-em-marmore-ou-granito-retas-e-espiraladas/index.html', 'escada de granito': S + 'escadas-em-marmore-ou-granito-retas-e-espiraladas/index.html',
  'degrau de granito': S + 'escadas-em-marmore-ou-granito-retas-e-espiraladas/index.html',
  'soleira de granito': S + 'soleiras-e-pingadeiras/index.html', 'peitoril de granito': S + 'soleiras-e-pingadeiras/index.html',
  'rodapé de granito': S + 'rodapes-em-pedra-sob-medida/index.html',
  // mobiliário e áreas de lazer
  'mesa de mármore': S + 'mesas-com-tampo-de-marmore-ou-granito/index.html', 'tampo de mesa em granito': S + 'mesas-com-tampo-de-marmore-ou-granito/index.html',
  'aparador de mármore': S + 'mesas-com-tampo-de-marmore-ou-granito/index.html', 'mesa de centro em mármore': S + 'mesas-com-tampo-de-marmore-ou-granito/index.html',
  'lareira de mármore': S + 'revestimento-de-lareiras-e-paineis-de-tv/index.html',
  'churrasqueira revestida em granito': S + 'ilhas-gourmet-e-bancadas-para-churrasqueiras/index.html',
  // funerário (sem serviço dedicado: apontam para o material)
  'mármore para túmulo': M + 'marmore/index.html', 'granito para túmulo': M + 'granito/index.html',
  'lápide de granito': M + 'granito/index.html', 'lápide de granito goiânia': M + 'granito/index.html', 'placa de granito para túmulo': M + 'granito/index.html',
  // serviços técnicos
  'corte de granito sob medida': S + 'projetos-sob-medida-com-corte-a-jato-dagua-cnc/index.html',
  'polimento de mármore': S + 'restauracao-e-polimento-de-marmores-antigos/index.html', 'polimento de mármore goiânia': S + 'restauracao-e-polimento-de-marmores-antigos/index.html',
  'restauração de mármore': S + 'restauracao-e-polimento-de-marmores-antigos/index.html', 'cristalização de mármore': S + 'restauracao-e-polimento-de-marmores-antigos/index.html',
  'impermeabilização de mármore': S + 'impermeabilizacao-de-superficies-de-pedra/index.html',
};

const lista = fs.readFileSync(path.join(SITE, 'keywords-hiperlinks'), 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
for (const k of lista) if (!alvo[k]) throw new Error('keyword sem destino: ' + k);
for (const k of Object.keys(alvo)) {
  if (!lista.includes(k)) throw new Error('destino para keyword fora da lista: ' + k);
  if (!fs.existsSync(path.join(SITE, alvo[k]))) throw new Error('destino inexistente: ' + alvo[k]);
}

module.exports = { SITE, alvo, lista };
