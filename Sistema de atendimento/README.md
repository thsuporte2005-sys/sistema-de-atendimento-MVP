# Atendimento IA MVP

Este é o MVP do sistema de atendimento com IA focado em vendas consultivas e atendimento humanizado para WhatsApp.

## Como rodar o projeto localmente

1. **Instalar dependências**
   Abra o terminal na pasta do projeto e execute:
   \`\`\`bash
   npm install
   \`\`\`

2. **Configurar variáveis de ambiente**
   Crie um arquivo \`.env.local\` na raiz do projeto e preencha com as suas chaves:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
   OPENAI_API_KEY=sua_api_key_da_openai
   \`\`\`

3. **Configurar o Banco de Dados (Supabase)**
   - Acesse o Supabase e crie um novo projeto.
   - Vá no SQL Editor do Supabase e cole o conteúdo do arquivo \`supabase/schema.sql\` para criar todas as tabelas e inserir os dados de teste (seeds).

4. **Rodar o servidor de desenvolvimento**
   \`\`\`bash
   npm run dev
   \`\`\`
   O projeto estará rodando em \`http://localhost:3000\`.

## Estrutura Atual
- **Dashboard**: Tela inicial com os KPIs e interface visual baseada nos requisitos (layout responsivo e cores limpas em `src/app/page.tsx`).
- **APIs de IA**: A rota \`/api/ai/respond\` já está estruturada e pronta para receber mensagens e se comunicar com a OpenAI respeitando o \`ai-system-prompt.ts\`.
- **Database Schema**: Tudo pronto em \`supabase/schema.sql\`, contemplando leads, logs, histórico de mensagens e base de conhecimento.
- **Prompt Interno**: \`src/ai-system-prompt.ts\` contém as regras exatas para atendimento humano e escalação.

## Próximos Passos
1. Expandir as telas detalhadas de chat e CRM (\`/leads/[id]\`) consumindo a API do Supabase e atualizando o state React.
2. Adicionar o módulo \`supabase-js\` e conectar a interface.
3. Integrar WhatsApp real conectando com provedores como Z-API/Evolution.
