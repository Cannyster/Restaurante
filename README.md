# Projeto Restaurante Web

Este é um projeto web para visualização e avaliação de restaurantes, desenvolvido utilizando React, TypeScript, JSON Server, e outras ferramentas modernas como Vite para o ambiente de desenvolvimento. O projeto faz uso de diversas bibliotecas e frameworks para proporcionar uma experiência de usuário agradável e uma base de código escalável e organizada.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Vite**: Ferramenta de build que oferece um ambiente de desenvolvimento rápido e eficiente.
- **JSON Server**: Simula uma API REST para facilitar o desenvolvimento e testar o consumo de dados.
- **React Hook Form**: Gerenciamento de formulários com validação e integração com o Zod.
- **Styled Components**: Para estilização utilizando componentes.
- **React Query**: Para gerenciamento de estado assíncrono e caching de dados de requisições.
- **Radix UI**: Biblioteca de componentes acessíveis, usados para diálogos, selects e grupos de rádio.
- **ESLint**: Ferramenta de linting para manter boas práticas de código.
- **Prettier**: Para formatação automática do código.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **React Router DOM**: Gerenciamento de rotas para navegação entre páginas.

## Funcionalidades

- **Listagem de Restaurantes**: O projeto exibe uma lista de restaurantes com a possibilidade acesso detalhado as informações de cada um.
- **Pesquisa Local**: Filtro local na lista de restaurantes para facilitar a busca por nomes.
- **Avaliações de Restaurantes**: Para cada restaurante, é possível visualizar, adicionar e editar avaliações.
- **Modais para Edição e Adição**: Usando Radix UI para modais, o projeto permite ao usuário adicionar ou editar avaliações em formulários validados com React Hook Form e Zod.


## Como Rodar o Projeto

1. **Clone o repositório**:

   git clone [https://github.com/seu-usuario/projeto-restaurante-web.git](https://github.com/Cannyster/Restaurante.git)

2. **Instale as dependências**:

   npm install

3. **Inicie o JSON Server** (simulando uma API):

   npx json-server --watch db.json --port 3000

4. **Inicie o servidor de desenvolvimento**:

   npm run dev

5. **Acesse o projeto**:
   
   Abra seu navegador e acesse `http://localhost:5173`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com o Vite.
- `npm run build`: Gera a build de produção.
- `npm run lint`: Executa o ESLint para verificar o código.
- `npm run format`: Formata o código usando Prettier.
- `npm run preview`: Inicia o servidor de pré-visualização para a build de produção.

## Principais Dependências

- `@hookform/resolvers`: Integração do Zod com o React Hook Form para validação de formulários.
- `@radix-ui/react-dialog`: Componentes acessíveis para modais.
- `@tanstack/react-query`: Gerenciamento de estado assíncrono.
- `react-router-dom`: Gerenciamento de rotas.
- `styled-components`: Estilização com componentes.
- `eslint` e `prettier`: Para manter a qualidade do código e garantir consistência no formato.
