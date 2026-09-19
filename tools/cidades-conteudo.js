// Conteúdo editorial das páginas de cidade (consumido por gerar-paginas-cidades.js).
// Distâncias e características locais são aproximadas: revise com o time comercial
// antes de publicar.

const { S } = require('./bairros-conteudo');

const cidades = [
  {
    slug: 'trindade',
    nome: 'Trindade',
    meta: 'Marmoraria em Trindade, GO: bancadas, pias, pisos e revestimentos em pedra para casas, comércios e pousadas da cidade da romaria. Orçamento com visita técnica.',
    intro: 'Trindade fica a cerca de 18 km de Goiânia e mistura dois mundos: a rotina de uma cidade em crescimento, com muitos loteamentos e casas novas, e o movimento da romaria do Divino Pai Eterno, que sustenta comércio, restaurantes e hospedagem o ano inteiro. A Marmoraria Goiânia atende os dois públicos com projetos em mármore, granito, quartzito e porcelanato, medidos e instalados no local.',
    perfilTitulo: 'Casas novas e comércios que recebem muita gente',
    perfil: [
      'Nos bairros residenciais, o pedido mais comum é o de quem acabou de construir ou está terminando a obra: bancada de cozinha, pia de banheiro, soleiras e peitoris. Como muitas casas são entregues com acabamento básico, a pedra costuma ser a primeira melhoria que o morador escolhe para valorizar o imóvel.',
      'Já os negócios ligados à romaria, como restaurantes, lanchonetes, lojas e pousadas, precisam de superfícies que aguentem uso intenso, limpeza frequente e picos de movimento. Para esses casos, indicamos pedras de baixa porosidade e acabamento fácil de higienizar.',
    ],
    demandasTitulo: 'O que mais fazemos em Trindade',
    demandas: [
      [S.cozinha, 'Bancadas para casas recém-construídas, em granito, quartzo ou porcelanato, com recorte de cuba e cooktop.'],
      [S.balcoes, 'Balcões de atendimento e tampos para restaurantes, lojas e recepções de pousadas.'],
      [S.pisos, 'Pisos e soleiras em pedra natural para áreas de circulação, varandas e entradas.'],
      [S.pias, 'Pias e lavatórios para banheiros de casas e de quartos de hospedagem.'],
    ],
    logisticaTitulo: 'Como funciona o atendimento',
    logistica: 'Saímos de Goiânia com a equipe de medição e agendamos o dia da visita com você. Depois da aprovação do projeto, as peças são cortadas na marmoraria e levadas prontas para instalação, o que reduz a poeira e o tempo de obra no seu imóvel. Se o seu comércio precisa funcionar na época da romaria, avise no orçamento: planejamos a data de entrega para não coincidir com o período de maior movimento.',
    faq: [
      ['Vocês atendem comércios em Trindade durante a romaria?', 'Atendemos. O ideal é fechar o projeto com antecedência para que a instalação aconteça antes do período de maior movimento, sem interromper o seu atendimento ao público.'],
      ['Qual pedra é mais indicada para balcão de restaurante?', 'Materiais de baixa porosidade, como quartzo, quartzito e porcelanato, resistem melhor a gordura e a produtos de limpeza. O granito também funciona bem quando recebe impermeabilização adequada.'],
      ['Existe cobrança para a visita técnica em Trindade?', 'As condições da visita técnica são combinadas no momento do orçamento, conforme a localização e o tamanho do projeto. Fale com a nossa equipe pelo WhatsApp para confirmar.'],
    ],
    vizinhos: ['aparecida-de-goiania', 'goianira', 'senador-canedo'],
  },
  {
    slug: 'aparecida-de-goiania',
    nome: 'Aparecida de Goiânia',
    meta: 'Marmoraria em Aparecida de Goiânia: bancadas, ilhas gourmet, escadas e revestimentos em mármore e granito para casas, condomínios e empresas. Peça orçamento.',
    intro: 'Aparecida de Goiânia é a segunda maior cidade de Goiás e está tão colada à capital que muita gente nem percebe onde termina uma e começa a outra. Por isso, o atendimento da Marmoraria Goiânia aqui é rápido e frequente: são muitas obras ao mesmo tempo, de casas populares a condomínios e galpões comerciais.',
    perfilTitulo: 'Uma cidade grande, com obras de todos os tamanhos',
    perfil: [
      'Em Aparecida convivem bairros consolidados, loteamentos novos e condomínios fechados de médio e alto padrão. Isso se reflete nos pedidos: enquanto um cliente quer uma bancada simples e resistente para a cozinha da família, outro pede ilha gourmet, escada em mármore e painel decorativo para a sala.',
      'A cidade também tem um forte comércio e muitos prédios em construção. Construtoras e incorporadoras nos procuram para fornecer bancadas, soleiras e peitoris em quantidade, com padronização de medidas e prazo combinado.',
    ],
    demandasTitulo: 'O que mais fazemos em Aparecida de Goiânia',
    demandas: [
      [S.cozinha, 'Bancadas de cozinha e área de serviço para casas e apartamentos, em várias faixas de preço.'],
      [S.gourmet, 'Ilhas e bancadas de churrasqueira para condomínios fechados e casas com quintal.'],
      [S.escadas, 'Escadas retas e espiraladas em mármore ou granito para sobrados.'],
      [S.fachadas, 'Fachadas e revestimentos comerciais para lojas, clínicas e escritórios.'],
    ],
    logisticaTitulo: 'Atendimento para obras grandes e pequenas',
    logistica: 'Como a distância até Goiânia é curta, conseguimos encaixar visitas técnicas com agilidade e acompanhar obras em andamento. Para condomínios, combinamos previamente com a administração horários de entrada e regras de descarga de material. Em obras com várias unidades, é possível dividir a entrega por etapa.',
    faq: [
      ['Vocês fornecem para construtoras em Aparecida de Goiânia?', 'Sim. Trabalhamos com projetos de várias unidades, com padronização de medidas e cronograma de entrega definido em conjunto com a obra.'],
      ['Posso escolher a pedra pessoalmente antes de fechar?', 'Pode. Mostramos as chapas e amostras disponíveis para que você confira cor, veios e acabamento antes de aprovar o projeto.'],
      ['A instalação em condomínio tem alguma exigência especial?', 'Muitos condomínios pedem aviso prévio e horário para obras. Nós nos adaptamos às regras da administração para a instalação ocorrer sem problemas.'],
    ],
    vizinhos: ['senador-canedo', 'trindade', 'hidrolandia'],
  },
  {
    slug: 'senador-canedo',
    nome: 'Senador Canedo',
    meta: 'Marmoraria em Senador Canedo, GO: bancadas, pias e revestimentos em granito, quartzo e mármore para casas, loteamentos e empresas do polo industrial.',
    intro: 'Senador Canedo cresceu rápido nos últimos anos, puxada por loteamentos novos e por um polo industrial e logístico próximo à capital. A cerca de 20 km de Goiânia, a cidade tem hoje muitas casas em construção e empresas que precisam de acabamentos duráveis, e é esse tipo de demanda que a Marmoraria Goiânia atende na região.',
    perfilTitulo: 'Loteamentos novos e empresas em expansão',
    perfil: [
      'Nos loteamentos, a maioria dos clientes está construindo a primeira casa. O pedido costuma ser prático: bancada de cozinha, pia de banheiro e soleiras, com bom custo-benefício e pedra que resista ao uso diário de uma família.',
      'Por causa do perfil industrial da cidade, também recebemos pedidos de empresas, como balcões de recepção, bancadas de copa e refeitório e revestimentos de áreas de entrada. Nesses casos o foco é resistência a impacto e facilidade de limpeza.',
    ],
    demandasTitulo: 'O que mais fazemos em Senador Canedo',
    demandas: [
      [S.cozinha, 'Bancadas de cozinha para casas novas, com opções em granito e quartzo para diferentes orçamentos.'],
      [S.pias, 'Pias de banheiro e lavabo dimensionadas para casas de loteamento.'],
      [S.balcoes, 'Balcões de recepção e bancadas de copa e refeitório para empresas.'],
      [S.soleiras, 'Soleiras e pingadeiras que protegem entradas e janelas da água da chuva.'],
    ],
    logisticaTitulo: 'Da medição à instalação',
    logistica: 'A medição é feita no local, com a obra já com armários e revestimentos no lugar. Em construções novas, orientamos o cliente sobre altura, recuo e ponto de água para que a pedra encaixe sem retrabalho. Para empresas, combinamos a instalação fora do horário de pico, evitando parar a operação.',
    faq: [
      ['Qual pedra é boa para quem está construindo com orçamento controlado?', 'O granito em tons médios e escuros oferece ótima resistência com preço acessível. Na visita técnica mostramos opções de quartzo e porcelanato caso você queira comparar.'],
      ['Vocês atendem empresas e indústrias da região?', 'Atendemos. Fazemos balcões, bancadas de copa e revestimentos para ambientes corporativos, com instalação combinada para não atrapalhar a rotina.'],
      ['Posso pedir orçamento só com a planta da casa?', 'Podemos estimar valores com a planta, mas o orçamento final depende da medição no local, que garante que as peças encaixem com a obra pronta.'],
    ],
    vizinhos: ['aparecida-de-goiania', 'trindade', 'hidrolandia'],
  },
  {
    slug: 'goianira',
    nome: 'Goianira',
    meta: 'Marmoraria em Goianira, GO: bancadas de cozinha, pias, soleiras e áreas gourmet em granito, mármore e quartzo, com medição no local e orçamento sem compromisso.',
    intro: 'Goianira está a cerca de 20 km de Goiânia, no eixo da GO-070, e é uma das cidades da região metropolitana que mais recebe novas famílias. Quem mora ou constrói ali costuma buscar acabamento de qualidade sem pagar preço de capital, e a Marmoraria Goiânia leva projetos sob medida até a sua obra, com o mesmo padrão aplicado em Goiânia.',
    perfilTitulo: 'Cidade residencial em crescimento',
    perfil: [
      'Grande parte da demanda vem de casas térreas em loteamentos e de moradores que estão reformando imóveis mais antigos. A cozinha é quase sempre o ponto de partida, mas o pedido logo se estende ao banheiro, à área de serviço e à varanda.',
      'Como é comum a casa ter quintal, o espaço gourmet aparece bastante nos orçamentos: uma bancada com churrasqueira, pia e mesa em pedra que suporte sol, chuva e gordura.',
    ],
    demandasTitulo: 'O que mais fazemos em Goianira',
    demandas: [
      [S.cozinha, 'Bancadas de cozinha e área de serviço em granito ou quartzo, com cuba embutida ou sobreposta.'],
      [S.gourmet, 'Bancadas para churrasqueira e áreas de lazer em quintais e varandas.'],
      [S.pias, 'Pias e lavatórios para banheiros e lavabos.'],
      [S.mesas, 'Mesas com tampo de pedra para cozinhas, varandas e áreas externas.'],
    ],
    logisticaTitulo: 'Atendimento sem complicação',
    logistica: 'Agendamos a visita técnica em Goianira de acordo com a sua disponibilidade e, após aprovar o projeto, as peças chegam cortadas e prontas para montagem. Se a obra ainda estiver em andamento, avisamos qual é a hora certa da medição para não haver diferença entre o projeto e a casa pronta.',
    faq: [
      ['Vocês atendem reformas pequenas, como trocar só a pia?', 'Atendemos. Não existe tamanho mínimo: fazemos desde uma pia de banheiro até a cozinha completa.'],
      ['Qual material aguenta melhor a área externa?', 'Granitos escuros e o quartzito são os mais indicados para o exterior, pois resistem bem ao sol e à chuva. Pedras claras e porosas pedem impermeabilização.'],
      ['Quanto tempo leva entre a medição e a instalação?', 'O prazo depende do material e da complexidade do projeto. Informamos a previsão no orçamento, junto com o valor final.'],
    ],
    vizinhos: ['trindade', 'aparecida-de-goiania', 'anapolis'],
  },
  {
    slug: 'hidrolandia',
    nome: 'Hidrolândia',
    meta: 'Marmoraria em Hidrolândia, GO: pedras para chácaras, sítios e casas de campo. Áreas gourmet, bancadas, pisos e revestimentos com visita técnica e instalação.',
    intro: 'Hidrolândia é uma cidade de perfil mais tranquilo, com bastante zona rural, chácaras e sítios usados tanto para moradia quanto para fins de semana. A cerca de 30 km de Goiânia, ela pede um tipo de projeto diferente do urbano, e a Marmoraria Goiânia leva a estrutura da capital até o seu terreno, com pedra própria para o ambiente e para o uso.',
    perfilTitulo: 'Casas de campo pedem pedra resistente',
    perfil: [
      'Nas chácaras e sítios, as casas costumam ter varandas amplas, cozinhas grandes e áreas externas movimentadas. A pedra precisa lidar com poeira, umidade, gordura de churrasco e mudanças de temperatura, o que torna a escolha do material tão importante quanto o desenho.',
      'Também é comum o cliente que constrói aos poucos, em etapas. Adaptamos o orçamento para que a bancada da cozinha seja feita primeiro e as demais peças, como pia de banheiro e revestimentos, entrem em uma fase seguinte.',
    ],
    demandasTitulo: 'O que mais fazemos em Hidrolândia',
    demandas: [
      [S.gourmet, 'Cozinhas gourmet e bancadas de churrasqueira em varandas e áreas de lazer.'],
      [S.cozinha, 'Bancadas amplas para cozinhas de chácaras e casas de campo.'],
      [S.pisos, 'Pisos e soleiras em pedra natural para varandas e entradas.'],
      [S.impermeab, 'Impermeabilização de pedras usadas em áreas externas, para reduzir manchas e desgaste.'],
    ],
    logisticaTitulo: 'Como chegamos até a sua chácara',
    logistica: 'Como a viagem é mais longa, organizamos a visita técnica com dia e horário fechados e, sempre que possível, aproveitamos para medir mais de um ambiente na mesma ida. Se a chácara tem acesso por estrada de terra, avise antes: isso nos ajuda a planejar o transporte das peças com segurança.',
    faq: [
      ['Vocês atendem zona rural, chácaras e sítios?', 'Sim. Passe o endereço ou a localização pelo WhatsApp e confirmamos o atendimento e o agendamento da visita.'],
      ['Que pedra usar em uma cozinha gourmet ao ar livre?', 'Granitos escuros, quartzitos e alguns porcelanatos técnicos aguentam bem sol, chuva e gordura. Evite pedras claras e porosas sem impermeabilização.'],
      ['Posso fazer o projeto em etapas?', 'Pode. Organizamos o orçamento por ambiente, e você decide qual peça fazer primeiro.'],
    ],
    vizinhos: ['aparecida-de-goiania', 'senador-canedo', 'bela-vista-de-goias'],
  },
  {
    slug: 'anapolis',
    nome: 'Anápolis',
    meta: 'Marmoraria em Anápolis, GO: bancadas, fachadas, escadas e revestimentos em mármore, granito e quartzito para casas, clínicas e empresas. Peça um orçamento.',
    intro: 'Anápolis é uma das maiores e mais movimentadas cidades de Goiás, com forte atividade industrial, logística e comercial. A cerca de 55 km de Goiânia, pelas rodovias BR-060 e BR-153, ela tem obras residenciais e comerciais em ritmo constante, e a Marmoraria Goiânia atende projetos de diferentes escalas na cidade.',
    perfilTitulo: 'Obras residenciais e comerciais em uma cidade grande',
    perfil: [
      'Anápolis tem bairros residenciais consolidados, condomínios de alto padrão e muitos prédios em construção. Nos apartamentos e casas, os pedidos mais comuns são bancadas, lavabos, nichos e revestimentos de parede que trazem sofisticação ao ambiente.',
      'O comércio e o setor de serviços também são intensos. Clínicas, consultórios, escritórios, lojas e restaurantes procuram balcões de recepção, fachadas e pisos em pedra que transmitam solidez e sejam fáceis de manter.',
    ],
    demandasTitulo: 'O que mais fazemos em Anápolis',
    demandas: [
      [S.cozinha, 'Bancadas de cozinha em mármore, granito ou quartzo para casas e apartamentos.'],
      [S.balcoes, 'Balcões de recepção para clínicas, escritórios, lojas e hotéis.'],
      [S.fachadas, 'Fachadas comerciais em granito ou mármore para pontos de rua e empresas.'],
      [S.escadas, 'Escadas em pedra para sobrados e casas de alto padrão.'],
    ],
    logisticaTitulo: 'Como atendemos uma cidade a 55 km',
    logistica: 'Por conta da distância, concentramos as visitas técnicas em agendas combinadas e cuidamos para que a medição seja feita uma única vez, com tudo definido. Assim, as peças são produzidas em Goiânia e levadas para Anápolis já prontas para montagem. Em obras comerciais, alinhamos a instalação com o cronograma do empreiteiro ou do responsável pelo imóvel.',
    faq: [
      ['Vocês atendem obras grandes em Anápolis?', 'Atendemos. Para obras com várias unidades ou grandes áreas, montamos um cronograma de produção e entrega em conjunto com a construtora.'],
      ['Posso ver amostras antes de fechar o orçamento?', 'Pode. Combinamos a apresentação de amostras e chapas para você conferir cor, veios e acabamento antes de aprovar.'],
      ['Fazem fachada para loja e escritório?', 'Sim. Executamos fachadas comerciais em granito e mármore, com projeto sob medida e fixação adequada ao tipo de parede.'],
    ],
    vizinhos: ['goianira', 'trindade', 'aparecida-de-goiania'],
  },
  {
    slug: 'bela-vista-de-goias',
    nome: 'Bela Vista de Goiás',
    meta: 'Marmoraria em Bela Vista de Goiás: bancadas, pisos, áreas gourmet e revestimentos em pedra para casas, fazendas e comércios. Visita técnica e orçamento.',
    intro: 'Bela Vista de Goiás fica a cerca de 50 km de Goiânia e tem uma vocação ligada ao campo, com fazendas, chácaras e comércio voltado para a região rural. Casas amplas, varandas generosas e áreas de lazer são comuns, e é para esse tipo de obra que a Marmoraria Goiânia oferece projetos sob medida em mármore, granito e quartzito.',
    perfilTitulo: 'Casas amplas e sedes de fazenda',
    perfil: [
      'As residências em Bela Vista tendem a ser grandes, com cozinhas espaçosas e áreas de convivência integradas. Isso pede bancadas longas, ilhas centrais e mesas em pedra, com peças que às vezes exigem cortes especiais e cuidado no transporte.',
      'Nas sedes de fazenda e casas de campo, o uso intenso do espaço externo faz a escolha do material ser decisiva. Pedras mais escuras, com bom acabamento e impermeabilização correta, mantêm a aparência por muito mais tempo.',
    ],
    demandasTitulo: 'O que mais fazemos em Bela Vista de Goiás',
    demandas: [
      [S.cozinha, 'Bancadas e ilhas amplas para cozinhas de casas grandes, com emendas bem resolvidas.'],
      [S.gourmet, 'Áreas gourmet com churrasqueira, pia e bancada para varandas e espaços de lazer.'],
      [S.pisos, 'Pisos e soleiras em pedra natural para varandas e entradas de casas de campo.'],
      [S.mesas, 'Mesas com tampo de pedra para cozinhas e áreas de convivência.'],
    ],
    logisticaTitulo: 'Planejamento para peças grandes',
    logistica: 'Em bancadas e ilhas de grande comprimento, o transporte e o acesso à obra exigem planejamento. Na visita técnica avaliamos portas, corredores e desníveis para garantir que a peça entre e seja posicionada sem risco. Como a cidade fica mais afastada, agrupamos a medição e a instalação em datas combinadas, para evitar idas e vindas.',
    faq: [
      ['Bancadas longas precisam de emenda?', 'Depende do tamanho da chapa e do projeto. Quando há emenda, posicionamos em pontos discretos e a fazemos com colagem e acabamento que a deixam quase imperceptível.'],
      ['Vocês atendem sedes de fazenda e chácaras?', 'Sim. Confirme o endereço e o acesso pelo WhatsApp que agendamos a visita técnica.'],
      ['Como conservar a pedra usada em área externa?', 'Limpe com água e detergente neutro e evite produtos abrasivos. Uma impermeabilização periódica ajuda a proteger contra manchas e desgaste.'],
    ],
    vizinhos: ['hidrolandia', 'aparecida-de-goiania', 'trindade'],
  },
];

module.exports = { cidades };
