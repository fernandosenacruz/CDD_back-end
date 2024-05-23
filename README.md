# Coach da depressão
## Api de Posts de frases desmotivacionais
Api de estudos desenvolvida para permitir cadastro simples de usuários e postagens com frases e imagens em um banco de dados relacional Postgres e ler/editá-los. Finalidade lúdica e humorística.

# 🚀 Deploy 🚀

O Deploy da aplicação foi feito no [Render](https://render.com/) utilizando de um Pipeline no [GitHub Actions do repositório](https://github.com/fernandosenacruz/CDD_back-end). Seguem os links de acesso da aplicação:

**Back-end**
- **Redocly**: https://cdd-back-end-8wbw.onrender.com/redocly
- **Swagger**: https://cdd-back-end-8wbw.onrender.com/api-docs/

![image](https://github.com/fernandosenacruz/CDD_back-end/assets/67607748/0c05c58f-fdf6-417d-a32a-4b9d49b9ba81)

### Testar Rotas do Back-end

Necessário realizar login e adicionar o token.
![image](https://github.com/fernandosenacruz/CDD_back-end/assets/67607748/3a21e4c2-0e23-4458-b00e-dbddab8887d6)


# 💻 Rodar a aplicação na sua máquina 💻
### Você vai precisar ter instalado
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started/) (Recomendado) ou [Postgres](https://www.postgresql.org/download/)

## 🐋 Rodar com Docker 🐋
<details>
<summary>Instruções</summary>

## Clonar o repositório
Primeiramente você vai precisar clonar este repositório para qualquer diretório em sua máquina local.

Para isso você vai executar o seguinte comando no seu terminal:
```console
git clone https://github.com/fernandosenacruz/CDD_back-end.git
```

## Setup
Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

### Configurar o ambiente (.env)

- **Back-end**
  - Acesse o diretório `./CDD_back-end`
  - Altere o arquivo `.env.example` com as variáveis de ambiente indicadas:
  ```
  POSTGRES_USER="user"
  POSTGRES_PASSWORD="password"
  POSTGRES_DB="database"
  PGUSER="postgres"
  DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db/${POSTGRES_DB}?schema=public" // URL onde o banco MySQL está rodando (Padrão Docker)

  JWT_SECRET="your-secret-password" // Segredo usado para gerar tokens JWT (qualquer string)

  OFFENSIVE_WORDS="word1/word2/.../wordN" // Palavras a serem censuradas
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável
  - Renomeie o arquivo para `.env`

## Acessar a Aplicação
- Back-end:
  - Você pode testar a aplicação via Postman ou Insomnia - URL: `http://localhost:3000` ou via Swagger - URL `http://localhost:3000/api-docs`

</details>

## Rodar com :elephant: Postgres :elephant:
<details>
<summary>Instruções</summary>

## Clonar o repositório
Primeiramente você vai precisar clonar este repositório para qualquer diretório em sua máquina local.

Para isso você vai executar o seguinte comando no seu terminal:
```console
git clone https://github.com/fernandosenacruz/CDD_back-end.git
```

## Setup
Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente e instalar as dependências do projeto.

### Configurar o ambiente (.env)

- **Back-end**
  - Acesse o diretório `./back-end`
  - Altere o arquivo `.env.example` com as variáveis de ambiente indicadas:
  ```
  DATABASE_URL="postgresql://user:postgres@/cdd_back-end?schema=public" // URL onde o banco MySQL está rodando (Padrão Docker)

  JWT_SECRET="your-secret-password" // Segredo usado para gerar tokens JWT (qualquer string)

  OFFENSIVE_WORDS="word1/word2/.../wordN" // Palavras a serem censuradas
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável
  - Renomeie o arquivo para `.env`

### Instalar dependências
- Nas pastas `./CDD_back-end` rode o comando `npm install` ou `yarn install`

## Inicializar a Aplicação
- Realize a migrate com o comando `npm run prisma:migrate`
- Inicialize o back-end com o comando `npm run dev` ou `npm run build && npm run start`

> Por padrão o back-end inicializa na porta 3000

## Acessar a Aplicação
- Back-end:
  -- Você pode testar a aplicação via Postman ou Insomnia - URL: `http://localhost:3000` ou via Swagger - URL `http://localhost:3000/api-docs`

</details>

# 🚧 Testes 🚧

Os testes no ainda estão incompletos. Futuramente ampliarei a combertura
> Os testes necessitam que as dependências do projeto estejam instaladas (`npm install`)

### Testes Unitários
- Rode o comando `npm run test:unit`

### Testes de Integração

Configure a variável de ambiente em `.env.test.example` e renomeie o arquivo para `.env.test`
```
DATABASE_URL="postgresql://user:postgres@/cdd_back-end?schema=public" // URL onde o banco MySQL de testes vai rodar
```
- **Postgres**: Rode o comando `npm run test:integration`
- **Docker**: Rode o comando `npm run test:integration:docker`

## Tecnologias Usadas

### Banco de Dados 💾
- [Postgres](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)

### Back-end ⚙️
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Chai / chai-http](https://www.chaijs.com/)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- Bibliotecas JS: md5, cors, http-status-codes, faker

### Geral 🧾
- [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions)
</details>

# 💡 Referências a outros projetos 💡

Neste projeto foram utilizados recursos e sintaxe de código inspirados em outros projetos pessoais que já fiz:

- 🏅 [TrybeRank](https://github.com/RafaelAugustScherer/trybe-rank): Deploy Containerizado no Heroku; Front-end React
- 🚚 [DeliveryApp](https://github.com/RafaelAugustScherer/delivery-app): App Full-stack com MySQL, Express e JWT
- 🟨 [DesafioNative](https://github.com/RafaelAugustScherer/desafioNative): Desafio Técnico Native IP Full-stack
