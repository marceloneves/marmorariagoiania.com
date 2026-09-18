# 2026-09-17 — Link de sitemap no rodapé e ajuste do título da home

## Resumo

Duas mudanças pontuais de SEO/UX aplicadas nas 48 páginas do site:

1. **Link "Sitemap" no rodapé**, adicionado logo abaixo de "Política de Privacidade" no widget "Institucional", apontando para `https://marmorariagoiania.com/sitemap_index.xml` (abre em nova aba).
2. **Título (`<title>`) da home** alterado de `Marmoraria em Goiânia` para `Marmoraria em Goiânia - GO | (62) 9286-1117`. As demais 47 páginas mantiveram seus títulos originais.

## O que foi feito

- Inserção do `<li>` do link de sitemap via `sed` nas 48 páginas (`index.html` de blog, serviços, regiões atendidas, institucional etc.), ancorado no `<span itemprop="name">Política de Privacidade</span>` do menu de rodapé.
- Atualização do `<title>` apenas em `index.html` (home).
- Validado servindo o site localmente (`npx http-server`) e conferindo o `<title>` renderizado.

## Validação

✅ Link de sitemap presente nas 48 páginas (`grep -c` confirmando 1 ocorrência por arquivo)
✅ Título da home conferido via `curl http://localhost:8000/`
