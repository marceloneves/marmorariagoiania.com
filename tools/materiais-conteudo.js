// Conteúdo editorial das páginas de materiais (consumido por gerar-paginas-materiais.js).
// Marcação de links no texto: [[tipo:chave|texto]]
//   m = material, s = serviço, b = artigo do blog, c = cidade, r = regiões atendidas, bairro = bairro de Goiânia
// Revise as afirmações técnicas com o time comercial antes de publicar.

const { S } = require('./bairros-conteudo');

const BLOG = {
  limpar: 'como-limpar-piso-de-granito',
  manchaMarmore: 'como-tirar-mancha-de-marmore',
  clarear: 'como-clarear-marmore-branco',
  ferrugem: 'como-tirar-ferrugem-de-marmore',
  cera: 'qual-e-a-melhor-cera-para-granito',
  melhorGranito: 'qual-e-o-melhor-granito-para-cozinha',
  custo: 'quanto-custa-o-metro-do-granito',
  comoFeito: 'como-e-feito-o-granito',
  furar: 'como-furar-pedra-de-marmore',
  descolar: 'como-descolar-granito-colado-com-massa-plastica',
};

const materiais = [
  {
    slug: 'granito',
    nome: 'Granito',
    meta: 'Granito em Goiânia: veja cores, vantagens, cuidados e onde usar em bancadas, pisos e escadas. Compare com outras pedras e peça orçamento com visita técnica.',
    kw: 'granito, granito em goiânia, bancada de granito, granito preto são gabriel, piso de granito, escada de granito, marmoraria goiânia',
    intro: 'O granito é a pedra mais usada em bancadas e pisos no Brasil, e há uma razão simples: ele une resistência, variedade de cores e um bom custo-benefício. Na Marmoraria Goiânia, trabalhamos com granito em [[s:cozinha|bancadas de cozinha]], pisos, escadas e áreas externas, sempre com medição no local e corte sob medida.',
    secoes: [
      { h: 'O que é o granito', ps: [
        'O granito é uma rocha natural formada pelo resfriamento lento do magma, composta principalmente por quartzo, feldspato e mica. É essa combinação que dá dureza à pedra e cria o desenho granulado característico. Se quiser entender melhor esse processo, veja como [[b:comoFeito|o granito é feito]], da pedreira à peça polida.',
        'Existem dezenas de tipos, do preto liso ao amarelo movimentado, e o comportamento muda de um para outro. Os granitos escuros e de grão fino costumam ser mais densos e absorver menos líquido; os claros e muito movimentados pedem mais atenção com manchas.',
      ] },
      { h: 'Vantagens do granito', ps: [
        'Resiste bem a riscos, calor e impactos do dia a dia, o que o torna uma escolha segura para cozinhas de uso intenso. Também aguenta sol e chuva, e por isso serve para [[s:gourmet|áreas gourmet e churrasqueiras]] e pisos externos.',
        'O custo costuma ser menor do que o de quartzito e de pedras engenheiradas, o que ajuda a fechar o orçamento sem abrir mão de durabilidade. Para ter uma noção de valores, leia [[b:custo|quanto custa o metro do granito]].',
      ] },
      { h: 'Cuidados e limitações', ps: [
        'Granitos claros e porosos podem absorver gordura e manchar se ficarem sem impermeabilização. A solução é aplicar um produto próprio para pedra e limpar líquidos logo que caem, o que é simples e barato. Saiba mais em [[s:impermeab|impermeabilização de pedras]].',
        'Na limpeza, use água e detergente neutro e evite produtos ácidos ou abrasivos. Para pisos, o passo a passo está em [[b:limpar|como limpar piso de granito]], e para dar brilho vale conhecer a [[b:cera|melhor cera para granito]].',
      ] },
    ],
    usos: [
      [S.cozinha, 'A aplicação mais comum: bancadas de cozinha, com recorte de cuba e cooktop.'],
      [S.pisos, 'Pisos internos e externos com acabamento polido, levigado ou flameado.'],
      [S.escadas, 'Degraus e espelhos com boa resistência ao desgaste.'],
      [S.gourmet, 'Bancadas e ilhas de churrasqueira, que aguentam calor e gordura.'],
    ],
    compTitulo: 'Granito ou outro material?',
    comp: [
      'Se você busca o visual de veios do mármore com mais dureza, compare com o [[m:quartzito|quartzito]]. Se prefere uma superfície uniforme e não porosa, olhe o [[m:quartzo|quartzo]] ou o [[m:porcelanato|porcelanato]]. Para banheiros e áreas internas com toque clássico, o [[m:marmore|mármore]] é a alternativa tradicional.',
      'Não sabe qual escolher? Na visita técnica levamos amostras e indicamos a opção conforme o uso, o orçamento e o estilo da casa. Veja também [[b:melhorGranito|qual é o melhor granito para cozinha]].',
    ],
    faq: [
      ['Qual granito é mais indicado para cozinha?', 'Os escuros e de grão uniforme, como o preto, costumam ser os mais resistentes a manchas. Claros também funcionam bem quando recebem impermeabilização.'],
      ['Granito risca ou mancha facilmente?', 'Risca pouco, porque é uma pedra dura. Mancha mais quando é claro e poroso e fica sem proteção; com impermeabilização e limpeza correta, o problema é raro.'],
      ['Posso colocar panela quente sobre o granito?', 'Em geral ele suporta bem o calor, mas o ideal é usar apoio para panelas muito quentes, o que evita choque térmico e preserva o acabamento.'],
    ],
    relacionados: ['marmore', 'quartzito', 'quartzo', 'ardosia'],
  },
  {
    slug: 'marmore',
    nome: 'Mármore',
    meta: 'Mármore em Goiânia: conheça características, cuidados com manchas e onde usar em pisos, lavabos e escadas. Compare com granito e quartzito e peça orçamento.',
    kw: 'mármore, mármore em goiânia, bancada de mármore, mármore branco, piso de mármore, escada de mármore, lavabo de mármore, marmoraria goiânia',
    intro: 'O mármore é sinônimo de sofisticação: veios delicados, brilho profundo e aquele ar clássico que combina com ambientes elegantes. Ele exige mais cuidado do que o granito, mas quando bem indicado e bem tratado entrega um resultado difícil de igualar. A Marmoraria Goiânia executa projetos em mármore e também faz a [[s:restauracao|restauração e o polimento de mármores antigos]].',
    secoes: [
      { h: 'O que é o mármore', ps: [
        'O mármore é uma rocha metamórfica formada a partir do calcário, que sofre calor e pressão ao longo de milhões de anos. É composto principalmente de carbonato de cálcio, e isso explica tanto a beleza da pedra quanto a sensibilidade a ácidos.',
        'Há mármores brancos, bege, cinza, verdes e escuros, cada um com um desenho de veios próprio. Como cada chapa é única, vale escolher a peça pessoalmente sempre que possível.',
      ] },
      { h: 'Onde o mármore funciona melhor', ps: [
        'Em ambientes internos com uso mais leve, como [[s:pias|pias e lavatórios]], [[s:cubas|cubas esculpidas]], [[s:nichos|nichos de banheiro]], lavabos, pisos de sala e [[s:escadas|escadas]]. Também é comum em [[s:mesas|mesas com tampo de pedra]] e em [[s:lareiras|revestimento de lareiras e painéis de TV]].',
        'Em cozinhas de uso intenso, ele exige mais cuidado com suco de limão, vinagre e vinho, que podem corroer o polimento. Se a cozinha é o principal destino, compare com o [[m:granito|granito]] ou o [[m:quartzito|quartzito]].',
      ] },
      { h: 'Manchas, brilho e conservação', ps: [
        'Por ser mais poroso e sensível a ácidos, o mármore pede impermeabilização e limpeza com produtos neutros. Se a mancha já apareceu, veja como [[b:manchaMarmore|tirar mancha de mármore]]. Para peças brancas amareladas, o guia de [[b:clarear|como clarear mármore branco]] ajuda, e para marcas de oxidação há o passo a passo de [[b:ferrugem|como tirar ferrugem de mármore]].',
        'Quando o brilho se perde com o tempo, o polimento devolve a aparência original sem trocar a peça. Se precisar furar para instalar torneiras ou acessórios, leia [[b:furar|como furar pedra de mármore]] com segurança.',
      ] },
    ],
    usos: [
      [S.pias, 'Pias e lavatórios de banheiro e lavabo, com bom efeito visual.'],
      [S.escadas, 'Escadas retas ou espiraladas com degraus em mármore.'],
      [S.pisos, 'Pisos de salas e halls de entrada.'],
      [S.restauracao, 'Recuperação de pisos e peças antigas que perderam o brilho.'],
    ],
    compTitulo: 'Mármore ou outro material?',
    comp: [
      'Se você quer o visual do mármore com mais resistência a riscos e manchas, o [[m:quartzito|quartzito]] costuma ser a melhor alternativa. O [[m:porcelanato|porcelanato]] com estampa de mármore também imita bem o desenho e é bastante prático de manter.',
      'Para quem gosta de superfícies uniformes e sem veios, vale ver o [[m:supernano|supernano]] e o [[m:quartzo|quartzo]]. Fale com a nossa equipe e mostramos amostras lado a lado.',
    ],
    faq: [
      ['Mármore serve para cozinha?', 'Serve, com cuidados. Ácidos como limão e vinagre deixam marcas foscas; se a cozinha é de uso intenso, o granito ou o quartzito costumam ser mais tranquilos.'],
      ['O mármore precisa de impermeabilização?', 'Sim, na maioria dos casos. A proteção reduz a absorção de líquidos e dá mais tempo para limpar antes de manchar.'],
      ['Dá para recuperar um mármore que perdeu o brilho?', 'Dá. O polimento e o tratamento de superfície devolvem o brilho e removem riscos superficiais, sem a necessidade de substituir a peça.'],
    ],
    relacionados: ['granito', 'quartzito', 'porcelanato', 'travertino', 'onix'],
  },
  {
    slug: 'quartzito',
    nome: 'Quartzito',
    meta: 'Quartzito em Goiânia: a pedra natural com visual de mármore e dureza de granito. Veja vantagens, cuidados e usos em bancadas, ilhas e áreas gourmet.',
    kw: 'quartzito, quartzito em goiânia, bancada de quartzito, quartzito branco, ilha de quartzito, pedra natural, marmoraria goiânia',
    intro: 'O quartzito é a pedra natural queridinha de quem quer beleza e resistência juntas: tem veios que lembram o mármore, mas é bem mais duro. É uma escolha frequente em projetos de alto padrão, e a Marmoraria Goiânia oferece [[s:quartzito|bancadas de quartzito]] em cozinhas, banheiros e áreas gourmet.',
    secoes: [
      { h: 'O que é o quartzito', ps: [
        'O quartzito é uma rocha metamórfica formada quando um arenito rico em quartzo é submetido a calor e pressão intensos. O resultado é uma pedra muito densa, de grande dureza e, em geral, baixa absorção de água.',
        'Não confunda com o [[m:quartzo|quartzo]], que é uma pedra engenheirada feita de quartzo triturado e resina. O quartzito é 100% natural.',
      ] },
      { h: 'Vantagens do quartzito', ps: [
        'Resiste bem a riscos, calor e sol, o que permite usar em cozinhas, [[s:gourmet|ilhas gourmet]] e áreas externas cobertas. Os desenhos naturais criam peças únicas, com efeito visual parecido ao do [[m:marmore|mármore]].',
        'Costuma exigir menos manutenção do que o mármore, embora o comportamento varie de um tipo para outro.',
      ] },
      { h: 'Pontos de atenção', ps: [
        'O quartzito é uma família de pedras, e algumas variedades são mais porosas ou mais sensíveis a ácidos do que outras. Por isso, na Marmoraria Goiânia mostramos a amostra e explicamos como aquela pedra específica se comporta antes de você decidir.',
        'O valor por metro tende a ser maior que o do [[m:granito|granito]], já que a extração e o beneficiamento são mais trabalhosos. Em compensação, o resultado estético e a durabilidade justificam o investimento em muitos projetos.',
      ] },
    ],
    usos: [
      [S.quartzito, 'Bancadas em quartzito para cozinhas e banheiros.'],
      [S.gourmet, 'Ilhas e bancadas de churrasqueira com bom desempenho ao calor.'],
      [S.cozinha, 'Bancadas de cozinha com visual sofisticado e uso intenso.'],
      [S.nichos, 'Nichos e revestimentos de banheiro com efeito de pedra natural.'],
    ],
    compTitulo: 'Quartzito ou outro material?',
    comp: [
      'Se o orçamento é mais enxuto, o [[m:granito|granito]] entrega resistência com custo menor. Se a prioridade é uma superfície uniforme, sem porosidade, considere o [[m:quartzo|quartzo]] ou o [[m:porcelanato|porcelanato]]. Para peças mais decorativas e de uso leve, o [[m:marmore|mármore]] continua sendo uma opção clássica.',
      'Nos bairros de imóveis mais sofisticados, como o [[bairro:setor-bueno|Setor Bueno]] e o [[bairro:setor-marista|Setor Marista]], o quartzito é bastante pedido para cozinhas e áreas de estar.',
    ],
    faq: [
      ['Quartzito é melhor que granito?', 'Depende do critério. Ele costuma ser mais sofisticado e igualmente resistente, mas custa mais. O granito continua sendo uma escolha excelente para quem quer bom custo-benefício.'],
      ['Quartzito mancha?', 'Depende do tipo. Variedades densas absorvem pouco; outras exigem impermeabilização. Por isso avaliamos a amostra antes de fechar o projeto.'],
      ['Quartzito é a mesma coisa que quartzo?', 'Não. Quartzito é pedra natural; quartzo é uma pedra engenheirada feita com quartzo moído e resina.'],
    ],
    relacionados: ['marmore', 'granito', 'quartzo', 'dekton'],
  },
  {
    slug: 'quartzo',
    nome: 'Quartzo',
    meta: 'Quartzo em Goiânia: pedra engenheirada uniforme e não porosa para bancadas de cozinha e banheiro. Veja vantagens, cuidados com calor e alternativas.',
    kw: 'quartzo, pedra de quartzo, bancada de quartzo, quartzo branco, quartzo em goiânia, pedra engenheirada, marmoraria goiânia',
    intro: 'A pedra de quartzo é um material engenheirado: reúne quartzo natural triturado e resinas em placas de aparência uniforme. Muita gente escolhe por causa da superfície fechada, que dispensa impermeabilização e é fácil de limpar. A Marmoraria Goiânia fabrica [[s:cozinha|bancadas de cozinha]] e banheiro em quartzo com corte e acabamento sob medida.',
    secoes: [
      { h: 'O que é a pedra de quartzo', ps: [
        'Também chamada de pedra engenheirada, é feita de cerca de 90% de quartzo moído misturado com resina e pigmentos, prensado e curado em placas. Como o desenho é controlado na fábrica, as cores são bem homogêneas, com opções de brancos, cinzas, bege e efeitos que imitam mármore.',
        'É diferente do [[m:quartzito|quartzito]], que é uma rocha natural extraída da terra.',
      ] },
      { h: 'Vantagens do quartzo', ps: [
        'A superfície praticamente não absorve líquidos, o que reduz o risco de manchas de café, vinho e gordura. A limpeza do dia a dia é feita com água e detergente neutro, sem necessidade de impermeabilização. As placas também têm padrão constante, útil quando a bancada precisa combinar com outra peça.',
        'Em bancadas longas e ilhas, a uniformidade do desenho ajuda a manter um visual limpo, com emendas discretas.',
      ] },
      { h: 'Limitações e cuidados', ps: [
        'Por conter resina, o quartzo tolera menos calor direto do que uma pedra natural: não apoie panelas muito quentes sobre a superfície e use suportes. Também não é o material indicado para áreas externas expostas ao sol, que podem alterar a cor da resina.',
        'Se a peça vai ficar ao ar livre, prefira o [[m:granito|granito]], o [[m:quartzito|quartzito]] ou o [[m:porcelanato|porcelanato]], que lidam melhor com sol e chuva.',
      ] },
    ],
    usos: [
      [S.cozinha, 'Bancadas de cozinha com superfície uniforme e fácil limpeza.'],
      [S.pias, 'Pias e lavatórios de banheiro em cores claras e neutras.'],
      [S.balcoes, 'Balcões de recepção e tampos de atendimento em ambientes internos.'],
      [S.mesas, 'Mesas e tampos com desenho contínuo.'],
    ],
    compTitulo: 'Quartzo ou outro material?',
    comp: [
      'Se prefere a variação natural, com veios e movimento, vá de [[m:granito|granito]], [[m:quartzito|quartzito]] ou [[m:marmore|mármore]]. Se quer uma superfície branca e contínua, compare também com o [[m:supernano|supernano]] e o [[m:porcelanato|porcelanato]].',
      'Ao pedir o orçamento, informe se a peça terá contato com calor ou sol. Isso nos ajuda a indicar o material mais seguro.',
    ],
    faq: [
      ['Quartzo precisa de impermeabilização?', 'Não. A superfície é praticamente não porosa, então não há necessidade do tratamento que se faz em pedras naturais.'],
      ['Posso usar quartzo em área externa?', 'Não é o mais indicado, porque a exposição ao sol pode alterar a resina. Para áreas abertas, prefira granito, quartzito ou porcelanato.'],
      ['Quartzo é o mesmo que quartzito?', 'Não. O quartzito é pedra natural; o quartzo é uma pedra engenheirada feita com quartzo moído e resina.'],
    ],
    relacionados: ['quartzito', 'porcelanato', 'supernano', 'silestone'],
  },
  {
    slug: 'porcelanato',
    nome: 'Porcelanato',
    meta: 'Porcelanato em Goiânia: placas de grande formato para bancadas, painéis e revestimentos, leves, resistentes e fáceis de limpar. Compare com pedras naturais.',
    kw: 'porcelanato, bancada de porcelanato, porcelanato em goiânia, porcelanato grande formato, porcelanato estilo mármore, revestimento de porcelanato, marmoraria goiânia',
    intro: 'O porcelanato deixou de ser só piso: em placas de grande formato, ele virou bancada, painel e revestimento com estampas que imitam mármore, granito e cimento queimado. A Marmoraria Goiânia trabalha com [[s:porcelanato|bancadas de porcelanato]], com corte e acabamento de borda feitos por equipe treinada.',
    secoes: [
      { h: 'O que é o porcelanato em placas', ps: [
        'É um material cerâmico de alta densidade, produzido em placas grandes e finas, com a estampa impressa e o acabamento polido ou fosco. Em relação às pedras naturais, ele é mais leve, o que ajuda em revestimentos de parede e em painéis grandes.',
        'A estampa é reproduzida em toda a placa, e a escolha correta do desenho e da direção do veio faz diferença no resultado final.',
      ] },
      { h: 'Vantagens do porcelanato', ps: [
        'Tem baixíssima absorção de água, o que dificulta manchas, e resiste bem a riscos, calor e produtos de limpeza. Também é uma opção prática para [[s:paineis|painéis decorativos e revestimentos de parede]], [[s:lareiras|lareiras e painéis de TV]] e áreas externas cobertas.',
        'Para quem quer a estética do [[m:marmore|mármore]] com menos manutenção, ele é uma alternativa interessante.',
      ] },
      { h: 'Cuidados na instalação', ps: [
        'O corte e o acabamento das bordas pedem técnica: em bancadas, é comum fazer bordas com esquadria a 45 graus para esconder a linha do miolo da placa. As quinas também são mais sensíveis a impacto do que as de uma pedra natural, então vale reforçar o cuidado no uso e na instalação.',
        'Por serem placas grandes, o transporte e o acesso ao local precisam ser planejados. Na visita técnica avaliamos portas, elevadores e circulação antes de fechar o projeto.',
      ] },
    ],
    usos: [
      [S.porcelanato, 'Bancadas de cozinha e banheiro em porcelanato de grande formato.'],
      [S.paineis, 'Painéis decorativos e revestimentos de parede em placas contínuas.'],
      [S.lareiras, 'Revestimento de lareiras e painéis de TV com aparência de pedra.'],
      [S.gourmet, 'Bancadas de áreas gourmet cobertas, com fácil higienização.'],
    ],
    compTitulo: 'Porcelanato ou outro material?',
    comp: [
      'Se o que você quer é uma pedra natural, com peças únicas, veja o [[m:granito|granito]] e o [[m:quartzito|quartzito]]. Para superfície uniforme e não porosa, compare com o [[m:quartzo|quartzo]] e o [[m:supernano|supernano]].',
      'Trabalhamos com o porcelanato em obras de vários perfis. Veja como funciona em [[c:aparecida-de-goiania|Aparecida de Goiânia]] e em [[c:anapolis|Anápolis]], onde são frequentes os pedidos de revestimento e bancada.',
    ],
    faq: [
      ['Bancada de porcelanato risca ou mancha?', 'Resiste bem aos dois, por ser um material denso e de baixa absorção. As quinas, porém, são mais sensíveis a batidas.'],
      ['Posso usar porcelanato em área externa?', 'Em áreas cobertas, sim. Em espaços expostos a sol e chuva pesada, consulte a equipe para indicar o modelo adequado.'],
      ['A borda do porcelanato aparece?', 'Quando a borda é feita com esquadria a 45 graus, a linha do miolo fica escondida e a bancada parece uma peça única e espessa.'],
    ],
    relacionados: ['quartzo', 'supernano', 'marmore', 'dekton'],
  },
  {
    slug: 'supernano',
    nome: 'Supernano',
    meta: 'Supernano em Goiânia: superfície branca uniforme, não porosa e de brilho intenso para bancadas e pias. Veja vantagens, cuidados e alternativas antes de decidir.',
    kw: 'supernano, bancada de supernano, supernano em goiânia, supernano branco, pia de supernano, nanoglass, marmoraria goiânia',
    intro: 'O supernano é um material de aparência branca, uniforme e brilhante, que se tornou popular em cozinhas e banheiros contemporâneos. Quem gosta de um visual limpo e sem veios costuma se encantar. A Marmoraria Goiânia executa [[s:supernano|bancadas em supernano]] com corte e acabamento sob medida.',
    secoes: [
      { h: 'O que é o supernano', ps: [
        'É um material sintético, conhecido no mercado também como nanoglass, obtido pela cristalização de partículas de vidro e minerais em alta temperatura. O resultado é uma superfície não porosa, de branco intenso e sem os veios de uma pedra natural.',
        'A uniformidade do tom é a principal característica: a peça tem aparência consistente do início ao fim, o que facilita projetos com muitos metros lineares.',
      ] },
      { h: 'Vantagens do supernano', ps: [
        'Como não absorve líquidos, a limpeza é simples e o risco de manchas por gordura, café ou vinho é baixo. O brilho intenso valoriza ambientes claros e ajuda a ampliar a sensação de espaço.',
        'É uma boa opção para pias, cubas e bancadas em ambientes internos, em projetos que pedem um branco limpo e homogêneo.',
      ] },
      { h: 'Cuidados no uso', ps: [
        'Superfícies muito claras e polidas mostram riscos com mais facilidade quando recebem produtos abrasivos ou arrastar de objetos. Use esponjas macias e evite saponáceos e palhas de aço.',
        'Assim como outros materiais sintéticos, não é o indicado para áreas externas e exige cuidado com panelas muito quentes: prefira usar um suporte.',
      ] },
    ],
    usos: [
      [S.supernano, 'Bancadas em supernano para cozinhas e banheiros claros.'],
      [S.pias, 'Pias e lavatórios de banheiro com acabamento brilhante.'],
      [S.cubas, 'Cubas integradas com aparência de peça única.'],
      [S.cozinha, 'Bancadas de cozinha em projetos contemporâneos.'],
    ],
    compTitulo: 'Supernano ou outro material?',
    comp: [
      'Se você gosta do branco, mas prefere veios naturais, vale considerar o [[m:marmore|mármore]] ou o [[m:quartzito|quartzito]] branco. Para uma superfície uniforme e mais resistente ao calor, compare com o [[m:porcelanato|porcelanato]] e o [[m:quartzo|quartzo]].',
      'Se a bancada vai ficar em uma área externa, o [[m:granito|granito]] continua sendo a opção mais segura. Peça uma visita técnica e comparamos as amostras no seu ambiente.',
    ],
    faq: [
      ['Supernano mancha?', 'É pouco poroso, então tende a resistir bem a manchas. Ainda assim, convém limpar líquidos escuros logo que caem.'],
      ['Supernano pode ir em área externa?', 'Não é o mais indicado. Para áreas abertas, o granito e o quartzito são escolhas mais seguras.'],
      ['Como limpar bancada de supernano?', 'Com água, detergente neutro e pano macio. Evite esponjas ásperas, palha de aço e produtos abrasivos.'],
    ],
    relacionados: ['porcelanato', 'quartzo', 'marmore', 'nanoglass'],
  },
];

const extra = require('./materiais-extra');
materiais.push(...extra.novos);
for (const m of materiais) m.resumo = extra.resumos[m.slug];

module.exports = { materiais, BLOG };
