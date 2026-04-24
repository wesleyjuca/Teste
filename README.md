# Portal e-Proc Acre

Plataforma full-stack institucional para capacitação de advogados no sistema e-Proc, com trilhas de aprendizado, simulador interativo, assistente IA, painel administrativo e canal colaborativo.

## Stack
- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS
- Prisma ORM + PostgreSQL (Supabase)
- NextAuth (credentials + RBAC)
- OpenAI API
- Zustand

## Arquitetura
```
/app /components /features /lib /server /prisma /services /hooks
```

## Setup local
1. Copie variáveis:
```bash
cp .env.example .env
```
2. Instale dependências:
```bash
npm install
```
3. Gere client Prisma e rode migração:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```
4. Suba projeto:
```bash
npm run dev
```

## Configuração Supabase
1. Crie um projeto PostgreSQL no Supabase.
2. Preencha `DATABASE_URL` e `DIRECT_URL` no `.env`.
3. Rode `npm run prisma:migrate` para aplicar schema.

## Deploy na Vercel
1. Importar repositório na Vercel.
2. Configurar variáveis de ambiente do `.env.example` (incluindo `AUTH_TRUST_HOST=true` em produção).
3. Definir build command `npm run build`.
4. Definir install command `npm install` (o `postinstall` roda `prisma generate` automaticamente).
5. Definir output padrão Next.js.

## Scripts CI-ready
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Segurança
- Zod nas rotas críticas.
- Sanitização de conteúdo rich text.
- Rotas protegidas por sessão e papel.
- Segregação de acesso admin/user.

## Módulos implementados
- Autenticação com registro/login e RBAC.
- Dashboard com cards e busca global.
- Módulos de aprendizagem (5 trilhas).
- Simulador com feedback de erro comum/procedimento correto.
- Assistente IA (`/api/ai-chat`).
- Alertas administrativos (`/api/updates`).
- Canal colaborativo (`/api/messages`).
- Painel admin (`/admin`).
