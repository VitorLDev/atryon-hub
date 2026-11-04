# Atryon Hub

Plataforma SaaS modular para gestão de igrejas, ONGs, associações, escolas e outras organizações. A experiência inicial concentra a visão executiva em um dashboard responsivo; a API e o modelo de dados estabelecem a base para os módulos evoluírem com isolamento por organização e unidade.

## Estrutura

- `frontend/`: Next.js, React, TypeScript, Tailwind CSS, TanStack Query, Zustand e Framer Motion.
- `backend/`: API NestJS com prefixo REST `/api` e documentação Swagger.
- `database/prisma/`: schema PostgreSQL com organizações, unidades, usuários/RBAC, membros e domínios operacionais.
- `docker/`: serviço PostgreSQL para desenvolvimento local.
- `shared/`: espaço reservado para contratos compartilhados entre cliente e API.
- `docs/`: documentação do projeto.

## Executar localmente

Requisitos: Node.js 20+, npm 10+ e Docker com Compose.

1. Copie `.env.example` para `.env`.
2. Inicie o banco: `docker compose -f docker/docker-compose.yml up -d`.
3. Instale os pacotes na raiz: `npm install`.
4. Gere o cliente Prisma: `npm run prisma:generate --workspace backend`.
5. Aplique o schema em desenvolvimento: `npm run prisma:migrate --workspace backend -- --name init`.
6. Inicie o dashboard: `npm run dev`.
7. Em outro terminal, inicie a API: `npm run dev:api`.

Dashboard: `http://localhost:3000`. Verificação da API: `http://localhost:4000/api/health`. Swagger: `http://localhost:4000/api/docs`.

## Estado da implementação

O dashboard contém dados de demonstração locais e interações de navegação, tema, busca rápida (Ctrl+K) e tarefas. A API NestJS fornece o endpoint de saúde e Swagger como ponto de partida. Os demais módulos, autenticação JWT/refresh token, políticas RBAC, armazenamento de arquivos, notificações e integrações de IA precisam ser implementados antes de uso em produção. O schema Prisma é a base de persistência, não uma declaração de que esses fluxos já estão conectados.

## Segurança e LGPD

O modelo separa organização e unidade e inclui papéis/permissões, tokens de atualização e auditoria. Antes de produção, implemente autorização em cada endpoint e valide o escopo da organização em toda consulta; aplique criptografia e política de retenção aos dados pessoais e registros confidenciais; proteja segredos fora do repositório; e defina processos de consentimento, acesso, correção, exportação e eliminação conforme a LGPD. O schema sozinho não garante isolamento ou conformidade.

## Próximos módulos sugeridos

1. Autenticação, seleção de organização/unidade e guardas RBAC.
2. CRUD de membros, ministérios e eventos, com validação e testes.
3. Financeiro, patrimônio, cursos, atendimento e documentos.
4. Comunicação, auditoria ampliada, exportações e integrações externas.
5. Assistente Atryon AI por meio de um serviço abstrato, sem acoplar o domínio a um provedor.
