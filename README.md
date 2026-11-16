# PolitikaBrasil

Aplicativo multiplataforma em desenvolvimento, criado com Expo e React Native. Este repositório contém a base inicial do app, com navegação por abas, suporte a temas claro e escuro e execução em Android, iOS e web.

> **Status:** estrutura inicial. As telas e abas atuais ainda são placeholders do template Expo; funcionalidades específicas do PolitikaBrasil serão adicionadas nas próximas etapas.

## Tecnologias

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- React Native 0.88
- React 19
- Expo Router
- TypeScript

## Requisitos

- Node.js e npm
- Expo Go para executar no dispositivo físico, ou um emulador/simulador configurado

## Como começar

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Eduabds/PolitikaBrasil.git
cd PolitikaBrasil
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Use o QR code exibido no terminal para abrir o projeto no Expo Go. Também é possível iniciar diretamente uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

> Para executar no iOS, é necessário um Mac com o Xcode ou um dispositivo compatível com Expo Go.

## Estrutura do projeto

```text
app/                 Rotas e telas gerenciadas pelo Expo Router
  (tabs)/            Telas e configuração da navegação por abas
assets/              Fontes e imagens do aplicativo
components/          Componentes reutilizáveis e suporte a temas
constants/           Constantes compartilhadas, como cores
app.json             Configuração do Expo
package.json         Dependências e comandos do projeto
```

## Desenvolvimento

As telas ficam em `app/`, seguindo a convenção do Expo Router. Componentes reutilizáveis devem ficar fora dessa pasta, como em `components/`, para evitar que sejam tratados como rotas.

Antes de enviar alterações, confira os arquivos modificados e não inclua credenciais, tokens ou arquivos locais com dados sensíveis.

## Licença

Consulte o arquivo [LICENSE](./LICENSE) e confirme os termos aplicáveis antes de redistribuir o projeto.
