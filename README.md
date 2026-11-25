# Project Tracker API

API REST de gerenciamento de projetos e tarefas, construída com NestJS durante meus estudos do framework.

Permite criar projetos, distribuir tarefas entre colaboradores, comentar nas tarefas e controlar o acesso por papel. Inclui autenticação JWT, recuperação de senha por e-mail em fila e upload de avatar.

## Stack

- **NestJS 12** + **TypeScript** (ESM)
- **Prisma 7** + **PostgreSQL**
- **JWT** + **Passport** para autenticação
- **RabbitMQ** para o envio assíncrono de e-mails
- **Nodemailer** + **Handlebars** para os templates de e-mail
- **Cloudinary** para upload de imagens
- **Swagger** para documentação
- **Jest** + **Supertest** para os testes
- **Biome** para lint e formatação

## Pré-requisitos

- Node.js 20 ou superior (desenvolvido na v24)
- pnpm
- PostgreSQL
- RabbitMQ
- Conta no Cloudinary (upload de avatar)
- Servidor SMTP (pode ser Mailtrap, Gmail ou similar)

Subindo o banco e a fila com Docker:

```bash
docker run -d --name postgres -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=project_tracker postgres:16

docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## Instalação

```bash
git clone https://github.com/filippemelo/project-tracker-api-nestjs.git
cd project-tracker-api-nestjs
pnpm install
```

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha com os seus valores:

```bash
cp .env.example .env
```

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `SECRET_KEY` | Chave usada para assinar os tokens JWT |
| `SMTP_HOST` | Host do servidor SMTP |
| `SMTP_PORT` | Porta do servidor SMTP |
| `SMTP_USER` | Usuário do SMTP |
| `SMTP_PASS` | Senha do SMTP |
| `RABBITMQ_URL` | URL de conexão do RabbitMQ (ex: `amqp://guest:guest@localhost:5672`) |
| `CLOUDINARY_CLOUD_NAME` | Nome da cloud no Cloudinary |
| `CLOUDINARY_API_KEY` | API key do Cloudinary |
| `CLOUDINARY_API_SECRET` | API secret do Cloudinary |
| `PORT` | Porta da API (opcional, padrão `3000`) |

## Banco de dados

```bash
pnpm prisma generate     # gera o client em src/generated/prisma
pnpm prisma migrate dev  # aplica as migrations
```

## Executando

```bash
pnpm start:dev   # desenvolvimento com watch
pnpm start       # desenvolvimento
pnpm build       # build de produção
pnpm start:prod  # roda o build
```

A API sobe em `http://localhost:3000` e a documentação Swagger fica em `http://localhost:3000/api`.

## Testes

```bash
pnpm test       # testes unitários
pnpm test:cov   # cobertura
pnpm test:e2e   # testes end-to-end
```

## Rotas

Todas as rotas usam versionamento por URI, com o prefixo `/v1`. Com exceção de `signup`, `signin`, `forgot-password` e `reset-password`, todas exigem o header `Authorization: Bearer <token>`.

### Autenticação

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/v1/auth/signup` | Cria uma conta |
| POST | `/v1/auth/signin` | Faz login e retorna o token |
| GET | `/v1/auth/me` | Dados do usuário autenticado |
| POST | `/v1/auth/forgot-password` | Envia o e-mail de redefinição |
| POST | `/v1/auth/reset-password` | Redefine a senha com o token do e-mail |
| PUT | `/v1/auth/change-password` | Troca a senha do usuário logado |

### Usuários

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/v1/users` | Lista os usuários (paginado) |
| GET | `/v1/users/:userId` | Detalha um usuário |
| POST | `/v1/users` | Cria um usuário |
| PUT | `/v1/users/:userId` | Atualiza um usuário |
| DELETE | `/v1/users/:userId` | Remove um usuário |
| POST | `/v1/users/avatar` | Faz upload do avatar |

### Projetos, tarefas, comentários e colaboradores

| Método | Rota | Descrição |
| --- | --- | --- |
| GET POST | `/v1/projects` | Lista e cria projetos |
| GET PUT DELETE | `/v1/projects/:projectId` | Detalha, atualiza e remove um projeto |
| GET POST | `/v1/projects/:projectId/tasks` | Lista e cria tarefas |
| GET PUT DELETE | `/v1/projects/:projectId/tasks/:taskId` | Detalha, atualiza e remove uma tarefa |
| GET POST | `/v1/projects/:projectId/tasks/:taskId/comments` | Lista e cria comentários |
| GET PUT DELETE | `/v1/projects/:projectId/tasks/:taskId/comments/:commentId` | Detalha, atualiza e remove um comentário |
| GET POST | `/v1/projects/:projectId/collaborators` | Lista e adiciona colaboradores |
| PUT DELETE | `/v1/projects/:projectId/collaborators/:userId` | Altera o papel e remove um colaborador |

Os papéis de colaborador são `OWNER`, `EDITOR` e `VIEWER`.

## Estrutura

```
src/
├── common/           # guards, interceptors, decorators e serviços compartilhados
├── generated/prisma/ # client gerado pelo Prisma
├── modules/
│   ├── auth/         # autenticação, JWT e recuperação de senha
│   ├── collaborators/
│   ├── comments/
│   ├── mail/         # producer, consumer RabbitMQ e templates
│   ├── projects/
│   ├── tasks/
│   └── users/
├── utils/
└── main.ts           # bootstrap, Swagger, CORS, versionamento e microserviço
```

## Como funciona o envio de e-mail

A API não envia e-mail dentro do request. Ao pedir a redefinição de senha, o `MailService` publica o evento `SEND_PASSWORD_RESET` na fila `email_queue` do RabbitMQ e responde na hora. O `MailConsumer`, registrado como microserviço na mesma aplicação, consome o evento e envia o e-mail com o template Handlebars.

## Licença

Projeto de estudo, sem licença de uso definida.
