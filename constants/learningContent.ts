import type { LearningModule, LearningModuleId, SourceReference } from '@/types/learning';

const constitution: SourceReference = {
  id: 'constitution-1988',
  title: 'Constituição da República Federativa do Brasil de 1988',
  publisher: 'Presidência da República — Casa Civil',
  url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
  verifiedAt: '2026-11-17',
};

const source = (id: string, locator: string, title = constitution.title): SourceReference => ({
  ...constitution,
  id,
  locator,
  title,
});

const electoralSource: SourceReference = {
  id: 'tse-resolution-23611',
  title: 'Código Eleitoral — edição compilada de 2026',
  publisher: 'Tribunal Superior Eleitoral',
  url: 'https://www.tse.jus.br/institucional/catalogo-de-publicacoes/arquivos/codigo-eleitoral-2026/%40%40display-file/file/Codigo_Eleitoral_2026_SEPRev30_OK__1_.pdf',
  locator: 'Arts. 106 a 112',
  verifiedAt: '2026-11-17',
};

const chamberSource: SourceReference = {
  id: 'chamber-legislative-process',
  title: 'Entenda o processo legislativo',
  publisher: 'Câmara dos Deputados',
  url: 'https://www.camara.leg.br/entenda-o-processo-legislativo/',
  verifiedAt: '2026-11-17',
};

export const learningModules: LearningModule[] = [
  {
    id: 'three-powers',
    title: 'Os Três Poderes da República',
    description: 'Entenda as funções do Executivo, Legislativo e Judiciário e como se equilibram.',
    lessons: [
      {
        id: 'three-powers-separation',
        title: 'Por que existem três Poderes?',
        summary: 'A separação distribui funções e cria controles entre instituições.',
        estimatedMinutes: 4,
        sections: [
          { id: 'separation-purpose', heading: 'Funções diferentes, responsabilidade compartilhada', body: 'A Constituição organiza os Poderes da União em Legislativo, Executivo e Judiciário. Eles são independentes e harmônicos: cada um tem atribuições próprias e a atuação de um pode ser controlada por mecanismos previstos na Constituição.', highlight: { title: 'Em resumo', body: 'Separação de Poderes não significa isolamento: significa funções próprias com controles recíprocos.' }, references: [source('c-art2', 'Art. 2º')] },
          { id: 'separation-federation', heading: 'A União não é o país inteiro', body: 'O artigo 2º trata dos Poderes da União. Estados, Distrito Federal e municípios também têm instituições próprias dentro das competências que a Constituição distribui entre os entes federativos.', references: [source('c-art18', 'Arts. 18 e 25 a 30')] },
        ],
      },
      {
        id: 'three-powers-executive-legislative',
        title: 'Executivo e Legislativo',
        summary: 'Quem administra, quem representa e quem faz as leis.',
        estimatedMinutes: 5,
        sections: [
          { id: 'executive-role', heading: 'Poder Executivo', body: 'No âmbito federal, o Presidente da República exerce a chefia do Executivo com os ministros de Estado. Entre suas atribuições estão dirigir a administração federal e participar do processo legislativo nos casos previstos, como sancionar ou vetar projetos de lei.', references: [source('c-art76', 'Arts. 76 e 84')] },
          { id: 'legislative-role', heading: 'Poder Legislativo', body: 'O Congresso Nacional é formado pela Câmara dos Deputados e pelo Senado Federal. A Câmara representa o povo; o Senado representa os Estados e o Distrito Federal. O Congresso legisla e também exerce fiscalização e controle.', highlight: { title: 'Atenção', body: 'As atribuições legislativas e fiscalizadoras também existem nos níveis estadual, distrital e municipal, respeitadas as competências de cada ente.' }, references: [source('c-art44', 'Arts. 44 a 50')] },
        ],
      },
      {
        id: 'three-powers-judiciary',
        title: 'Poder Judiciário e controles',
        summary: 'Como a Justiça se organiza e como os Poderes se limitam.',
        estimatedMinutes: 5,
        sections: [
          { id: 'judiciary-role', heading: 'Poder Judiciário', body: 'O Judiciário é composto pelos órgãos indicados na Constituição. Sua função jurisdicional inclui resolver conflitos e aplicar o direito; o Supremo Tribunal Federal tem, entre suas competências, a guarda da Constituição.', references: [source('c-art92', 'Arts. 92 e 102')] },
          { id: 'checks-balances', heading: 'Freios e contrapesos', body: 'A Constituição prevê mecanismos de controle: o Congresso fiscaliza o Executivo, o Presidente pode vetar projetos de lei e o Judiciário pode examinar a constitucionalidade de atos quando provocado nos termos legais. Cada mecanismo tem limites e procedimentos próprios.', references: [source('c-art49', 'Art. 49, X'), source('c-art66', 'Art. 66'), source('c-art102', 'Art. 102')] },
        ],
      },
    ],
  },
  {
    id: 'electoral-system',
    title: 'O Sistema Eleitoral Brasileiro',
    description: 'Compare voto majoritário e proporcional e veja como os votos viram mandatos.',
    lessons: [
      {
        id: 'electoral-majority', title: 'Sistema majoritário', summary: 'Como são escolhidos presidente, governadores, senadores e prefeitos.', estimatedMinutes: 4,
        sections: [
          { id: 'majority-offices', heading: 'Quem é eleito pelo sistema majoritário?', body: 'Presidente, governadores e prefeitos são eleitos pelo sistema majoritário. Senadores também. A regra de maioria absoluta com segundo turno, quando aplicável, vale para Presidente e para Governador e Prefeito de municípios com mais de 200 mil eleitores; para os demais casos, vence quem obtiver mais votos válidos.', references: [source('c-art77', 'Arts. 28, 29, II, 32, § 2º, 46 e 77'), electoralSource] },
          { id: 'majority-turnout', heading: 'O que significa maioria?', body: 'Para Presidente, Governador e Prefeito nos municípios que se enquadram na regra constitucional, é eleito no primeiro turno quem alcança mais da metade dos votos válidos, excluídos brancos e nulos. Se ninguém alcançar essa marca, há segundo turno entre os dois mais votados.', references: [source('c-art77', 'Art. 77, §§ 2º e 3º')] },
        ],
      },
      {
        id: 'electoral-proportional', title: 'Sistema proporcional', summary: 'Como votos em partidos e candidaturas distribuem cadeiras.', estimatedMinutes: 5,
        sections: [
          { id: 'proportional-offices', heading: 'Deputados e vereadores', body: 'As eleições para deputados federais, estaduais e distritais e para vereadores seguem o sistema proporcional. A distribuição de vagas considera os votos válidos recebidos por partidos e federações; as cadeiras conquistadas são ocupadas por candidaturas conforme a votação nominal e os requisitos legais.', references: [source('c-art45', 'Arts. 32, § 3º, 45 e 27, § 1º'), electoralSource] },
          { id: 'quotients', heading: 'Quocientes e sobras', body: 'Didaticamente, o quociente eleitoral relaciona votos válidos e número de vagas; o quociente partidário indica vagas iniciais conforme a votação da legenda. As vagas restantes são distribuídas por médias, observados os requisitos legais de votação nominal mínima e as regras vigentes.', highlight: { title: 'Simplificação', body: 'O cálculo completo tem etapas e regras adicionais. O exemplo aqui não substitui a apuração oficial do TSE.' }, references: [electoralSource] },
        ],
      },
      {
        id: 'electoral-vote', title: 'Do voto à cadeira', summary: 'Entenda voto nominal, voto de legenda e representação.', estimatedMinutes: 4,
        sections: [
          { id: 'valid-votes', heading: 'Votos válidos', body: 'No sistema proporcional, votos dados a candidatas e candidatos regularmente inscritos e à legenda partidária contam como válidos para a distribuição. Votos brancos e nulos não entram nesse cálculo.', references: [electoralSource] },
          { id: 'party-candidates', heading: 'Partido e candidatura', body: 'A votação da legenda influencia quantas vagas o partido pode obter; a votação nominal e as exigências legais definem quais candidaturas ocupam essas vagas. Por isso, no sistema proporcional, o resultado individual se relaciona com o desempenho coletivo da legenda.', references: [electoralSource] },
        ],
      },
    ],
  },
  {
    id: 'legislative-process',
    title: 'O Processo Legislativo',
    description: 'Acompanhe como propostas são debatidas, votadas e podem virar lei.',
    lessons: [
      {
        id: 'legislative-initiative', title: 'Quem pode apresentar propostas?', summary: 'Iniciativa legislativa e limites definidos na Constituição.', estimatedMinutes: 4,
        sections: [
          { id: 'initiative-law', heading: 'Iniciativa de leis', body: 'A Constituição permite que diferentes autoridades, órgãos e cidadãos apresentem projetos de lei, conforme o tema e as regras aplicáveis. Algumas matérias têm iniciativa reservada, por isso não basta qualquer autor para qualquer assunto.', references: [source('c-art61', 'Art. 61, caput e § 1º')] },
          { id: 'popular-initiative', heading: 'Iniciativa popular', body: 'Projetos de lei de iniciativa popular federal precisam ser subscritos por pelo menos 1% do eleitorado nacional, distribuído por no mínimo cinco Estados, com ao menos 0,3% dos eleitores de cada um deles. O projeto é apresentado à Câmara dos Deputados.', references: [source('c-art14', 'Art. 14, III'), source('c-art61', 'Art. 61, § 2º')] },
        ],
      },
      {
        id: 'legislative-review', title: 'Comissões e votação', summary: 'Análise técnica, debate e deliberação nas Casas legislativas.', estimatedMinutes: 5,
        sections: [
          { id: 'committees', heading: 'Análise em comissões', body: 'Comissões podem examinar propostas, discutir mérito e emitir pareceres. Em certos casos, a Constituição e os regimentos permitem decisão conclusiva nas comissões; outros projetos seguem para votação em Plenário.', references: [source('c-art58', 'Art. 58, § 2º, I'), chamberSource] },
          { id: 'bicameral-vote', heading: 'Duas Casas', body: 'No plano federal, o Congresso é bicameral. Em regra, um projeto de lei aprovado por uma Casa é revisto pela outra. Se a Casa revisora fizer alterações, há retorno à Casa iniciadora para apreciação das mudanças.', references: [source('c-art65', 'Arts. 44 e 65'), chamberSource] },
        ],
      },
      {
        id: 'legislative-sanction-veto', title: 'Sanção, veto e publicação', summary: 'O que acontece depois da aprovação legislativa.', estimatedMinutes: 4,
        sections: [
          { id: 'sanction-veto', heading: 'Sanção ou veto', body: 'Concluída a votação de projeto de lei, ele pode seguir para sanção ou veto do Presidente da República, conforme o caso. O veto pode ser total ou parcial e deve ser fundamentado em inconstitucionalidade ou contrariedade ao interesse público; o Congresso pode apreciá-lo.', references: [source('c-art66', 'Art. 66'), chamberSource] },
          { id: 'publication-law', heading: 'Promulgação e publicação', body: 'A sanção não é a única forma de uma norma seguir adiante. A Constituição também prevê promulgação em hipóteses de sanção tácita ou de rejeição do veto. A publicação oficial permite conhecer o texto que passou a integrar o ordenamento.', references: [source('c-art66', 'Art. 66, §§ 3º a 7º')] },
        ],
      },
    ],
  },
  {
    id: 'civic-participation',
    title: 'Cidadania e Participação Popular',
    description: 'Conheça formas constitucionais de participação direta e controle cidadão.',
    lessons: [
      {
        id: 'participation-direct-vote', title: 'Plebiscito e referendo', summary: 'Duas consultas populares com momentos diferentes.', estimatedMinutes: 4,
        sections: [
          { id: 'plebiscite', heading: 'Plebiscito', body: 'No plebiscito, eleitoras e eleitores são consultados antes de um ato legislativo ou administrativo relevante. A consulta é convocada pelo Congresso Nacional, nos termos constitucionais e legais.', references: [source('c-art14', 'Art. 14, I'), source('c-art49', 'Art. 49, XV')] },
          { id: 'referendum', heading: 'Referendo', body: 'No referendo, a consulta ocorre depois da edição de um ato legislativo ou administrativo, para que o eleitorado o ratifique ou rejeite. Assim, a diferença mais simples é o momento da consulta: antes no plebiscito, depois no referendo.', references: [source('c-art14', 'Art. 14, II'), source('c-art49', 'Art. 49, XV')] },
        ],
      },
      {
        id: 'participation-popular-bill', title: 'Iniciativa popular de lei', summary: 'Como cidadãs e cidadãos podem propor projetos de lei.', estimatedMinutes: 4,
        sections: [
          { id: 'federal-popular-bill', heading: 'No âmbito federal', body: 'A iniciativa popular é uma forma de exercer diretamente a soberania popular. Para projeto de lei federal, exige apoio mínimo de 1% do eleitorado nacional, distribuído por pelo menos cinco Estados, com ao menos 0,3% dos eleitores em cada um.', references: [source('c-art14-pop', 'Art. 14, III'), source('c-art61-pop', 'Art. 61, § 2º')] },
          { id: 'local-popular-bill', heading: 'Nos municípios', body: 'A Constituição também prevê iniciativa popular de projetos de interesse específico do município, da cidade ou de bairros, mediante manifestação de pelo menos 5% do eleitorado municipal. Regras complementares podem estar na Lei Orgânica.', references: [source('c-art29', 'Art. 29, XIII')] },
        ],
      },
      {
        id: 'participation-popular-action', title: 'Ação popular e fiscalização', summary: 'Instrumentos para defender o patrimônio público e acompanhar instituições.', estimatedMinutes: 5,
        sections: [
          { id: 'popular-action', heading: 'Ação popular', body: 'Qualquer cidadão pode propor ação popular para buscar a anulação de ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural, observados os requisitos processuais.', references: [source('c-art5-lxxiii', 'Art. 5º, LXXIII')] },
          { id: 'participation-accountability', heading: 'Participar também é acompanhar', body: 'A cidadania inclui votar, participar de consultas previstas em lei e acompanhar a atuação dos órgãos públicos. A Constituição assegura o direito de petição e o acesso a informações públicas, sujeitos às regras legais.', references: [source('c-art5-xxxiv', 'Art. 5º, XXXIII e XXXIV'), source('c-art37', 'Art. 37, § 3º')] },
        ],
      },
    ],
  },
];

export const getModule = (moduleId: string | undefined): LearningModule | undefined =>
  learningModules.find((module) => module.id === moduleId);

export const getLesson = (lessonId: string | undefined) => {
  for (const module of learningModules) {
    const lesson = module.lessons.find((item) => item.id === lessonId);
    if (lesson) return { module, lesson };
  }
  return undefined;
};

export const moduleIds = learningModules.map((module) => module.id) satisfies LearningModuleId[];

