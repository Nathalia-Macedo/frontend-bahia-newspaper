# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Descricao de componentes daS PAGINAS PostPage HomePage e Error Page ##
**Desenvolvedora**: Iara Reis

## Componente style ##
*Button*: Este arquivo contém estilos para botões, incluindo diferentes variações de tamanho, cores e estilos de hover.
*Grid*: O arquivo de grid define classes para criar layouts responsivos usando um sistema de grid. Ele fornece classes para definir colunas, linhas, margens e preenchimentos.
*Index*: O arquivo index.scss é usado para importar todos os outros arquivos Sass da pasta global. 
Ele centraliza a importação dos estilos globais para facilitar o uso em todo o projeto.
*Reset*: O arquivo de reset contém estilos para redefinir as configurações padrão dos elementos HTML para garantir uma consistência entre diferentes navegadores.
*Typography*: Este arquivo define estilos para tipografia, incluindo fontes, tamanhos de texto, espaçamento entre linhas e cores de texto. Ele define estilos para cabeçalhos, parágrafos e outras tags de texto comuns.
*Global*: Este arquivo reúne estilos globais que são aplicados em todo o site, como variáveis de cores, estilos de link, estilos de hover e outras configurações globais de design.

## Componente routes ##

A função RouteMain define as rotas principais da aplicação usando o componente Routes e Route do React Router. 
Aqui está uma breve descrição:

*HomePage*: Rota correspondente à página inicial do site. 
É renderizada quando o caminho da URL é '/'.
*PostPage*: Rota correspondente à página de exibição de um post específico. 
É renderizada quando o caminho da URL é '/post/:id', onde ':id' é o identificador único do post.
*ErrorPage*: Rota de fallback para URLs não correspondentes a nenhuma rota definida. 
É renderizada quando o caminho da URL não corresponde a nenhum dos caminhos definidos nas outras rotas.
*LoginPage*: Rota correspondente à página de login. É renderizada quando o caminho da URL é '/login'.
*RecuperarSenha*: Rota correspondente à página de recuperação de senha. É renderizada quando o caminho da URL é '/forget_password'.
*Admin*: Rota correspondente à área de administração do site. É renderizada quando o caminho da URL é '/admin'.

## Componente Providers ##

O PostProvider é responsável por gerenciar o estado relacionado às postagens da aplicação. Ele oferece os seguintes recursos e funcionalidades:

`` Beneficios de usabilidade ``
Oferece acesso centralizado aos dados das postagens em toda a aplicação.
Gerencia o estado de carregamento para uma experiência de usuário mais fluida.
Facilita o compartilhamento de dados entre os componentes relacionados às postagens.
Atualiza dinamicamente as postagens e categorias conforme necessário, mantendo a aplicação atualizada com os dados mais recentes.


*postList*: Mantém uma lista das postagens mais recentes da aplicação.
*loading*: Indica se a aplicação está atualmente carregando dados das postagens.
*filteredPost*: Armazena a postagem atualmente filtrada, se houver.
*categoryList*: Contém a lista de categorias disponíveis para as postagens.
*mostViewedPosts*: Mantém uma lista das postagens mais visualizadas.
*setValue*: Define o valor do estado do provedor.

## Requisições ##

*getCategories():* Faz uma requisição para obter todas as categorias disponíveis na aplicação.
*getPosts():* Faz uma requisição para obter as postagens mais recentes da API.##:
