# Documentação Arquitetural e DDD - Tech Forge

## 1. Diagramas C4 (Contexto e Containers)

### C4 Level 1: Diagrama de Contexto
graph TD
    User[Usuário / Cliente] -->|Acessa via Navegador/App| System[Sistema Tech Forge]
    Admin[Administrador] -->|Gerencia Produtos e Usuários| System
    System -->|Armazena Dados| DB[(Banco de Dados MySQL)]
    System -->|Cache e Eventos| Redis[(Redis Cache/PubSub)]

### C4 Level 2: Diagrama de Containers
graph TD
    Client[Frontend Single Page App - React/Vite] -->|HTTP / HTTPS| Proxy[Nginx Proxy Reverso]
    Proxy -->|Redireciona Requisições| API[Backend Node.js / Express / Prisma]
    API -->|Persistência de Dados| DB[(MySQL Database)]
    API -->|Leitura Rápida e Eventos| Redis[(Redis In-Memory)]
    API -->|Upload de Imagens| Storage[Diretório local /uploads via Multer]

---

## 2. Estilos Arquiteturais, DDD e Bounded Contexts

### Context Map e Bounded Contexts
O sistema é dividido em dois contextos delimitados principais:
1. Contexto de Autenticação e Gestão de Usuários: Responsável pelo cadastro, login e controle de permissões (RBAC: Admin vs User).
2. Contexto de Catálogo e Mídia: Responsável pelo cadastro de produtos e gestão de arquivos de imagem via Multer.

### Mapeamento de Domínio (Entidades e Aggregates)
- Entities: User (ID, Nome, Email, Senha, Role), Product (ID, Nome, Preço, Categoria, ImageUrl).
- Value Objects: Email (validação de formato), UserRole (ADMIN, USER).
- Aggregates: Aggregate de Produto (Produto + Suas Imagens Associadas).

---

## 3. Registros de Decisão Arquitetural (ADRs)

### ADR 01: Arquitetura Monolítica Modularizada vs Microserviços
- Status: Aceito
- Contexto: Necessidade de rapidez no desenvolvimento com escopo bem definido.
- Decisão: Adotar uma arquitetura monolítica organizada em módulos (Controllers, Services, Routes), permitindo evolução futura para microserviços.

### ADR 02: Escolha do Banco de Dados Relacional e Cache com Redis
- Status: Aceito
- Contexto: Necessidade de persistência estruturada com MySQL/Prisma aliada a alta performance em consultas repetitivas.
- Decisão: Utilizar MySQL com Prisma ORM para armazenamento relacional e Redis como Cache-aside e sistema de mensageria Pub/Sub.

---

## 4. Especificação OpenAPI / Swagger (Resumo)
- POST /api/auth/login: Autenticação e retorno de JWT token.
- GET /api/products: Listagem de produtos (utiliza Redis Cache).
- POST /api/products: Criação de produtos com upload de imagem Multer (Invalida o cache do Redis).

---

## 5. Resiliência, Observabilidade e CI/CD

- Estratégias de Resiliência:
  - Timeout: Limite de 5 segundos para requisições de banco e cache.
  - Fallback: Em caso de indisponibilidade do Redis, o sistema busca os dados diretamente no banco MySQL.
- Observabilidade: Logs estruturados no console identificando acessos, erros e operações de cache ([REDIS CACHE HIT], [REDIS CACHE MISS]).
- Pipeline CI/CD (Esqueleto GitHub Actions):
  - Build: Instalação de dependências e verificação de sintaxe.
  - Test: Execução dos testes unitários e de integração.
  - Deploy: Geração da imagem Docker e implantação no ambiente final.