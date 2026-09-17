# Otimização de Core Web Vitals / Lighthouse — marmorariagoiania.com

Trabalho realizado em 2026-09-17 sobre as 48 páginas HTML do site estático,
a partir do relatório do Lighthouse que apontava **Desempenho 69**,
**Acessibilidade 96**, **Práticas recomendadas 96** e **SEO 83**.

## Resultado

Medido com Lighthouse (mobile, padrão) em servidor local com gzip e cache
equivalentes ao `.htaccess` de produção, comparando o commit anterior
(`07d5b77`) com o estado atual:

| Página | Antes | Depois |
|---|---|---|
| `/` | Perf 96 · A11y 96 · BP 96 · SEO 83 | **100 · 100 · 100 · 100** |
| `/servicos/` | Perf 96 · A11y 100 · BP 96 · SEO 83 | **100 · 100 · 100 · 100** |
| `/blog/como-limpar-piso-de-granito/` | Perf 95 · A11y 100 · BP 96 · SEO 83 | **100 · 100 · 100 · 100** |

Métricas da home: FCP 1,9 s → **1,1 s**; LCP 2,6 s → **1,1 s**;
Speed Index 1,9 s → **1,1 s**; TBT **0 ms** e CLS **0** (mantidos).
Peso total transferido por página: ~89 KiB.

> Observação: o relatório original acusava 69 de desempenho porque o servidor
> local usado no teste não aplicava compressão nem cache (`Nenhuma compactação
> aplicada`, TTL de 1 h). Em produção o `.htaccess` já cuida disso; os números
> acima usam um servidor com gzip para refletir o ambiente real.

## O que foi feito

### 1. CSS: 460 KB inline → ~90 KB minificado e sem bloqueio de renderização

Cada página carregava ~460 KB de CSS inline (Bootstrap + tema + FontAwesome +
Flaticon + boxicons completos), dos quais o Lighthouse apontava **426 KB não
utilizados**, mais uma folha externa bloqueante do LiteSpeed.

- Todo o CSS de cada página (4 blocos `<style>` + a folha externa) foi unido,
  passado pelo **PurgeCSS** contra o HTML *daquela* página e o JS do tema,
  e minificado com **clean-css**.
- A purga é feita **por página** — as páginas não compartilham o mesmo CSS
  (o CSS de `contato/` tem regras que o de `index.html` não tem, por exemplo
  `.contact-side-box .info-box h3`). Purgar tudo com base numa única página
  quebraria o layout das demais.
- Classes aplicadas por JavaScript (Owl Carousel, Bootstrap, lazyload etc.)
  foram preservadas por *safelist*.
- A folha externa `wp-content/litespeed/css/31e235a9….css` (4,6 KB) era 100%
  CSS morto de um plugin de anúncios (`.anuncio-adsninja`, `#popup`, …), sem
  nenhuma ocorrência no HTML. **Removida** — era a única requisição que
  bloqueava a renderização.
- O bloco `ads_box_estilo-personalizado-inline-css`, também do mesmo plugin
  e igualmente morto, foi removido.

### 2. Fontes de ícone: 163 KB → 2,5 KB

- `boxicons.woff2` (73 KB) era pré-carregado e declarado em `@font-face`, mas
  **nenhuma classe `.bx`** existe no site. Removido por completo.
- FontAwesome e Flaticon usam, no site inteiro, **8 glifos**:
  `\f095 \f0e0 \f102 \f103 \f11d \f127 \f12f \f232`. Foram gerados subsets
  com apenas esses glifos (`*-subset.woff2`):
  - `fontawesome-webfont.woff2`: 77.160 → **1.520 bytes**
  - `Flaticon.woff2`: 12.800 → **1.040 bytes**
- Os `@font-face` passaram a declarar só o `woff2` do subset (os formatos
  legados `eot`/`ttf`/`svg`/`woff` não são usados por nenhum navegador atual).
- Os arquivos de fonte originais foram mantidos no repositório para permitir
  regerar os subsets caso novos ícones passem a ser usados.

### 3. Scripts mortos removidos

| Script | Motivo |
|---|---|
| Beacon do Cloudflare Insights | Gerava `405` em `/cdn-cgi/rum` e “JavaScript legado” no relatório; o site não está atrás do Cloudflare |
| `guest.vary.php` (LiteSpeed) | `POST` para um PHP inexistente → `405` + `SyntaxError: Failed to execute 'json'` no console |
| `litespeed_docref` | Resquício do plugin de cache, sem função em site estático |
| `SuperLazyLoads` (5,5 KB) | Segundo carregador de JS adiado, duplicando o do LiteSpeed |
| `adsbygoogle.js` | Nenhum bloco `<ins class="adsbygoogle">` no site |
| Firebase App + Messaging (web push) | Dependiam de `firebase-messaging-sw.js`, que não existe no site |
| Classe `AiWebPushFront` (7,1 KB, no bundle JS) | Mesmo motivo; sem ela, o bundle lançava `ReferenceError: AI_WEB_PUSH_MANUAL_INIT is not defined` |

O carregador de JS adiado do LiteSpeed foi mantido (é o que garante **TBT
0 ms**), com um *fallback* acrescentado: se não houver interação, os scripts
adiados (gtag, jQuery, bundle do tema) carregam sozinhos em `load` + 4 s —
comportamento que antes vinha do `SuperLazyLoads` removido.

O bloco de *speculation rules* estava marcado como `type="litespeed/javascript"`,
o que fazia o navegador tentar executar JSON como JavaScript
(`SyntaxError: Unexpected token ':'`). Corrigido para `type="speculationrules"`,
ativando de fato o prefetch de navegação.

**Resultado: zero erros no console** (antes havia 3 na home).

### 4. LCP

- A imagem do LCP é um `background-image` de CSS (`.bg-two` na home,
  `.item-bg-1` nas demais), invisível ao *preload scanner*. Todas as 48
  páginas agora trazem
  `<link rel="preload" as="image" href="…Imagem-Banner-scaled.webp" fetchpriority="high">`
  logo após o `<meta charset>`.
- Isso zera as três pendências da auditoria “Descoberta de solicitações de LCP”.

### 5. Preconnect / preload

- Removidos 5 `preconnect` inúteis (`index.html`, `stats.g.doubleclick.net`,
  `www.google.com`, `www.google.com.br`, `www.google-analytics.com`) e o
  `dns-prefetch` do `gstatic.com` — todos apontados como não utilizados.
- Removidos os 3 `preload` de fonte: estavam **sem `crossorigin`**, o que fazia
  o navegador baixar cada fonte **duas vezes** (visível no relatório original,
  com `fontawesome-webfont.woff2` e `Flaticon.woff2` listados em duplicidade).
  Com o CSS inline, as fontes já são descobertas imediatamente.

### 6. SEO

- `rel="canonical"` era `href="index.html"` (URL relativa) em todas as páginas
  — o Lighthouse marcava “não é um URL absoluto”. Agora usa a URL absoluta de
  cada página (derivada do `og:url`), ex.:
  `https://marmorariagoiania.com/servico/soleiras-e-pingadeiras/`.
- Os 3 `hreflang` (`pt`, `pt-br`, `x-default`) tinham o mesmo problema e
  receberam a mesma URL absoluta.

### 7. Acessibilidade

- O `<iframe>` do Google Maps na home não tinha `title`. Adicionado:
  *"Mapa de localização da Marmoraria Goiânia no Google Maps"*.

### 8. `.htaccess`

- `frame-src 'self'` na CSP **bloqueava o mapa do Google** em produção;
  liberado `https://www.google.com` e `https://maps.google.com`.
- Adicionado `Cross-Origin-Opener-Policy: same-origin` (auditoria COOP).
- Tipos MIME das fontes atualizados para os padrões atuais
  (`font/woff2`, `font/woff` no lugar de `application/font-*`), com os
  `ExpiresByType` correspondentes.
- Adicionado bloco `mod_brotli` (usado quando disponível, com gzip de
  fallback) e `application/json` na lista de compressão.

## Validação

- **Regressão visual**: screenshots de página inteira das 48 páginas, antes e
  depois, comparadas pixel a pixel (pixelmatch).
  - 375 px (mobile): **0 páginas com diferença**.
  - 1280 px (desktop): diferenças de 0,1–0,4 % em 1–3 páginas, variando a cada
    execução — são os tiles do iframe do Google Maps e antialiasing de texto,
    não mudanças de layout. Todas as alturas de página idênticas.
- **Erros de console**: nenhum nas 48 páginas (antes: 3 na home).
- **JavaScript adiado**: verificado que jQuery e o bundle do tema continuam
  carregando após interação do usuário e pelo fallback de `load` + 4 s.

## Tamanhos

| | Antes | Depois |
|---|---|---|
| HTML das 48 páginas (soma) | 25,36 MB | **7,30 MB** |
| `index.html` | 587 KB | **197 KB** |
| `index.html` transferido (gzip) | — | **~35 KB** |
| Fontes de ícone baixadas | 163 KB | **2,5 KB** |
| Requisições bloqueando renderização | 1 | **0** |
