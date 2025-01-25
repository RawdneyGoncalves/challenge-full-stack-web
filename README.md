# Aplicação de Gerenciamento de Alunos

## Estrutura do Projeto

### Arquitetura do Backend
```
backend/
└── src/
    ├── config/         # Arquivos de configuração
    ├── controllers/    # Controladores de rotas da API
    ├── dto/            # Objetos de Transferênci de Dados

    ├── entities/       # Entidades do banco de dados
    ├── middlewares/    # Middlewares do Express
    ├── migrations/     # Scripts de migração
    ├── repositories/   # Repositórios de acesso a dados
    ├── routes/         # Definições de rotas
    ├── services/       # Serviços de lógica de negócio
    ├── types/          # Definições de tipos
    ├── utils/          # Funções utilitárias
    ├── app.ts          # Configuração do aplicativo Express
    ├── inversify.config.ts  # Configuração de injeção de dependência
    └── server.ts       # Ponto de entrada da aplicação
```

## Tecnologias Backend
- **Injeção de Dependência**: Inversify
- **ORM**: TypeORM
- **Banco de Dados**: PostgreSQL/MySQL
- **Linguagem**: TypeScript
- **Framework Web**: Express

## Configuração do Ambiente
Crie um arquivo `.env` com as seguintes variáveis:
```
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=usuario
DB_PASSWORD=senha
DB_NAME=nome_banco
DB_LOGGING=true
DB_SSL=false
```

## Instalação do Backend
1. Instalar dependências
```bash
cd backend

npm install ou yarn 
```

2. Executar migrações
```bash
npm run migration:run
```

3. Iniciar servidor e startar a aplicação backend
```bash
npm run build

npm run start
```

## Funcionalidades Principais
- Injeção de Dependência com Inversify
- Integração com banco de dados via TypeORM
- Autenticação JWT
- Tratamento de erros
- Arquitetura modular

## Tecnologias Frontend
- Vue.js 3
- TypeScript
- Vite

## Requisitos
- Node.js (v18+)
- Banco de Dados PostgreSQL ou MySQL
