# Histórico do Projeto — marmorariagoiania.com

Documento de acompanhamento do trabalho realizado no repositório até 2026-09-17.

## Contexto

O site é uma exportação estática do WordPress (via SiteSucker) do site
`marmorariagoiania.com`, convertida para HTML/CSS/JS puro para hospedagem
estática (Apache).

## Histórico de commits

1. **`9a31245` — Baseline: raw SiteSucker export from WordPress site**
   Importação inicial do site tal como capturado do WordPress em produção,
   sem nenhuma alteração — serve como ponto de referência ("antes").

2. **`a494571` — Convert WordPress/SiteSucker export into a clean static HTML/CSS/JS site**
   Conversão do export bruto do WordPress/SiteSucker em um site estático
   limpo, removendo dependências de WordPress/PHP e deixando apenas
   HTML/CSS/JS servível diretamente por qualquer servidor estático.

3. **`f0d5276` — Add .htaccess for Apache static hosting**
   Adição de arquivo `.htaccess` para hospedagem em Apache, incluindo:
   - Redirecionamento para HTTPS e para URL canônica
   - Configuração de tipos MIME
   - Cache de arquivos estáticos
   - Compressão gzip
   - Cabeçalhos de segurança

## Alterações incluídas nesta sessão

**Arquivo:** `marmorariagoiania.com-main/index.html`

1. Meta tags de SEO (já registradas anteriormente):
   - Adição de meta tag `keywords`:
     `marmoraria goiania, marmoraria, marmoraria go, marmores goiania, marmores go, marmoraria perto, marmoraria em goiania, marmoraria em go`
   - Atualização das diretivas de indexação para buscadores, ampliando o
     conteúdo das tags `robots`, `googlebot` e adicionando `bingbot`:
     - Antes: `content="index,follow"`
     - Depois: `content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"`

2. Nova seção **"Tipos de Materiais que Trabalhamos"**, inserida antes da
   seção de Blog, com um grid de 13 cards descrevendo os materiais
   trabalhados: Mármore, Granito, Quartzo, Quartzito, Silestone, Ardósia,
   Travertino, Ônix, Nanoglass, Dekton, Limestone (Calcário) e Porcelanato.

3. Nova seção de **FAQ ("Dúvidas Sobre a Marmoraria em Goiânia")**,
   inserida após a seção de Blog, com 6 perguntas e respostas focadas em
   SEO local/conversão:
   - Quanto custa contratar uma marmoraria em Goiânia?
   - Como escolher uma marmoraria Go confiável?
   - Quais granitos em Goiânia são mais indicados para bancada de cozinha?
   - Quanto tempo leva para instalar uma bancada de mármore ou granito?
   - A marmoraria em Goiânia atende toda a região metropolitana?
   - É melhor optar por mármore, granito ou quartzo?

Essas mudanças são melhorias de SEO e conteúdo: palavras-chave e diretivas
mais detalhadas para os robôs de busca, além de conteúdo adicional
(materiais trabalhados e FAQ) para aumentar relevância temática, tempo de
permanência na página e cobertura de buscas de cauda longa relacionadas a
"marmoraria em Goiânia".

## Estrutura atual do repositório

```
marmorariagoiania.com-main/          (raiz do repositório git)
└── marmorariagoiania.com-main/      (conteúdo do site)
    ├── index.html
    ├── .htaccess
    ├── blog/
    ├── contato/
    ├── politica-de-privacidade/
    ├── quem-somos/
    ├── regioes-atendidas/
    ├── servico/
    ├── servicos/
    └── wp-content/
```

## Próximos passos sugeridos

- Validar as novas meta tags de SEO em ferramentas como Google Search
  Console / Rich Results Test.
- Continuar revisão de outras páginas do site em busca de melhorias
  semelhantes de SEO (keywords, meta description, robots).
