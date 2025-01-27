import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Estudantes',
      version,
      description: 'API para gerenciamento de estudantes com autenticação de usuário',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'joao.silva',
            },
            password: {
              type: 'string',
              example: 'senha123',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'maria.santos',
            },
            password: {
              type: 'string',
              example: 'senha456',
            },
          },
        },
        Student: {
          type: 'object',
          required: ['name', 'email', 'ra', 'cpf'],
          properties: {
            name: {
              type: 'string',
              example: 'Carlos Eduardo da Silva Santos',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'carlos.silva@email.com',
            },
            ra: {
              type: 'string',
              example: '123456789',
            },
            cpf: {
              type: 'string',
              example: '12345678901',
            },
          },
        },
      },
    },
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Autenticação'],
          summary: 'Registrar novo usuário',
          description: 'Cria um novo usuário no sistema',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Usuário criado com sucesso',
              content: {
                'application/json': {
                  example: {
                    id: 1,
                    username: 'maria.santos',
                  },
                },
              },
            },
            400: {
              description: 'Falha ao registrar usuário',
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Autenticação'],
          summary: 'Login de usuário',
          description: 'Autenticar usuário e retornar token JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login realizado com sucesso',
              content: {
                'application/json': {
                  example: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                },
              },
            },
            401: {
              description: 'Usuário ou senha inválidos',
            },
          },
        },
      },
      '/api/students': {
        get: {
          tags: ['Estudantes'],
          summary: 'Listar todos os estudantes',
          description: 'Retorna a lista de todos os estudantes cadastrados',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Lista de estudantes',
              content: {
                'application/json': {
                  example: [
                    {
                      id: 1,
                      name: 'Ana Beatriz Oliveira Lima',
                      email: 'ana.lima@email.com',
                      ra: '202312345',
                      cpf: '98765432101',
                    },
                    {
                      id: 2,
                      name: 'Pedro Henrique Santos Costa',
                      email: 'pedro.costa@email.com',
                      ra: '202354321',
                      cpf: '12345678901',
                    },
                  ],
                },
              },
            },
          },
        },
        post: {
          tags: ['Estudantes'],
          summary: 'Criar novo estudante',
          description: 'Cadastra um novo estudante no sistema',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Estudante criado com sucesso',
              content: {
                'application/json': {
                  example: {
                    id: 3,
                    name: 'Mariana Rodrigues Almeida',
                    email: 'mariana.almeida@email.com',
                    ra: '202387654',
                    cpf: '45678912301',
                  },
                },
              },
            },
            400: {
              description: 'Dados inválidos',
            },
          },
        },
      },
      '/api/students/{id}': {
        put: {
          tags: ['Estudantes'],
          summary: 'Atualizar estudante',
          description: 'Atualiza os dados de um estudante específico',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID do estudante',
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Estudante atualizado com sucesso',
            },
            404: {
              description: 'Estudante não encontrado',
            },
          },
        },
        delete: {
          tags: ['Estudantes'],
          summary: 'Excluir estudante',
          description: 'Remove um estudante do sistema',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID do estudante',
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            204: {
              description: 'Estudante removido com sucesso',
            },
            404: {
              description: 'Estudante não encontrado',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);