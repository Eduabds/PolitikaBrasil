import type { LearningModuleId, QuizQuestion, SourceReference } from '@/types/learning';

const constitution = (id: string, locator: string): SourceReference => ({
  id,
  title: 'Constituição da República Federativa do Brasil de 1988',
  publisher: 'Presidência da República — Casa Civil',
  url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
  locator,
  verifiedAt: '2026-11-17',
});

const election: SourceReference = {
  id: 'quiz-tse-23611',
  title: 'Código Eleitoral — edição compilada de 2026',
  publisher: 'Tribunal Superior Eleitoral',
  url: 'https://www.tse.jus.br/institucional/catalogo-de-publicacoes/arquivos/codigo-eleitoral-2026/%40%40display-file/file/Codigo_Eleitoral_2026_SEPRev30_OK__1_.pdf',
  locator: 'Arts. 106 a 112',
  verifiedAt: '2026-11-17',
};

const chamber: SourceReference = {
  id: 'quiz-chamber-process',
  title: 'Entenda o processo legislativo',
  publisher: 'Câmara dos Deputados',
  url: 'https://www.camara.leg.br/entenda-o-processo-legislativo/',
  verifiedAt: '2026-11-17',
};

const question = (
  id: string,
  moduleId: LearningModuleId,
  scenario: string,
  prompt: string,
  options: string[],
  correct: number,
  explanation: string,
  references: SourceReference[],
): QuizQuestion => ({
  id,
  moduleId,
  scenario,
  prompt,
  options: options.map((text, index) => ({ id: `${id}-option-${index + 1}`, text })),
  correctOptionId: `${id}-option-${correct + 1}`,
  explanation,
  references,
});

export const quizQuestions: QuizQuestion[] = [
  question('powers-01', 'three-powers', 'Uma lei aprovada pelo Congresso é enviada ao Presidente da República, que entende que um trecho contraria a Constituição.', 'Qual instrumento constitucional pode ser usado pelo Presidente?', ['Vetar o projeto, total ou parcialmente, com fundamento constitucional.', 'Anular diretamente a votação do Congresso.', 'Dissolver o Congresso Nacional.'], 0, 'A Constituição permite veto total ou parcial por inconstitucionalidade ou contrariedade ao interesse público. O veto ainda é apreciado pelo Congresso.', [constitution('q-powers-art66', 'Art. 66, §§ 1º e 4º')]),
  question('powers-02', 'three-powers', 'Uma comissão parlamentar solicita informações e fiscaliza atos do Poder Executivo federal.', 'Essa atividade é compatível com qual papel do Legislativo?', ['Fiscalizar e controlar atos do Poder Executivo.', 'Substituir o Judiciário em qualquer processo.', 'Administrar diretamente todos os ministérios.'], 0, 'O controle e a fiscalização dos atos do Executivo são atribuições do Congresso previstas na Constituição, sem que isso transforme o Legislativo em administrador.', [constitution('q-powers-art49', 'Art. 49, X')]),
  question('powers-03', 'three-powers', 'Uma pessoa questiona judicialmente a constitucionalidade de uma lei em um processo.', 'Qual Poder exerce a função jurisdicional nesse caso?', ['O Judiciário, observadas as regras de competência e de acesso à Justiça.', 'O Legislativo, ao recontar os votos da lei.', 'O Executivo, por meio de decreto individual.'], 0, 'A solução de conflitos e o controle de constitucionalidade são exercidos por órgãos do Judiciário, nos limites constitucionais e processuais.', [constitution('q-powers-art92', 'Arts. 92 e 102')]),

  question('election-01', 'electoral-system', 'Em uma eleição para vereador, um partido recebeu muitos votos no conjunto, mas sua candidatura mais votada teve menos votos que a pessoa mais votada de outro partido.', 'Qual afirmação descreve corretamente o sistema proporcional?', ['A distribuição de vagas considera votos da legenda e votação nominal segundo regras legais.', 'A pessoa mais votada do município sempre fica com a primeira vaga.', 'Apenas votos em candidaturas contam para a distribuição.'], 0, 'Nas eleições proporcionais, a distribuição de cadeiras considera a votação partidária e os requisitos legais; candidaturas ocupam vagas conforme sua votação nominal.', [election]),
  question('election-02', 'electoral-system', 'Uma eleição para governador termina sem que ninguém tenha obtido mais da metade dos votos válidos no primeiro turno.', 'O que pode ocorrer conforme a regra constitucional?', ['Segundo turno entre os dois candidatos mais votados.', 'Distribuição de cadeiras por quociente partidário.', 'Escolha do governador pelo Senado.'], 0, 'Para governador, a Constituição prevê maioria absoluta no primeiro turno e, se ninguém a alcançar, segundo turno entre os dois mais votados.', [constitution('q-election-art77', 'Art. 77, §§ 2º e 3º')]),
  question('election-03', 'electoral-system', 'Uma pessoa quer entender quantos votos são usados no cálculo das vagas proporcionais.', 'Qual alternativa está correta?', ['Votos válidos em candidaturas e legendas partidárias; brancos e nulos ficam fora.', 'Todos os votos, incluindo brancos e nulos.', 'Somente votos dados a candidaturas individuais.'], 0, 'A norma eleitoral considera válidos os votos dados a candidaturas regularmente inscritas e às legendas partidárias; votos brancos e nulos não integram o cálculo.', [election]),

  question('offices-01', 'elected-offices', 'Um cidadão quer saber quem dirige a administração federal e participa do processo legislativo por meio de sanções e vetos.', 'Qual cargo exerce essa função?', ['Presidente da República.', 'Senador da República.', 'Deputado Estadual.'], 0, 'O Presidente dirige o Executivo federal e possui atribuições constitucionais ligadas à administração, ao orçamento e ao processo legislativo, como sanção e veto.', [constitution('q-offices-president', 'Arts. 76 e 84')]),
  question('offices-02', 'elected-offices', 'Uma unidade da federação precisa organizar os serviços estaduais de segurança pública, saúde e infraestrutura regional.', 'Qual representante dirige o Executivo desse âmbito?', ['Governador do Estado ou Governador do Distrito Federal, conforme o caso.', 'Senador da unidade da federação.', 'Deputado Federal.'], 0, 'O Governador dirige o Executivo estadual e o Governador do Distrito Federal dirige o Executivo distrital, com apoio das respectivas estruturas administrativas.', [constitution('q-offices-governor', 'Arts. 25 a 28 e 32')]),
  question('offices-03', 'elected-offices', 'O Congresso precisa representar tanto o povo quanto as unidades da federação.', 'Qual cargo integra o Senado Federal como representação igualitária dos estados?', ['Senador.', 'Deputado Federal.', 'Deputado Estadual.'], 0, 'Cada estado e o Distrito Federal elegem três Senadores, independentemente do tamanho da população, garantindo representação igualitária no Senado.', [constitution('q-offices-senator', 'Arts. 46 e 52')]),

  question('process-01', 'legislative-process', 'Uma proposta é aprovada na Casa legislativa em que começou e segue para a outra Casa do Congresso.', 'Se a Casa revisora modificar o projeto de lei, o que ocorre em regra?', ['As alterações retornam à Casa iniciadora para apreciação.', 'O projeto se torna automaticamente emenda constitucional.', 'O Presidente promulga a versão modificada sem sanção.'], 0, 'A Constituição prevê que, se a Casa revisora emendar o projeto, ele volta à Casa iniciadora para apreciação das mudanças.', [constitution('q-process-art65', 'Art. 65')]),
  question('process-02', 'legislative-process', 'O Presidente recebe um projeto de lei aprovado pelo Legislativo e discorda de parte do texto por considerá-la inconstitucional.', 'O que a Constituição permite?', ['Veto parcial, que será apreciado pelo Congresso.', 'Alterar o texto por decreto e publicar a nova versão.', 'Encerrar o processo sem comunicar as Casas.'], 0, 'O veto pode ser total ou parcial e precisa ser fundamentado. O Congresso Nacional aprecia o veto em sessão conjunta.', [constitution('q-process-art66', 'Art. 66, §§ 1º e 4º'), chamber]),
  question('process-03', 'legislative-process', 'Uma organização cidadã reúne assinaturas para apresentar projeto de lei federal de iniciativa popular.', 'Qual requisito constitucional está previsto?', ['Ao menos 1% do eleitorado nacional, em pelo menos cinco Estados, com 0,3% em cada um.', 'A maioria absoluta dos eleitores em todos os Estados.', 'A aprovação prévia do Presidente da República.'], 0, 'A Constituição define esses percentuais e a distribuição territorial para a apresentação de projeto de lei de iniciativa popular à Câmara.', [constitution('q-process-art61', 'Art. 61, § 2º')]),

  question('civic-01', 'civic-participation', 'O Congresso convoca consulta ao eleitorado antes de deliberar sobre determinada matéria.', 'Como se chama essa consulta prévia?', ['Plebiscito.', 'Referendo.', 'Ação popular.'], 0, 'O plebiscito é uma consulta anterior à edição do ato. No referendo, a consulta ocorre depois da edição para ratificar ou rejeitar o ato.', [constitution('q-civic-art14', 'Art. 14, I e II'), constitution('q-civic-art49', 'Art. 49, XV')]),
  question('civic-02', 'civic-participation', 'Uma cidadã quer pedir a anulação judicial de ato lesivo ao meio ambiente e ao patrimônio público.', 'Qual instrumento constitucional pode ser pertinente?', ['Ação popular, observados os requisitos legais.', 'Referendo convocado individualmente.', 'Veto presidencial.'], 0, 'A Constituição legitima qualquer cidadão a propor ação popular para anular ato lesivo, entre outros bens, ao patrimônio público e ao meio ambiente.', [constitution('q-civic-art5', 'Art. 5º, LXXIII')]),
  question('civic-03', 'civic-participation', 'Moradores desejam apresentar projeto de interesse específico do município por iniciativa popular.', 'Qual apoio mínimo a Constituição prevê?', ['Manifestação de pelo menos 5% do eleitorado municipal.', '1% do eleitorado nacional em cinco Estados.', 'Assinatura de todos os vereadores.'], 0, 'Para projeto de interesse específico do município, da cidade ou de bairros, a Constituição prevê manifestação de pelo menos 5% do eleitorado municipal.', [constitution('q-civic-art29', 'Art. 29, XIII')]),
];

export const questionsForModule = (moduleId: string) =>
  quizQuestions.filter((item) => item.moduleId === moduleId);

