# 2026-09-19 — Regiões, bairros, materiais, metas e linkagem por keywords

## Resumo

Expansão de conteúdo e de SEO on-page do site: menu e rodapé, cards de regiões,
páginas de cidade com conteúdo próprio, páginas de bairro e de material, metas
padronizadas e linkagem interna por palavras-chave.

## O que foi feito

### Navegação
- **Cabeçalho:** "Regiões atendidas" à direita de "Contato" (desktop e mobile), em todas as páginas.
- **Rodapé:** "Materiais" logo abaixo de "Serviços" na lista "Institucional", em todas as páginas.
- **Home:** os 12 cards de "Tipos de Materiais que Trabalhamos" agora são links para a página de cada
  material; botão "Compare todos os materiais" leva ao índice. Descrições de Quartzo e Porcelanato corrigidas.

### Páginas novas e reescritas
- **Cidades (7):** Trindade, Aparecida de Goiânia, Senador Canedo, Goianira, Hidrolândia, Anápolis e
  Bela Vista de Goiás ganharam conteúdo único (perfil local, serviços, logística, FAQ, links).
- **Regiões atendidas:** cards clicáveis de cidades e de bairros de Goiânia (`#bairros-atendidos`).
- **Bairros (11):** páginas em `/bairros/marmoraria-no-<bairro>/`.
- **Materiais (13 + índice):** granito, mármore, quartzito, quartzo, silestone, ardósia, travertino, ônix,
  nanoglass, supernano, dekton, limestone e porcelanato, mais `/materiais/` com cards e tabela comparativa.
  Título no padrão `[Material] em Goiânia | Marmoraria Goiânia`, com o termo também na descrição, H1 e subtítulos.

### Metas
- Todos os `<title>` com até 60 caracteres e todas as `meta description` únicas, com até 160.
  Corrigidos 2 títulos de bairro, 1 descrição de bairro, 2 descrições do blog e a página 2 do blog
  (que repetia a da página 1).
- `robots`, `googlebot` e `bingbot` unificados em uma única declaração
  (`index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`).
- `meta keywords` contextuais por página.

### Linkagem interna
- **Materiais:** primeira menção de cada material no corpo de serviços, blog, cidades e bairros
  linka para a página do material (máx. 4 por página; "quartzo" não é linkado no blog).
- **`keywords-hiperlinks`:** as 90 palavras da lista são linkadas para a página contextual
  (abrangentes -> página principal). Cada página de serviço, material, bairro e cidade recebe 1 abrangente
  (rotação entre as 12, sem repetir "Marmoraria Goiânia" em tudo) e ao menos 1 específica do mesmo tema.
  Palavras de túmulo/lápide só entram nas páginas de granito e mármore.
- `llms.txt` ganhou a seção "Materiais".

## Auditoria final
- 0 títulos acima de 60 caracteres, 0 descrições acima de 160, 0 duplicados.
- 5.460 links internos, 0 quebrados. JSON-LD válido em todas as páginas.

## Ferramentas (`tools/`)

Ordem de execução, na raiz do repositório:

    node tools/gerar-paginas-bairros.js
    node tools/gerar-paginas-cidades.js
    node tools/gerar-paginas-materiais.js
    node tools/aplicar-menu-regioes.js
    node tools/aplicar-rodape-materiais.js
    node tools/aplicar-cards-home.js
    node tools/aplicar-links-materiais.js
    node tools/aplicar-metas-seo.js
    node tools/aplicar-links-keywords.js

Todos são idempotentes. Conteúdo editorial: `bairros-conteudo.js`, `cidades-conteudo.js`,
`materiais-conteudo.js`, `materiais-extra.js`. Destino de cada palavra: `keywords-alvos.js`.
Os geradores partem da página de Trindade, então `aplicar-metas-seo.js` e `aplicar-links-keywords.js`
devem rodar por último.

## Pontos para revisão do time comercial
- Distâncias e características locais das cidades e bairros são aproximadas.
- Afirmações técnicas dos materiais (calor, área externa, porosidade) são de referência geral.
- Confirmar que a empresa trabalha com Silestone e Dekton (marcas) e com ônix, ardósia e travertino.
- Nanoglass e supernano são o mesmo tipo de material no mercado; as duas páginas têm textos diferentes
  mas podem competir entre si.
- As frases inseridas para a linkagem por keywords seguem quatro modelos alternados.
