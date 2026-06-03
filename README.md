# Inox Ferro - Plataforma de Orçamentos

## Fase 1 - Estrutura Inicial

Este repositório contém a base do projeto com frontend e backend separados, alinhado com a arquitetura solicitada.

### Backend
- `backend/package.json` - dependências e scripts de desenvolvimento.
- `backend/tsconfig.json` - configuração TypeScript para servidor Express.
- `backend/.gitignore` - define arquivos excluídos do controlo de versão.
- `backend/src/app.ts` - ponto de entrada da API Express.
- `backend/src/routes/index.ts` - roteamento inicial.
- `backend/src/controllers/healthController.ts` - rota de saúde da API.
- `backend/src/middleware/errorHandler.ts` - tratamento centralizado de erros.
- `backend/src/config/env.ts` - carregamento de variáveis de ambiente.
- `backend/src/database/prismaClient.ts` - cliente Prisma para PostgreSQL.
- `backend/prisma/schema.prisma` - esquema base do Prisma.
- `backend/src/seeders/adminSeeder.ts` - semeador inicial de administrador.

### Frontend
- `frontend/package.json` - dependências Next.js, Tailwind e scripts.
- `frontend/tsconfig.json` - configuração TypeScript para o frontend.
- `frontend/next.config.mjs` - configuração Next.
- `frontend/tailwind.config.js` - configurações de design modular.
- `frontend/postcss.config.js` - configuração PostCSS.
- `frontend/.gitignore` - arquivos ignorados do frontend.
- `frontend/src/pages/_app.tsx` - componente global do Next.
- `frontend/src/pages/index.tsx` - página inicial com layout empresarial.
- `frontend/src/components/layouts/Sidebar.tsx` - sidebar fixa e corporativa.
- `frontend/src/components/layouts/Header.tsx` - cabeçalho com ações rápidas.
- `frontend/src/styles/globals.css` - estilo global com `border-radius: 0px`.
- `frontend/public/logo.svg` - logo personalizado em vermelho, branco e preto.
- `frontend/src/utils/api.ts` - cliente HTTP para chamadas de API.
- `frontend/src/routes/appRoutes.ts` - rotas organizadas da aplicação.

## Nota Técnica
- A estrutura está preparada para crescer em fases seguintes.
- O frontend utiliza layout corporativo com cores preto, branco e vermelho.
- O backend já está organizado em pastas modulares para controllers, middleware, config e database.
- O projeto está pronto para avançar à Fase 2 com configuração de base de dados, modelos e migrations.
# contabilidade
