# Atendimento IA MVP

Sistema de atendimento com IA para qualificar leads, acompanhar conversas e apoiar escalação humana.

## Status do deploy

O projeto Next.js fica na raiz do repositório para a Vercel detectar `package.json`, instalar dependências e gerar o build corretamente. A versão anterior estava dentro da pasta `Sistema de atendimento/`, então a Vercel construía a raiz vazia e publicava 404.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://spupfvjkarfkfvelqfpb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_cXBDlhXaCoW85AZHJLulEA_lILA924R
OPENAI_API_KEY=
AI_MODEL=gpt-4o-mini
```

O app tem fallback seguro quando `OPENAI_API_KEY` não existe, evitando erro 500 na rota `/api/ai/respond`.

## Supabase

O schema fica em `supabase/schema.sql` e cria:

- `users`
- `leads`
- `messages`
- `ai_logs`
- `knowledge_base`
- `objections`
- `settings`

As tabelas usam RLS ativo. Para expor dados reais na interface pública, crie políticas de leitura controladas ou use uma chave server-side segura na Vercel. Não libere escrita anônima em produção.
