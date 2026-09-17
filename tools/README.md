# tools/

## `otimizar-core-web-vitals.js`

Script de **transformação única** aplicado em 2026-09-17 sobre o export
original do WordPress (commit `07d5b77`) para produzir a versão otimizada do
site. Está aqui como registro reproduzível do que foi feito — ver
`log/2026-09-17-otimizacao-core-web-vitals.md`.

Ele **não é idempotente**: espera encontrar o bloco `<style>` de ~460 KB do
export original e falha se rodado sobre as páginas já otimizadas.

Dependências (instaladas fora do repositório):

    npm install purgecss clean-css subset-font

Os caminhos de `require()` no topo do script apontam para o local onde essas
dependências foram instaladas na máquina em que ele rodou; ajuste antes de
reexecutar.
