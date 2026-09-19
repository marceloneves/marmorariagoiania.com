// Materiais adicionais (os que aparecem nos cards da home) e resumos de card.
// Mesmo formato de materiais-conteudo.js. Revise as afirmações técnicas com o time comercial.

const { S } = require('./bairros-conteudo');

const resumos = {
  marmore: 'Pedra natural clássica e elegante, muito usada em bancadas, pisos e revestimentos.',
  granito: 'Pedra natural resistente, ideal para bancadas de cozinha e áreas externas.',
  quartzo: 'Pedra engenheirada, uniforme e com alta resistência a manchas e riscos.',
  quartzito: 'Pedra natural, alternativa mais resistente ao mármore.',
  silestone: 'Quartzo industrializado de marca conhecida.',
  ardosia: 'Pedra natural escura, comum em pisos e revestimentos.',
  travertino: 'Pedra natural porosa, usada em fachadas e pisos.',
  onix: 'Pedra translúcida, usada em detalhes decorativos e painéis iluminados.',
  nanoglass: 'Superfície de vidro cristalizado, de alto padrão.',
  dekton: 'Superfície ultracompacta, resistente a calor e riscos.',
  limestone: 'Pedra natural de tonalidade clara, também chamada de calcário.',
  porcelanato: 'Placas de grande formato para bancadas, painéis e revestimentos.',
  supernano: 'Superfície branca uniforme e não porosa para bancadas e pias.',
};

const novos = [
  {
    slug: 'silestone',
    nome: 'Silestone',
    meta: 'Silestone em Goiânia: bancadas de quartzo engenheirado com superfície não porosa e fácil de limpar. Veja vantagens, cuidados e alternativas antes de decidir.',
    kw: 'silestone, silestone em goiânia, bancada de silestone, silestone branco, quartzo industrializado, pedra engenheirada, marmoraria goiânia',
    intro: 'Silestone é uma marca conhecida de quartzo engenheirado, muito procurada para cozinhas e banheiros que pedem um visual uniforme e uma limpeza sem complicação. Na Marmoraria Goiânia, fazemos projetos em silestone e em outras marcas de [[m:quartzo|quartzo]], com medição no local, corte sob medida e instalação.',
    secoes: [
      { h: 'O que é o Silestone', ps: [
        'É uma superfície feita de quartzo natural triturado combinado com resinas e pigmentos, prensada em placas. Como o desenho é definido na fábrica, as cores são consistentes de uma placa para outra, o que facilita projetos com várias peças que precisam combinar.',
        'Não é uma rocha extraída da natureza, como o [[m:granito|granito]] ou o [[m:quartzito|quartzito]]. É um produto industrializado, com padrões e tonalidades que a natureza dificilmente repete.',
      ] },
      { h: 'Vantagens do Silestone', ps: [
        'A superfície é praticamente não porosa: líquidos como café, vinho e gordura têm pouca chance de penetrar, e a limpeza costuma ser feita com água e detergente neutro. Também dispensa a impermeabilização periódica que as pedras naturais pedem.',
        'A variedade de cores e acabamentos permite combinar a bancada com armários, revestimentos e pisos. Em [[s:cozinha|bancadas de cozinha]] e [[s:pias|pias de banheiro]], o resultado é limpo e contemporâneo.',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'Por conter resina, o material tolera menos calor direto que uma pedra natural: use suportes sob panelas quentes. Ele também não é indicado para áreas externas expostas ao sol, que podem alterar a cor da superfície.',
        'Produtos abrasivos e solventes fortes podem danificar o brilho. Para a rotina, pano macio, água e detergente neutro resolvem.',
      ] },
    ],
    usos: [
      [S.cozinha, 'Bancadas e ilhas de cozinha com superfície uniforme.'],
      [S.pias, 'Pias e lavatórios em cores claras e neutras.'],
      [S.balcoes, 'Balcões e tampos internos de atendimento.'],
      [S.mesas, 'Mesas e tampos com desenho contínuo.'],
    ],
    compTitulo: 'Silestone ou outro material?',
    comp: [
      'Se você prefere a variação natural, com veios e movimento, compare com o [[m:granito|granito]], o [[m:quartzito|quartzito]] e o [[m:marmore|mármore]]. Se busca uma superfície ainda mais resistente ao calor e ao sol, veja o [[m:dekton|Dekton]] e o [[m:porcelanato|porcelanato]].',
      'Na visita técnica levamos amostras de diferentes materiais e ajudamos a comparar cor, toque e custo no seu ambiente.',
    ],
    faq: [
      ['Silestone é pedra natural?', 'Não. É quartzo engenheirado: quartzo natural triturado, resinas e pigmentos prensados em placas.'],
      ['Silestone precisa de impermeabilização?', 'Não. A superfície praticamente não absorve líquidos, então não há a necessidade de tratamento que as pedras naturais exigem.'],
      ['Posso usar Silestone em área externa?', 'Não é o mais indicado, porque a exposição ao sol pode alterar a superfície. Para áreas abertas, prefira granito, quartzito ou Dekton.'],
    ],
    relacionados: ['quartzo', 'dekton', 'porcelanato'],
  },
  {
    slug: 'ardosia',
    nome: 'Ardósia',
    meta: 'Ardósia em Goiânia: pedra natural de aspecto rústico e antiderrapante para pisos, áreas de piscina e revestimentos. Veja usos, cuidados e alternativas.',
    kw: 'ardósia, ardósia em goiânia, piso de ardósia, revestimento de ardósia, ardósia preta, pedra natural, marmoraria goiânia',
    intro: 'A ardósia é uma pedra natural de textura marcante e tons escuros, que traz um ar rústico e acolhedor para pisos e paredes. Muito usada em áreas externas por ser naturalmente antiderrapante, ela também funciona em ambientes internos que pedem personalidade. A Marmoraria Goiânia instala ardósia em [[s:pisos|pisos e revestimentos em pedra natural]], com acabamento e vedação adequados.',
    secoes: [
      { h: 'O que é a ardósia', ps: [
        'É uma rocha metamórfica formada a partir de argilas compactadas, com estrutura em lâminas finas. Essa característica permite dividir a pedra em placas de espessura reduzida, e explica o aspecto folheado e irregular da superfície.',
        'As cores variam entre cinza-escuro, preto, verde e tons ferruginosos. Cada placa tem variações de tom, e é esse efeito que dá ao ambiente um visual natural.',
      ] },
      { h: 'Vantagens da ardósia', ps: [
        'A superfície naturalmente texturizada oferece boa aderência, o que ajuda em áreas molhadas como beira de piscina, varandas e churrasqueiras. Também resiste bem a variações de temperatura e ao uso externo.',
        'É uma alternativa de bom custo-benefício para revestir grandes áreas, e combina bem com o [[m:granito|granito]] e o [[m:travertino|travertino]] em projetos de paisagismo e áreas de lazer.',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'Por ser folheada, a ardósia pode soltar pequenas lascas com o tempo, sobretudo em placas de baixa qualidade. A aplicação de resina ou de impermeabilizante ajuda a fixar a superfície, realçar a cor e facilitar a limpeza. Veja [[s:impermeab|impermeabilização de pedras]].',
        'Não é o material mais indicado para bancadas de cozinha, em que a superfície irregular dificulta a limpeza. Para esse uso, prefira [[m:granito|granito]], [[m:quartzito|quartzito]] ou [[m:quartzo|quartzo]].',
      ] },
    ],
    usos: [
      [S.pisos, 'Pisos internos e externos com acabamento natural.'],
      [S.paineis, 'Painéis e revestimentos de parede com textura marcante.'],
      [S.gourmet, 'Áreas gourmet e churrasqueiras com piso antiderrapante.'],
      [S.soleiras, 'Soleiras e detalhes de entrada.'],
    ],
    compTitulo: 'Ardósia ou outro material?',
    comp: [
      'Se você quer um piso externo mais liso e uniforme, compare com o [[m:porcelanato|porcelanato]] ou o [[m:granito|granito]] flameado. Para um visual mais claro e suave, veja o [[m:travertino|travertino]] e o [[m:limestone|limestone]].',
      'Na visita técnica avaliamos a área, o uso e a exposição ao sol e à água para indicar o acabamento mais seguro.',
    ],
    faq: [
      ['Ardósia é antiderrapante?', 'Em geral sim, principalmente no acabamento natural. Por isso é comum em áreas de piscina e varandas.'],
      ['Ardósia precisa de impermeabilização?', 'Recomendamos aplicar resina ou impermeabilizante para realçar a cor, reduzir a absorção de líquidos e facilitar a limpeza.'],
      ['Posso usar ardósia em bancada de cozinha?', 'Não é a melhor indicação, porque a superfície irregular dificulta a limpeza. Prefira granito, quartzito ou quartzo.'],
    ],
    relacionados: ['granito', 'travertino', 'limestone'],
  },
  {
    slug: 'travertino',
    nome: 'Travertino',
    meta: 'Travertino em Goiânia: pedra de tons claros e textura porosa para pisos, fachadas e banheiros. Veja vantagens, cuidados e onde usar.',
    kw: 'travertino, travertino em goiânia, piso de travertino, travertino romano, revestimento de travertino, fachada de travertino, marmoraria goiânia',
    intro: 'O travertino é uma pedra de tons claros e textura característica, que traz elegância discreta a pisos, fachadas e banheiros. Ele é muito usado em projetos contemporâneos por sua cor acolhedora e pelo desenho de veios horizontais. A Marmoraria Goiânia executa projetos em travertino com medição no local e acabamento sob medida.',
    secoes: [
      { h: 'O que é o travertino', ps: [
        'É uma rocha sedimentar calcária, formada pela deposição de carbonato de cálcio em fontes de água mineral. Por isso apresenta pequenos vazios naturais, que muitas vezes são preenchidos com massa durante o beneficiamento para deixar a superfície regular.',
        'As cores vão do bege claro ao creme e ao dourado, com veios marcados. Pode ser levigado, polido, escovado ou bruto, e cada acabamento muda o visual e o toque da peça.',
      ] },
      { h: 'Onde o travertino funciona melhor', ps: [
        'É uma boa escolha para [[s:pisos|pisos]], [[s:fachadas|fachadas]], revestimentos de parede, lavabos e banheiros. Também aparece em mesas, bancadas de apoio e detalhes de decoração, como [[s:lareiras|lareiras e painéis de TV]].',
        'Por ser calcário, tem comportamento parecido com o do [[m:marmore|mármore]]: bonito e clássico, mas sensível a ácidos.',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'Substâncias ácidas, como limão, vinagre e alguns produtos de limpeza, podem manchar ou opacificar a superfície. A impermeabilização periódica é recomendada, principalmente em áreas molhadas.',
        'Para a limpeza, use água e detergente neutro. Em áreas externas, o travertino funciona bem em locais cobertos ou com pouca exposição direta à chuva.',
      ] },
    ],
    usos: [
      [S.pisos, 'Pisos internos e externos em tons claros.'],
      [S.fachadas, 'Fachadas e revestimentos externos com aspecto natural.'],
      [S.pias, 'Pias e bancadas de banheiro e lavabo.'],
      [S.mesas, 'Mesas e tampos com textura marcante.'],
    ],
    compTitulo: 'Travertino ou outro material?',
    comp: [
      'Se você quer a mesma leveza, mas com mais resistência, considere o [[m:quartzito|quartzito]] ou o [[m:porcelanato|porcelanato]] com efeito travertino. Para outro calcário de tom claro e aspecto uniforme, veja o [[m:limestone|limestone]].',
      'Pedimos que informe, no orçamento, onde a pedra será usada. Isso nos ajuda a indicar o acabamento e a proteção adequados.',
    ],
    faq: [
      ['Travertino tem furinhos?', 'Sim, é uma característica natural. Eles costumam ser preenchidos com massa para deixar a superfície mais regular, e também há acabamentos que mantêm o aspecto original.'],
      ['Travertino serve para área externa?', 'Serve em áreas cobertas ou com pouca exposição direta. Em locais muito molhados, a impermeabilização periódica é importante.'],
      ['Travertino mancha?', 'Pode manchar com ácidos e líquidos escuros se ficar sem proteção. A impermeabilização e a limpeza rápida reduzem o problema.'],
    ],
    relacionados: ['marmore', 'limestone', 'ardosia'],
  },
  {
    slug: 'onix',
    nome: 'Ônix',
    meta: 'Ônix em Goiânia: pedra translúcida para painéis iluminados, balcões e lavabos de alto impacto visual. Veja cuidados, usos e alternativas.',
    kw: 'ônix, ônix em goiânia, painel de ônix, ônix retroiluminado, bancada de ônix, balcão de ônix, pedra translúcida, marmoraria goiânia',
    intro: 'O ônix é a pedra dos projetos que querem causar impacto: translúcida, cheia de veios e capaz de ganhar um brilho especial quando iluminada por trás. É um material delicado e exclusivo, indicado para detalhes de destaque. A Marmoraria Goiânia executa peças em ônix com projeto e instalação cuidadosos.',
    secoes: [
      { h: 'O que é o ônix', ps: [
        'É uma pedra natural de aspecto translúcido e veios marcantes, formada por depósitos minerais em camadas. As cores mais comuns são mel, branco, verde e tons quentes, com padrões que nunca se repetem.',
        'A translucidez é o grande diferencial: com iluminação por trás, a pedra ganha profundidade e transforma o ambiente. É por isso que ela é usada mais como peça de destaque do que como superfície de uso pesado.',
      ] },
      { h: 'Onde usar o ônix', ps: [
        'Funciona muito bem em painéis retroiluminados, balcões de bar e recepção, lavabos, cubas e detalhes decorativos. Em [[s:balcoes|balcões de recepção]] e [[s:paineis|painéis decorativos]], o efeito visual é imediato.',
        'Por ser mais frágil, é indicado para ambientes de uso mais leve e para peças que não recebem impacto frequente.',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'O ônix é mais macio e sensível que o [[m:granito|granito]] e o [[m:quartzito|quartzito]]: risca com facilidade e reage a ácidos. O transporte e a instalação pedem mão de obra experiente, e o custo costuma ser mais alto.',
        'Na limpeza, use apenas pano macio e produtos neutros. Para peças que ficam iluminadas, o projeto deve prever ventilação e o tipo de iluminação adequado, sem excesso de calor.',
      ] },
    ],
    usos: [
      [S.paineis, 'Painéis decorativos com retroiluminação.'],
      [S.balcoes, 'Balcões de bar, recepção e atendimento de destaque.'],
      [S.cubas, 'Cubas e lavabos com efeito escultural.'],
      [S.lareiras, 'Revestimentos e detalhes de lareiras e painéis de TV.'],
    ],
    compTitulo: 'Ônix ou outro material?',
    comp: [
      'Se você quer o efeito luxuoso, mas com mais resistência, o [[m:quartzito|quartzito]] e o [[m:marmore|mármore]] têm veios marcantes e mais robustez. O [[m:nanoglass|nanoglass]] e o [[m:dekton|Dekton]] são alternativas para superfícies contínuas de uso intenso.',
      'Para saber se o ônix é a escolha certa, conte para a nossa equipe onde ele será instalado e como será usado.',
    ],
    faq: [
      ['Ônix precisa de iluminação por trás?', 'Não, mas é ela que revela a translucidez da pedra. Em painéis, o retroiluminado costuma ser a escolha mais valorizada.'],
      ['Ônix serve para bancada de cozinha?', 'Não é a melhor indicação, porque é mais macio e sensível a riscos e ácidos. Ele funciona melhor em peças de destaque e ambientes de uso leve.'],
      ['Ônix é caro?', 'Costuma custar mais que pedras de uso comum, por causa da raridade e da delicadeza do beneficiamento. Peça um orçamento para o seu projeto.'],
    ],
    relacionados: ['marmore', 'quartzito', 'nanoglass'],
  },
  {
    slug: 'nanoglass',
    nome: 'Nanoglass',
    meta: 'Nanoglass em Goiânia: superfície de vidro cristalizado, branca e não porosa, para bancadas, pias e painéis. Veja vantagens, cuidados e alternativas.',
    kw: 'nanoglass, nanoglass em goiânia, bancada de nanoglass, vidro cristalizado, nanoglass branco, pia de nanoglass, marmoraria goiânia',
    intro: 'O nanoglass é uma superfície de vidro cristalizado, de branco intenso e brilho marcante, muito usada em projetos contemporâneos que buscam um visual limpo e homogêneo. Muita gente também o conhece como [[m:supernano|supernano]]. A Marmoraria Goiânia executa peças em nanoglass com corte e acabamento sob medida.',
    secoes: [
      { h: 'O que é o nanoglass', ps: [
        'É um material sintético produzido a partir de vidro submetido a altas temperaturas, que resulta em uma placa densa, não porosa e de cor uniforme. No mercado, ele aparece também como vidro cristalizado ou sinterizado, e o nome supernano é bastante usado para o mesmo tipo de produto.',
        'Diferente das pedras naturais, não há veios nem variações: a peça tem aparência consistente do início ao fim, o que é valorizado em bancadas longas e ambientes minimalistas.',
      ] },
      { h: 'Vantagens do nanoglass', ps: [
        'A superfície fechada dificulta a absorção de líquidos e facilita a limpeza. O branco intenso amplia visualmente o ambiente e combina bem com marcenaria escura, revestimentos coloridos e iluminação em LED.',
        'Funciona bem em [[s:pias|pias e lavatórios]], [[s:cubas|cubas]] e bancadas de ambientes internos, além de painéis decorativos.',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'Superfícies muito claras e polidas tendem a mostrar riscos quando recebem produtos abrasivos. Use esponjas macias e evite saponáceos e palha de aço.',
        'Como outros materiais sintéticos, não é indicado para áreas externas, e convém usar suporte sob panelas muito quentes. Para uso ao ar livre, prefira [[m:granito|granito]] ou [[m:dekton|Dekton]].',
      ] },
    ],
    usos: [
      [S.supernano, 'Bancadas em supernano e nanoglass para cozinhas e banheiros claros.'],
      [S.pias, 'Pias e lavatórios com acabamento brilhante.'],
      [S.cubas, 'Cubas integradas com aparência de peça única.'],
      [S.paineis, 'Painéis e revestimentos internos em branco uniforme.'],
    ],
    compTitulo: 'Nanoglass ou outro material?',
    comp: [
      'Se você gosta do branco, mas prefere veios naturais, considere o [[m:marmore|mármore]] ou o [[m:quartzito|quartzito]] claro. Para uma superfície uniforme e mais resistente ao calor, compare com o [[m:porcelanato|porcelanato]], o [[m:quartzo|quartzo]] e o [[m:dekton|Dekton]].',
      'Na visita técnica mostramos amostras lado a lado para você comparar tom, brilho e toque no seu ambiente.',
    ],
    faq: [
      ['Nanoglass e supernano são a mesma coisa?', 'São nomes usados no mercado para o mesmo tipo de superfície de vidro cristalizado. Na prática, o que importa é conferir a amostra e as especificações da placa.'],
      ['Nanoglass mancha?', 'É pouco poroso, então tende a resistir bem. Ainda assim, convém limpar líquidos escuros logo que caem.'],
      ['Nanoglass serve para área externa?', 'Não é o mais indicado. Para áreas abertas, o granito e o Dekton são escolhas mais seguras.'],
    ],
    relacionados: ['supernano', 'porcelanato', 'dekton'],
  },
  {
    slug: 'dekton',
    nome: 'Dekton',
    meta: 'Dekton em Goiânia: superfície ultracompacta resistente a calor, riscos e sol para bancadas, fachadas e pisos. Veja vantagens, cuidados e alternativas.',
    kw: 'dekton, dekton em goiânia, bancada de dekton, superfície ultracompacta, dekton fachada, piso de dekton, marmoraria goiânia',
    intro: 'Dekton é uma superfície ultracompacta de alto desempenho, pensada para quem precisa de resistência extrema sem abrir mão do design. Ela suporta calor, riscos e exposição ao sol melhor do que a maioria dos materiais, o que amplia seu uso para cozinhas, fachadas e pisos externos. A Marmoraria Goiânia executa projetos em Dekton com corte técnico e instalação cuidadosa.',
    secoes: [
      { h: 'O que é o Dekton', ps: [
        'É uma superfície produzida por sinterização: uma mistura de matérias-primas como vidro, porcelana e quartzo é submetida a altíssima pressão e temperatura, o que gera uma placa muito densa e compacta. Dekton é uma marca da Cosentino, a mesma do Silestone.',
        'Há opções que imitam pedras naturais, cimento queimado, metal e madeira. O desenho não é natural, e sim reproduzido por tecnologia, com boa fidelidade.',
      ] },
      { h: 'Vantagens do Dekton', ps: [
        'Resiste bem a calor, riscos, manchas e raios UV, o que permite usar em cozinhas de uso intenso, áreas externas e fachadas. As placas de grande formato permitem revestir superfícies extensas com poucas emendas.',
        'Por ser fina e resistente, é uma boa opção para [[s:paineis|painéis e revestimentos]], [[s:fachadas|fachadas]] e [[s:gourmet|áreas gourmet]].',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'O corte, o recorte de cubas e o acabamento de borda exigem ferramentas e técnica específicas, o que torna a mão de obra mais especializada. As quinas são sensíveis a impactos pontuais, então os cantos precisam de cuidado no uso e na instalação.',
        'O custo costuma ser maior que o de pedras de uso comum. Vale comparar o investimento com a durabilidade esperada do projeto.',
      ] },
    ],
    usos: [
      [S.cozinha, 'Bancadas de cozinha em ambientes de uso intenso.'],
      [S.fachadas, 'Fachadas e revestimentos externos resistentes ao sol.'],
      [S.gourmet, 'Bancadas e ilhas de áreas gourmet, inclusive externas.'],
      [S.pisos, 'Pisos e revestimentos de grandes áreas.'],
    ],
    compTitulo: 'Dekton ou outro material?',
    comp: [
      'Se o projeto pede um material mais barato e igualmente resistente, compare com o [[m:granito|granito]] e o [[m:porcelanato|porcelanato]]. Para uma superfície natural com veios, veja o [[m:quartzito|quartzito]].',
      'Se você está entre o Dekton e o [[m:silestone|Silestone]], a diferença principal está na resistência ao calor e ao sol: o Dekton é mais indicado para áreas externas, e o Silestone para interiores.',
    ],
    faq: [
      ['Dekton pode ser usado em área externa?', 'Sim. Ele resiste bem à exposição solar e às variações de temperatura, o que o torna adequado para fachadas e áreas gourmet.'],
      ['Dekton risca ou mancha?', 'Resiste bem aos dois. As quinas, porém, são mais sensíveis a batidas e exigem cuidado.'],
      ['Dekton é o mesmo que porcelanato?', 'Não. Ambos são materiais densos, mas o Dekton é uma superfície ultracompacta produzida por sinterização, com composição e desempenho próprios.'],
    ],
    relacionados: ['porcelanato', 'silestone', 'granito'],
  },
  {
    slug: 'limestone',
    nome: 'Limestone',
    meta: 'Limestone em Goiânia: o calcário de tom claro e aspecto suave para pisos, fachadas e revestimentos. Veja vantagens, cuidados e onde usar.',
    kw: 'limestone, limestone em goiânia, calcário, pedra calcária, piso de limestone, revestimento de calcário, fachada de limestone, marmoraria goiânia',
    intro: 'Limestone é o nome usado para o calcário de tom claro e aparência suave, muito escolhido em projetos que buscam uma estética serena e natural. É comum em pisos, fachadas e revestimentos internos, especialmente em ambientes que valorizam a cor neutra. A Marmoraria Goiânia executa peças em limestone (calcário) com medição no local e instalação sob medida.',
    secoes: [
      { h: 'O que é o limestone', ps: [
        'É uma rocha sedimentar composta principalmente de carbonato de cálcio, formada pela compactação de sedimentos ao longo de milhões de anos. É da mesma família do [[m:marmore|mármore]], que resulta da transformação metamórfica do calcário.',
        'As cores vão do branco ao bege e ao cinza claro, com aparência mais uniforme e fosca do que a do mármore. Costuma ser apresentado em acabamentos como levigado, escovado e flameado.',
      ] },
      { h: 'Onde o limestone funciona melhor', ps: [
        'É uma boa escolha para [[s:pisos|pisos]], [[s:fachadas|fachadas]], [[s:paineis|revestimentos de parede]], soleiras e lavabos. O tom neutro combina com madeira, concreto e vegetação, e por isso é frequente em projetos contemporâneos.',
        'Em ambientes molhados ou de uso intenso, pense em um acabamento que facilite a limpeza e receba proteção adequada.',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'Como todo calcário, é sensível a ácidos, como limão, vinagre e produtos de limpeza agressivos, que podem manchar ou opacificar a superfície. É mais macio que o [[m:granito|granito]], e por isso risca com mais facilidade.',
        'A impermeabilização e a limpeza com produtos neutros ajudam a preservar a cor. Veja [[s:impermeab|impermeabilização de pedras]].',
      ] },
    ],
    usos: [
      [S.pisos, 'Pisos internos e externos de tom claro.'],
      [S.fachadas, 'Fachadas e revestimentos externos de aspecto suave.'],
      [S.paineis, 'Painéis e revestimentos de parede.'],
      [S.soleiras, 'Soleiras e detalhes de acabamento.'],
    ],
    compTitulo: 'Limestone ou outro material?',
    comp: [
      'Se você quer um calcário poroso e de veios horizontais, veja o [[m:travertino|travertino]]. Para mais resistência a manchas e riscos, compare com o [[m:quartzito|quartzito]] e o [[m:porcelanato|porcelanato]] com efeito pedra.',
      'Na visita técnica levamos amostras e explicamos como cada acabamento se comporta com o uso e com a limpeza.',
    ],
    faq: [
      ['Limestone é a mesma coisa que calcário?', 'Sim. Limestone é o nome em inglês do calcário, e o termo é usado no mercado para pedras de tom claro e aspecto uniforme.'],
      ['Limestone mancha?', 'Pode manchar com ácidos e líquidos escuros se ficar sem proteção. A impermeabilização e a limpeza rápida reduzem o risco.'],
      ['Limestone serve para área externa?', 'Serve em fachadas e áreas cobertas, com o acabamento e a proteção adequados. Em pisos muito molhados, prefira acabamento antiderrapante.'],
    ],
    relacionados: ['travertino', 'marmore', 'ardosia'],
  },
];

module.exports = { novos, resumos };
