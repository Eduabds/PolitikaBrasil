# PolitikaBrasil

Aplicativo multiplataforma em desenvolvimento com Expo e React Native para explicar, de forma educativa e apartidária, como funcionam as instituições e a participação cidadã no Brasil.

> **Status:** MVP funcional com quatro temas, 12 lições, 12 questões de quiz e progresso salvo localmente.

## Tecnologias

- Expo SDK 58
- React Native 0.88 e React 19
- Expo Router e TypeScript
- Expo SQLite no Android e iOS; armazenamento local do navegador na web

## Como começar
Abra o terminal na sua ide e insira os seguintes comandos para clonar o repositório

```bash
git clone https://github.com/Eduabds/PolitikaBrasil.git
cd PolitikaBrasil
```
Os comandos a seguir irão preparar e iniciar a aplicação 

```bash
npm install
npm start
```
Use o QR code para abrir no Expo Go. Também é possível iniciar diretamente uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

## O que o app oferece

- **Aprender:** catálogo de Três Poderes, Sistema Eleitoral, Processo Legislativo e Cidadania e Participação Popular. Cada tema reúne três lições com tempo estimado, estado de leitura e referências oficiais.
- **Leitura:** sumário por tema, seções curtas, destaques, indicador de leitura e botão fixo para concluir. Uma lição concluída não volta a gerar XP.
- **Quiz:** três questões por tema, seleção única, navegação para frente e para trás, confirmação ao sair, resultado e gabarito com explicações e fontes.
- **Progresso:** nome local editável, nível cívico, XP total, progresso até o próximo nível e detalhamento por tema.

As regras de pontuação são **+20 XP** pela primeira conclusão de cada lição e **+10 XP por acerto que aumente a melhor pontuação** do quiz daquele tema. Repetições sem melhoria não geram XP adicional. O app não exige conta nem backend.

## Estrutura do projeto

```text
src/app/
  (tabs)/            Catálogo, seleção de quiz e progresso
  modules/           Sumário de cada tema
  lessons/           Leitura de uma lição
  quiz/              Sessão e gabarito de um tema
components/
  learning/          Cartões de módulo e fontes
  progress/          Estado global e apresentação do progresso
  quiz/              Cartões de seleção de quiz
  ui/                Componentes compartilhados
constants/           Conteúdo de lições, perguntas e cores
types/               Modelos de conteúdo e progresso
app.json             Configuração do Expo e Expo Router
```

O progresso nativo usa `expo-sqlite/kv-store`. Na web, os mesmos dados ficam no armazenamento local do navegador. Os dados são locais a cada dispositivo ou navegador e não são sincronizados entre eles.

## Desenvolvimento

As telas ficam em `src/app/`. Componentes, dados e lógica reutilizável devem ficar fora dessa pasta para não serem tratados como rotas.

```bash
npx expo lint
npx tsc --noEmit
```

Antes de enviar alterações, confira os arquivos modificados e não inclua credenciais, tokens ou arquivos locais com dados sensíveis.

## Licença

Consulte o arquivo [LICENSE](./LICENSE) e confirme os termos aplicáveis antes de redistribuir o projeto.
