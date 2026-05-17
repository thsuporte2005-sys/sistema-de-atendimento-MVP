create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  role text not null check (role in ('Admin', 'Atendente')),
  created_at timestamptz default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  email text,
  city text,
  state text,
  country text,
  main_pain text,
  symptoms text,
  age integer,
  profession text,
  funnel_stage text not null default 'inicio',
  temperature text not null default 'frio' check (temperature in ('frio', 'morno', 'quente')),
  status text not null default 'novo',
  ai_enabled boolean default true,
  needs_human boolean default false,
  internal_summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  sender_type text not null check (sender_type in ('lead', 'ai', 'human')),
  content text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  input_message text not null,
  ai_response text not null,
  detected_intent text,
  detected_objection text,
  detected_pain text,
  suggested_funnel_stage text,
  lead_temperature text,
  should_escalate_to_human boolean default false,
  escalation_reason text,
  created_at timestamptz default now()
);

create table if not exists public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content text not null,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.objections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  trigger_keywords text not null,
  response_template text not null,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_leads_temperature on public.leads(temperature);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_needs_human on public.leads(needs_human);
create index if not exists idx_messages_lead_id_created_at on public.messages(lead_id, created_at);
create index if not exists idx_ai_logs_lead_id_created_at on public.ai_logs(lead_id, created_at);

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'set_leads_updated_at') then
    create trigger set_leads_updated_at before update on public.leads
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_knowledge_base_updated_at') then
    create trigger set_knowledge_base_updated_at before update on public.knowledge_base
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_objections_updated_at') then
    create trigger set_objections_updated_at before update on public.objections
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_settings_updated_at') then
    create trigger set_settings_updated_at before update on public.settings
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

insert into public.leads (name, phone, main_pain, funnel_stage, temperature, status, needs_human, internal_summary) values
('Maria Silva', '5511999990001', 'joelho e lombar', 'dores_geral', 'morno', 'novo', false, 'Lead relata dores recorrentes e precisa entender o tratamento.'),
('Jose Ferreira', '5511999990002', 'nervo ciatico', 'explicacao_tratamento', 'quente', 'em_atendimento', false, 'Interesse alto; pediu detalhes sobre sessoes.'),
('Ana Costa', '5511999990003', 'artrite nas maos', 'objecao', 'morno', 'novo', true, 'Tem objecao sobre valor e precisa de atendimento humano.'),
('Carlos Santos', '5511999990004', 'coluna e perna', 'valores', 'quente', 'negociacao', false, 'Pronto para receber proposta e proximos passos.'),
('Lucia Almeida', '5511999990005', 'dor no corpo todo', 'inicio', 'frio', 'novo', false, 'Primeiro contato, ainda sem qualificacao completa.')
on conflict (phone) do update set
  main_pain = excluded.main_pain,
  funnel_stage = excluded.funnel_stage,
  temperature = excluded.temperature,
  status = excluded.status,
  needs_human = excluded.needs_human,
  internal_summary = excluded.internal_summary;

insert into public.knowledge_base (title, category, content, active) values
('Tom de atendimento', 'atendimento', 'Responder com linguagem simples, acolhedora e consultiva, sem prometer cura ou diagnostico definitivo.', true),
('Escalacao humana', 'processo', 'Escalar quando houver duvida medica sensivel, pagamento, reembolso, reclamacao forte ou risco juridico.', true),
('Qualificacao inicial', 'funil', 'Entender dor principal, tempo de dor, impacto na rotina e disponibilidade para atendimento.', true)
on conflict do nothing;

insert into public.objections (title, trigger_keywords, response_template, active) values
('Preco', 'preco,valor,caro,custa', 'Entendo sua preocupacao com valor. Antes de falar de investimento, quero entender melhor seu caso para indicar o caminho mais adequado.', true),
('Medo de nao funcionar', 'funciona,resultado,garantia', 'Faz sentido ter essa duvida. Nao prometemos cura, mas avaliamos seu caso com cuidado para orientar o proximo passo com seguranca.', true),
('Tempo', 'sem tempo,agenda,horario', 'Vamos tentar encontrar um horario que encaixe melhor na sua rotina. Quais periodos costumam ser mais tranquilos para voce?', true)
on conflict do nothing;

insert into public.settings (key, value) values
('ai_enabled', 'true'),
('business_name', 'Atendimento IA'),
('human_escalation_label', 'Aguardando humano')
on conflict (key) do update set value = excluded.value;

alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.messages enable row level security;
alter table public.ai_logs enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.objections enable row level security;
alter table public.settings enable row level security;
