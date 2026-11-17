# Contrato de conteúdo pedagógico

Este contrato define como estruturar o conteúdo antes de implementar as telas. Os tipos correspondentes ficam em [`types/learning.ts`](../types/learning.ts). Esta etapa não cria conteúdo jurídico, navegação, quiz funcional ou persistência.

## Modelo de dados

- **LearningModule**: um dos quatro pilares, com ID estável, título, descrição e lista ordenada de lições.
- **LearningLesson**: uma unidade de estudo com ID estável, título, resumo e seções ordenadas.
- **LessonSection**: conteúdo em texto simples, título de seção e referências que sustentam aquela seção.
- **SourceReference**: título da fonte, órgão/publicador, URL, localizador (artigo, seção ou página, quando aplicável) e data da última verificação (`YYYY-MM-DD`).
- **QuizQuestion**: questão de escolha única ligada a um módulo, com cenário, enunciado, opções identificáveis, ID da opção correta, explicação educativa e referências.

IDs de módulos definidos:

| ID | Módulo |
|---|---|
| `three-powers` | Os Três Poderes da República |
| `electoral-system` | O Sistema Eleitoral Brasileiro |
| `legislative-process` | O Processo Legislativo |
| `civic-participation` | Cidadania e Participação Popular |

Cada ID de lição, seção, questão, opção ou referência deve ser único dentro do seu conjunto e permanecer estável após publicação. O `correctOptionId` deve corresponder a exatamente uma opção da questão; as questões devem ter pelo menos duas opções. Essas relações entre valores exigem validação dos dados quando o conteúdo for criado; os tipos TypeScript sozinhos não as garantem.

## Regras editoriais e de fontes

- Usar linguagem clara, neutra, apartidária e adequada a pessoas sem formação jurídica.
- Distinguir o que está previsto em lei de interpretação, prática institucional ou simplificação pedagógica.
- Priorizar fontes primárias oficiais: Constituição e legislação em fonte oficial, e materiais dos órgãos competentes para explicar sua própria estrutura ou procedimento.
- Registrar a disposição específica que sustenta a afirmação (artigo, seção ou página) e quando a referência foi conferida.
- Cada seção de lição e explicação de questão deve ter ao menos uma referência pertinente. Preferir citações específicas a uma lista genérica de links.
- Simplificações e exemplos devem preservar ressalvas importantes; não apresentar uma hipótese de cenário como aconselhamento jurídico.
- Revisar precisão, neutralidade, acessibilidade e atualização das fontes antes de publicar conteúdo.

## Critérios de aceite do primeiro MVP pedagógico

O primeiro corte funcional deve limitar-se ao módulo **Os Três Poderes** e a uma lição completa:

1. A lição segue os tipos acima, com seções ordenadas e texto simples.
2. Cada seção apresenta referências específicas, verificadas e com localizador quando disponível.
3. A partir da aba Aprender, a pessoa consegue abrir a lição, ler seu conteúdo e consultar as fontes, e retornar à lista.
4. A tela é legível em dispositivos móveis e nos temas claro e escuro, sem depender de conexão com backend.
5. IDs e relações do conteúdo são validados; conteúdo ausente ou ID desconhecido não é mostrado como uma lição válida.

Quiz, regras de XP, conclusão de lição, armazenamento de progresso, autenticação e sincronização ficam fora deste primeiro corte. Devem ser definidos nas etapas correspondentes antes de sua implementação.
