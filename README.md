# BLOG

Esta é um Blog desenvolvido com Node.js, Express, MongoDB e React-Native.

A API permite:

-   criar, editar, deletar, procurar e listar postagens deste blog.
-   criar, editar, deletar e listar professores.
-   criar, editar, deletar e listar alunos.
-   fazer login e logout.

Os testes são escritos com Jest e a documentação da API é gerada com o Swagger.

### Índice

-   Instalação
-   Configuração
-   Endpoints da API
-   Testes
-   Documentação Swagger
-   Estrutura de pastas
-   Tecnologia utilizada

### Instalação

1. Clone o repositório `git clone https://github.com/fhamamura/blog-mobile.git`

2. Navegue até o diretório backend: `cd backend`

3. Instale as dependências `npm install`

4. Para iniciar o servidor backend `npm run serve`

O servidor backend irá rodar em `http://localhost:5000`.

5. Navegue até o diretório mobile: `cd mobile`

6. Instale as dependências `npm install`

7. Para iniciar o servidor frontend `npx expo start`

### Configuração backend

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```
PORT=5000
MONGO_URI="mongodb://localhost:27017/mongo"
JWT_SECRET="seutokensecreto"
```

-   `PORT` : Define a porta em que o servidor será executado.

-   `MONGO_URI` : String de conexão ao MongoDB.

-   `JWT_SECRET` : String para criptografar o jsonwebtoken.

### Bibliotecas do node

-   bcrypt
-   cors
-   dotenv
-   express
-   jsonwebtoken
-   mongodb
-   mongoose
-   swagger-jsdoc
-   swagger-ui-express
-   jest
-   mongodb-memory-server
-   nodemon
-   supertest

### Bibliotecas do react-native

-   React
-   React-Native
-   Expo
-   Axios
-   React-Navigation
-   React-Native-Comunity
-   React-Native-Gesture_Handler
-   React-Native-Reanimated
-   React-Native-Safe-Area-Content
-   React-Native-Screens

### Endpoints da API

#### Listar todos os Posts

-   GET `/posts`

#### Obter um Post por ID

-   GET `/posts/:id`

#### Criar um Post

-   POST `/posts`

    Body:

```
{
  "title": "Título do Post",
  "content": "Conteúdo do Post",
  "author": "Autor do Post"
}
```

#### Atualizar Post

-   PUT `/posts/:id`

Body:

```
{
  "title": "Título do Post",
  "content": "Conteúdo do Post",
  "author": "Autor do Post"
}
```

#### Deletar Post

-   DELETE `/posts/:id`

#### Listar todos os Professores

-   GET `/professores`

#### Obter um Professor por ID

-   GET `/professores/:id`

#### Criar um Professor

-   POST `/professores`

    Body:

```
{
  "name": "Nome do professor",
  "email": "Email do professor",
  "password": "Senha do professor",
  "isAdmin": true
}
```

#### Atualizar Professor

-   PUT `/professores/:id`

Body:

```
{
  "name": "Nome do professor",
  "email": "Email do professor",
  "password": "Senha do professor"
}
```

#### Deletar Professor

-   DELETE `/professores/:id`

#### Listar todos os Alunos

-   GET `/alunos`

#### Obter um Aluno por ID

-   GET `/alunos/:id`

#### Criar um Aluno

-   POST `/alunos`

    Body:

```
{
  "name": "Nome do aluno",
  "email": "Email do aluno",
  "password": "Senha do aluno",
  "isAdmin": false
}
```

#### Atualizar Aluno

-   PUT `/alunos/:id`

Body:

```
{
  "name": "Nome do aluno",
  "email": "Email do aluno",
  "password": "Senha do aluno"
}
```

#### Deletar Aluno

-   DELETE `/aluno/:id`

#### Login

-   POST `/login`

Body:

```
{
  "email": "Email do usuário",
  "password": "Senha do usuário",
  "secret": "Token secreto criado no .env"
}
```

#### Logout

-   GET `/logout`

### Testes

Os testes são implementados com Jest e para executar, rode o seguinte comando: `npm test --forceExit --detectOpenHandles` .

Os testes cobrem as principais funcionalidas da API, incluíndo criação, leitura, atualização e remoção de posts.

### Documentação Swagger

A documentação da API está disponível em Swagger.

Após iniciar o servidor, acesse a documentação em: `http://localhost:5000/api-docs`

Para adicionar a documentação com Swagger, foi utilizado o pacote `swagger-jsdoc` e `swagger-ui-express`.

### Estrutura de Pastas

```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── tests
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── docker-compose-yml
│   ├── index.js
│   └── package.json
├── mobile
│   ├── assets
│   ├── src
│   │   ├── contexts
│   │   ├── routes
│   │   ├── types
│   │   ├── views
│   │   └── App.tsx
│   ├── .env
│   ├── .gitignore
│   ├── app.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── docker-compose-yml
│   ├── index.ts
│   └── package.json
├── LICENSE
└── README.md
```

-   backend/controllers: contém a lógica dos controladores da API
-   backend/models: define os modelos do MongoDB.
-   backend/routes: define as rotas da API.
-   backend/tests: contém os testes automatizados com Jest.
-   mobile/assets: contém os arquivos de imagem
-   mobile/routes: contém a lógica das rotas do Frontend.
-   mobile/types: contém definições de tipos TypeScript usadas no frontend.
-   mobile/views: contém as telas e componentes visuais do frontend.

### Tecnologias Utilizadas

-   Node.js: Plataforma para execução do Javascript no servidor.
-   Express: Framework web para Node.js.
-   MongoDB: Banco de dados NoSQL usado para persistência.
-   Jest: Framework de testes.
-   Swagger: Documentação interativa da API.
-   React: Biblioteca javacript.
-   React-Native: Biblioteca javacript.

### Docker Compose

Conteinerizando a aplicação pelo comando `docker-compose up -d`.

Isto irá baixar a imagem do repositório padrão do MongoDb e Node.Js e a build da imagem da aplicação de acordo com o yaml.
