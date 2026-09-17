# Correções de Validação W3C (HTML/CSS) — marmorariagoiania.com

Documento de acompanhamento das correções de erros e avisos reportados pelo
validador do W3C (validator.w3.org) em 2026-09-17, aplicadas em todas as
páginas HTML do site (48 arquivos em `marmorariagoiania.com-main/`).

## Contexto

O site é uma exportação estática do WordPress convertida para HTML/CSS/JS
puro. Vários erros de marcação e um bloco de CSS quebrado eram herança direta
do export (plugins do WordPress, microdata gerado automaticamente, templates
com placeholders não preenchidos). As correções abaixo foram aplicadas em
lote em todas as páginas afetadas, garantindo consistência entre elas.

## Erros corrigidos

### 1. Barra de fechamento em elemento void (`<link ... />`)

O validador aponta que a barra `/>` em elementos void (como `<link>`) não
tem efeito em HTML5 e pode gerar comportamento inesperado com atributos sem
aspas.

- **Antes:** `<link data-optimized="2" rel="stylesheet" href="...css" />`
- **Depois:** `<link data-optimized="2" rel="stylesheet" href="...css">`
- Aplicado nas **48 páginas** do site.

### 2. CSS inválido no bloco `#ads_box_estilo-personalizado-inline-css`

Bloco de estilo residual de um plugin de anúncios do WordPress (AdsNinja/
Ads Box), com placeholders de cor e tamanho de fonte nunca preenchidos,
gerando declarações CSS inválidas:

- `color: !important;` (sem valor antes de `!important`)
- `font-size: px !important;` (unidade `px` sem número)

As classes usadas nesse bloco (`.anuncio-adsninja`, `#popup`) não existem em
nenhuma página do site — é CSS morto. As duas declarações inválidas foram
removidas, mantendo o restante do bloco intacto.

- Aplicado nas **48 páginas** do site.

### 3. `width="100%"` inválido em `<iframe>` (mapa do Google, `index.html`)

O atributo HTML `width` de um `<iframe>` exige um valor numérico (dígitos),
não aceitando `%`. O iframe do Google Maps na home usava
`width="100%" height="450"` como atributos HTML.

- **Antes:** `<iframe ... width="100%" height="450" style="border:none;" ...>`
- **Depois:** `<iframe ... style="border:none;width:100%;height:450px;" ...>`
- O layout responsivo é preservado via CSS em `style`.
- Único ocorrência no site: `index.html`.

### 4. Microdata de breadcrumb sem `itemscope` (schema.org/BreadcrumbList)

Os elementos `<ul>` e `<li>` da trilha de navegação (breadcrumb) declaravam
`itemtype` sem o `itemscope` correspondente, e os `itemprop` internos
(`itemListElement`, `item`, `name`, `position`) ficavam "órfãos" — sem item
ao qual pertencer. Isso gerava múltiplos erros de "itemtype/itemprop sem
itemscope" por página.

- Adicionado `itemscope` em:
  - `<ul class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList" ...>`
  - `<li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">`
  - `<li class="breadcrumb-item active" aria-current="page" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">`
- Aplicado nas **47 páginas** que usam breadcrumb.

### 5. `<style>` como filho direto de `<body>` (página "Quem Somos")

Elemento `<style>.has-text-align-center{text-align:center!important}</style>`
estava posicionado no `<body>`, logo após o `<nav>` — posição não permitida
pela especificação HTML (`<style>` só é válido dentro de `<head>`, ou dentro
de `<noscript>` que seja filho de `<head>`).

- Movido o bloco `<style>` para dentro do `<head>`, antes de `</head>`.
- Único ocorrência: `quem-somos/index.html`.

### 6. Seção sem heading (aviso, página "Quem Somos")

Após remover o `<style>` do body, o validador ainda alertava sobre uma
`<section>` sem título. A seção em questão era uma galeria
(`<div class="row popup-gallery">`) completamente vazia — sobra de um bloco
de galeria do WordPress sem nenhuma imagem cadastrada.

- Seção removida por inteiro (sem conteúdo e sem heading, não havia motivo
  para mantê-la).
- Único ocorrência: `quem-somos/index.html`.

### 7. Salto de nível de heading (página "Contato")

Os títulos `Endereço`, `Telefone`, `Whatsapp` e `E-mail`, dentro dos boxes
de informação de contato, estavan marcados como `<h4>` logo após um `<h2>`
("Fale conosco"), pulando o nível `h3`.

- Alterados os quatro títulos de `<h4>` para `<h3>`.
- Atualizada a regra CSS correspondente `.info-box h4 { ... }` para
  `.info-box h3 { ... }`, preservando a aparência visual (tamanho de fonte e
  margem inferior).
- Único ocorrência: `contato/index.html`.

## Verificação

Após cada correção, foi feita varredura em todas as 48 páginas HTML do site
para confirmar que:

- Nenhum outro elemento void possui barra de fechamento (`/>`).
- Nenhuma outra ocorrência do CSS quebrado do plugin de anúncios permanece.
- Nenhum outro `<iframe>` usa `width`/`height` com `%` como atributo HTML.
- Todos os `<ul>`/`<li>` de breadcrumb possuem `itemscope`.
- Nenhum outro `<style>` está posicionado fora do `<head>`.
- Nenhuma outra página tem heading pulando nível.
- Estrutura básica de `<html>`/`<body>`/`</html>` está íntegra em todas as
  páginas.

## Próximos passos sugeridos

- Rodar o validador do W3C (validator.w3.org) novamente em uma amostra de
  páginas (home, uma página de serviço, uma de região atendida, uma de
  blog) para confirmar ausência de novos erros.
- Avaliar remover por completo os resíduos do plugin de anúncios do
  WordPress (script `AI_WEB_PUSH_*` e CSS associado) já que não há uso
  funcional no site estático atual.
