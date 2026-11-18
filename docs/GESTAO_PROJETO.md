# Gestão do Projeto, Cynefin e Ciclo de Vida - Tech Forge

## 1. Análise do Contexto com o Framework Cynefin

O projeto Tech Forge é classificado no domínio **Complicado** do Framework Cynefin.
- **Justificativa:** A solução exige conhecimento técnico especializado (integração backend/frontend, Redis, Docker, Nginx e Multer), mas os requisitos e padrões de arquitetura são conhecidos e analíticos (*Sense - Analyze - Respond*).
- **Abordagem Adotada:** Abordagem Ágil/Híbrida baseada no framework Scrum, permitindo validações incrementais em cada Sprint.

---

## 2. Estruturação do Trabalho no Jira

- **Estrutura de Issues:**
  - **Epics:** Infraestrutura & Docker, Autenticação & Permissões, Gestão de Catálogo & Uploads, Documentação Técnica.
  - **User Stories (Exemplos com Critérios de Aceite):**
    - *Como Administrador, quero enviar imagens dos produtos para manter o catálogo atualizado.*
      - **Critério de Aceite:** Aceitar apenas arquivos JPG/PNG, tamanho máximo de 5MB e salvar com nome único.
    - *Como Usuário, quero visualizar a lista de produtos rapidamente.*
      - **Critério de Aceite:** Resposta da API abaixo de 100ms utilizando cache do Redis.
  - **Tasks:** Configuração do Nginx, Integração com Redis, Elaboração dos Diagramas C4.
  - **Bugs:** Correção do pre-commit do Husky, tratamento de erro no upload de arquivos.

---

## 3. Planejamento do Ciclo de Vida do Projeto (Scrum / Ágil)

- **Papéis Definidos:**
  - **Product Owner / Gerente de Projetos:** Definição de requisitos, alinhamento com a persona e priorização do Backlog.
  - **Desenvolvedor Fullstack:** Implementação das rotas API, frontend em React, Docker Compose e cache Redis.
- **Ceremônias:** Sprints semanais com planejamento, revisão de código e validação dos critérios da rubrica.
- **Entregáveis por Versão:**
  - `v1.0.0`: Estrutura base Express + SQLite/MySQL + Multer + Documentação UML.
  - `v2.0.0`: Containerização Docker + Proxy Nginx + Redis Cache/PubSub + Documentação Arquitetural C4/Cynefin.