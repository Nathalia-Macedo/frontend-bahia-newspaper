# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#### DOCUMENTACAO FRONT-END ##

```Descricao de componentes das respectivas PAGINAS:`` *PostPage* *HomePage* e *ErrorPage* 
**Desenvolvedora**: Iara Reis


`` Dependencias utilizadas:``
**Linguagem principal** = JavaScript e biblioteca ReactJS.
- *axios* : Uma biblioteca para fazer requisições HTTP.
- *react* : Biblioteca para construir interfaces de usuário.
- *react-dom*: Renderizador React para o navegador.
- *react-icons*: Conjunto de ícones para React.
- *react-paginate*: Componente de paginação para React.
- *react-router-dom*: Navegação para aplicativos React baseados em navegador.
- *sass*: Pré-processador CSS que traz funcionalidades adicionais como variáveis, mixins e importações aninhadas.
- *swiper*: Uma biblioteca de slider/touch/swiper para React.

## Pasta "style"
*Button*: Este arquivo contém estilos para botões, incluindo diferentes variações de tamanho, cores e estilos de hover.
*Grid*: O arquivo de grid define classes para criar layouts responsivos usando um sistema de grid. Ele fornece classes para definir colunas, linhas, margens e preenchimentos.
*Index*: O arquivo index.scss é usado para importar todos os outros arquivos Sass da pasta global. 
Ele centraliza a importação dos estilos globais para facilitar o uso em todo o projeto.
*Reset*: O arquivo de reset contém estilos para redefinir as configurações padrão dos elementos HTML para garantir uma consistência entre diferentes navegadores.
*Typography*: Este arquivo define estilos para tipografia, incluindo fontes, tamanhos de texto, espaçamento entre linhas e cores de texto. Ele define estilos para cabeçalhos, parágrafos e outras tags de texto comuns.
*Global*: Este arquivo reúne estilos globais que são aplicados em todo o site, como variáveis de cores, estilos de link, estilos de hover e outras configurações globais de design.

## Pasta "routes"

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


## Pasta "Providers"

O PostProvider é responsável por gerenciar o estado relacionado às postagens da aplicação. 
Ele oferece os seguintes recursos e funcionalidades:

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

`` Requizicoes ``

*getCategories():* Faz uma requisição para obter todas as categorias disponíveis na aplicação.
*getPosts():* Faz uma requisição para obter as postagens mais recentes da API.



### Componente "PostPage"

O componente `PostPage` é responsável por exibir uma única postagem com base em seu ID. 
Ele recupera os dados da postagem do servidor e os renderiza na página.

`` Features/ Recursos:``
- Exibe um spinner de carregamento enquanto busca os dados da postagem.
- Recupera os dados da postagem do servidor com base no ID fornecido.
- Renderiza o conteúdo da postagem assim que estiver carregado.
- Fornece tratamento de erro caso os dados da postagem não possam ser recuperados.



### Componente "HomePage"

O componente `HomePage` é a página inicial do aplicativo. 
Ele exibe o banner principal, que geralmente contém as postagens mais recentes ou em destaque.

`` Recursos:``

- Renderiza o banner principal da página inicial.
- Contem outras seções, como categorias em destaque.



### Componente "ErrorPage"

O componente `ErrorPage` é usado para exibir uma página de erro 404 quando uma página não é encontrada.

`` Recursos:``
- Exibe uma mensagem de erro personalizada.
- Mostra uma imagem engraçada relacionada ao erro.
- Inclui um link para retornar à página inicial.



### Componente "DefaultTemplate"

O componente `DefaultTemplate` define o layout padrão para as páginas do aplicativo.
 Ele consiste em um cabeçalho, um conteúdo principal e um rodapé.

*Props:*
- `children`: Conteúdo da página que será exibido no corpo principal.


### Componente "Footer"

O componente `Footer` representa o rodapé do aplicativo. 
Ele inclui links para redes sociais, o logotipo do jornal e a barra de navegação.


### Componente "Header"

O componente `Header` representa o cabeçalho do aplicativo.
 Ele inclui o logotipo do jornal, um campo de pesquisa e a barra de navegação.

``Componentes Relacionados:`
- *NavBarSection*: Componente de barra de navegação.

``Estado e Funções:``
- *postList*: Lista de posts obtidos do contexto PostContext.
- *setFilteredPost*: Função para definir os posts filtrados no contexto PostContext.
- *submit*: Função para lidar com a submissão do formulário de pesquisa.

### Componente "NavBarSection"

O componente `NavBarSection` representa a seção de navegação que exibe as categorias disponíveis para navegação.

``Componentes Relacionados:`
- *NavBarCard*: Componente de cartão de navegação para cada categoria.

``Estado e Funções:``
- *categoryList:* Lista de categorias obtidas do contexto PostContext.
- *menuOpen*: Estado que controla se o menu de navegação está aberto ou fechado.
- *size*: Estado que armazena as dimensões da janela do navegador.
- *useEffect*: Hook para lidar com o redimensionamento da janela do navegador e controlar a abertura/fechamento do menu de navegação.

### Componente NavBarCard

O componente `NavBarCard` representa um cartão de navegação para uma categoria específica.

``Estado e Funções:``:

- *category*: Categoria a ser exibida no cartão.
- *setFilteredPost*: Função para atualizar a lista de postagens filtradas com base na categoria selecionada.
- *postList*: Lista de postagens obtida do contexto PostContext.
- *navigate*: Função de navegação do React Router para redirecionar para a página da categoria selecionada.
- *setUpdateCategory*: Estado que armazena a categoria atualizada.

``Funcionalidade``:
- Quando o botão é clicado, o componente atualiza a lista de postagens filtradas com base na categoria selecionada e redireciona para a primeira postagem dessa categoria.


### section / "AsideAds"

A pasta `AsideAds` contém um componente que exibe anúncios na barra lateral da página. 
Este componente é responsivo e se torna visível apenas em telas maiores que 980px.

``Funcionalidade``:
- O componente exibe anúncios na barra lateral da página.
- É responsivo e só é visível em telas maiores que 980px.

``Estado e Funções:``:
- *isVisible*: Estado que controla a visibilidade do componente com base no tamanho da tela.
- *setIsVisible*: Função para atualizar o estado de visibilidade do componente.
- *handleResize*: Função que verifica o tamanho da tela e define a visibilidade do componente.


### section "AsideLeft"

A pasta `AsideLeft` contém um componente que exibe uma lista de posts rápidos na barra lateral esquerda da página.

``Funcionalidade``:
- Exibe uma lista de posts rápidos.
- Cada item da lista inclui uma imagem, categorias e título do post.
- Ao clicar em um post, redireciona para a página do post completo.

``Estado e Funções:`
- *sortedPosts*: Lista de posts ordenada por data de criação.
- *handleClick*: Função para lidar com o clique em um post e redirecionar para a página do post completo.

### Section "AsideRight"

A pasta `AsideRight` contém um componente que exibe uma lista dos posts mais visualizados na barra lateral direita da página.

`` Funcionalidades:``
- Exibe uma lista dos dois posts mais visualizados.
- Cada item da lista inclui uma imagem, categorias e título do post mais visualizado.
- Ao clicar em um post, redireciona para a página do post completo.

``Estado e Funções:``
- *mostViewedPosts*: Lista dos posts mais visualizados.
- *setMostViewedPosts*: Função para atualizar a lista dos posts mais visualizados.
- *handleClick*: Função para lidar com o clique em um post e redirecionar para a página do post completo.


### Section "BannerSection"

A pasta `BannerSection` contém um componente que exibe uma seção de banner rotativo com as últimas notícias.

`` Funcionalidades:``
- Exibe um carrossel de banners com as últimas notícias.
- Cada banner contém uma imagem, categoria e título da notícia.
- Ao clicar em um banner, redireciona para a página da notícia completa.

`` Estado e Funções:``
- *slidePerView*: Estado para controlar a quantidade de banners exibidos por vez.
- *setFilteredPost*: Função para definir a lista filtrada de postagens ao clicar em um banner.
- *postList*: Lista de todas as postagens disponíveis.
- *sortedPosts*: Lista de postagens ordenadas pelas mais recentes.
- *handleCategoryClick*: Função para lidar com o clique em um banner e redirecionar para a página da notícia completa.


### Section "PostSection"

A pasta `PostSection` contém um componente que exibe uma seção de postagens.

`` Funcionalidades:``
- Exibe uma lista de postagens, que pode ser filtrada com base em uma lista de postagens filtradas.
- Cada postagem é exibida por meio de um componente `PostCard`.
- Inclui um banner de anúncios à esquerda e um banner de anúncios fixo à direita.

`` Estado e Funções:``
*postList*: Lista de todas as postagens disponíveis.
*filteredPost*: Lista de postagens filtradas, se houver alguma.
*postsToRender*: Lista de postagens a serem renderizadas, que é filteredPost se estiver definida e não vazia, caso contrário, é postList.

``Componentes Utilizados:``
*AsideAds*: Componente que exibe banners de anúncios à esquerda.
*PostCard*: Componente para renderizar cada postagem individualmente.
*AsideLeft*: Componente que exibe postagens rápidas à esquerda.


### Pasta "PostCard"

A pasta `PostCard` contém um componente que renderiza uma única postagem.

`` Funcionalidades:``
- Exibe as informações de uma postagem, incluindo categoria, título, data de criação, imagens e conteúdo.
- Formata a data da postagem para o formato "dia da semana, dia/mês/ano - hora:minuto".

`` Estado e Props:``
*post*: Postagem a ser renderizada pelo componente.

``Funcionalidades Adicionais:``
Verifica se a postagem está definida e, se não estiver, retorna null.
Formata a data da postagem utilizando a biblioteca date-fns.

### Pasta "services"

A pasta `services` contém arquivos que definem serviços para comunicação com APIs externas.

`` Arquivo "Api.js"``
O arquivo `Api.js` exporta uma instância do Axios configurada para fazer requisições para uma API específica.

``Funcionalidades:``
- Configura uma instância do Axios com a base URL e timeout definidos.
- Pode ser utilizado para fazer requisições HTTP para a API configurada.

**Notas**:
Este serviço utiliza o Axios, uma biblioteca para fazer requisições HTTP.
A base URL e o timeout podem ser ajustados de acordo com as necessidades da aplicação.