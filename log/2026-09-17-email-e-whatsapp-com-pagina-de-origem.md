# 2026-09-17 — E-mail visível no rodapé e rastreamento de página nos CTAs de WhatsApp

## Resumo

Duas mudanças aplicadas nas 48 páginas do site:

1. **E-mail de contato**: substituída a ofuscação Cloudflare (`cdn-cgi/l/email-protection`, exibida como "[email protected]") por um link `mailto:` simples e visível com `contato@marmorariagoiania.com` — mesmo e-mail já usado no schema JSON-LD (`ContactPoint`).
2. **CTAs de WhatsApp com página de origem**: todos os links `https://api.whatsapp.com/send?phone=...` agora recebem, via script no `<head>`/fim do `<body>`, a URL da página atual anexada ao texto da mensagem (`... - Página: https://marmorariagoiania.com/...`). Isso permite identificar de qual página o lead veio, sem precisar hardcodar a URL em cada uma das 48 páginas.

## O que foi feito

- `sed -E` com regex tolerante a atributos extras (`style="text-transform:lowercase"` em algumas páginas de serviço) para trocar o bloco `<a href="...email-protection#...">...</a>` por `<a href="mailto:contato@marmorariagoiania.com">contato@marmorariagoiania.com</a>` nas 48 páginas.
- Script Node.js para injetar, antes de `</body></html>`, um pequeno `<script>` que:
  - seleciona todos os `a[href*="api.whatsapp.com/send"]`;
  - lê o parâmetro `text` atual;
  - anexa `" - Página: " + window.location.href`;
  - reescreve o `href`.
- Abordagem via JS (em vez de hardcodar a URL por página) porque o link precisa refletir a URL real de produção em cada página, incluindo futuras páginas, sem necessidade de manutenção manual.

## Validação

✅ 0 ocorrências restantes de `cdn-cgi/l/email-protection` nas 48 páginas
✅ Teste com Playwright (Chromium headless) na página `servico/bancada-de-porcelanato`: os 5 CTAs de WhatsApp da página carregaram com `text` contendo `- Página: http://localhost:8000/servico/bancada-de-porcelanato/index.html`
✅ `mailto:contato@marmorariagoiania.com` confirmado via `curl` no servidor local
