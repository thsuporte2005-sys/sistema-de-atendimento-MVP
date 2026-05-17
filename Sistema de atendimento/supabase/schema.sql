-- Tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Atendente')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  main_pain TEXT,
  symptoms TEXT,
  age INTEGER,
  profession TEXT,
  funnel_stage TEXT NOT NULL DEFAULT 'inicio',
  temperature TEXT NOT NULL DEFAULT 'frio',
  status TEXT NOT NULL DEFAULT 'novo',
  ai_enabled BOOLEAN DEFAULT true,
  needs_human BOOLEAN DEFAULT false,
  internal_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('lead', 'ai', 'human')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs da IA
CREATE TABLE ai_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  input_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  detected_intent TEXT,
  detected_objection TEXT,
  detected_pain TEXT,
  suggested_funnel_stage TEXT,
  lead_temperature TEXT,
  should_escalate_to_human BOOLEAN DEFAULT false,
  escalation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de base de conhecimento
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de objeções
CREATE TABLE objections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  trigger_keywords TEXT NOT NULL,
  response_template TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seeds Iniciais
INSERT INTO leads (name, phone, main_pain, funnel_stage, temperature) VALUES
('Maria Silva', '5511999990001', 'joelho e lombar', 'dores_geral', 'morno'),
('José Ferreira', '5511999990002', 'nervo ciático', 'explicacao_tratamento', 'quente'),
('Ana Costa', '5511999990003', 'artrite nas mãos', 'objecao', 'morno'),
('Carlos Santos', '5511999990004', 'coluna e perna', 'valores', 'quente'),
('Lucia Almeida', '5511999990005', 'dor no corpo todo', 'inicio', 'frio');
