export type LeadTemperature = "frio" | "morno" | "quente";

export type LeadSummary = {
  id: string;
  name: string;
  mainPain: string;
  funnelStage: string;
  temperature: LeadTemperature;
  status: string;
  needsHuman: boolean;
  internalSummary: string;
  createdAt: string;
};

export type KnowledgeItem = {
  id: string;
  title: string;
  category: string;
  content: string;
};

export type ObjectionItem = {
  id: string;
  title: string;
  triggerKeywords: string;
  responseTemplate: string;
};

export type ConversationItem = {
  id: string;
  leadName: string;
  lastMessage: string;
  channel: string;
  status: string;
  updatedAt: string;
};

export const demoLeads: LeadSummary[] = [
  {
    id: "maria-silva",
    name: "Maria Silva",
    mainPain: "joelho e lombar",
    funnelStage: "dores_geral",
    temperature: "morno",
    status: "novo",
    needsHuman: false,
    internalSummary: "Lead relata dores recorrentes e precisa entender o tratamento.",
    createdAt: "2026-05-17T10:15:00-03:00",
  },
  {
    id: "jose-ferreira",
    name: "Jose Ferreira",
    mainPain: "nervo ciatico",
    funnelStage: "explicacao_tratamento",
    temperature: "quente",
    status: "em_atendimento",
    needsHuman: false,
    internalSummary: "Interesse alto; pediu detalhes sobre sessoes.",
    createdAt: "2026-05-17T10:42:00-03:00",
  },
  {
    id: "ana-costa",
    name: "Ana Costa",
    mainPain: "artrite nas maos",
    funnelStage: "objecao",
    temperature: "morno",
    status: "novo",
    needsHuman: true,
    internalSummary: "Tem objecao sobre valor e precisa de atendimento humano.",
    createdAt: "2026-05-17T11:08:00-03:00",
  },
  {
    id: "carlos-santos",
    name: "Carlos Santos",
    mainPain: "coluna e perna",
    funnelStage: "valores",
    temperature: "quente",
    status: "negociacao",
    needsHuman: false,
    internalSummary: "Pronto para receber proposta e proximos passos.",
    createdAt: "2026-05-17T11:40:00-03:00",
  },
  {
    id: "lucia-almeida",
    name: "Lucia Almeida",
    mainPain: "dor no corpo todo",
    funnelStage: "inicio",
    temperature: "frio",
    status: "novo",
    needsHuman: false,
    internalSummary: "Primeiro contato, ainda sem qualificacao completa.",
    createdAt: "2026-05-17T12:05:00-03:00",
  },
];

export const demoKnowledgeBase: KnowledgeItem[] = [
  {
    id: "tom-atendimento",
    title: "Tom de atendimento",
    category: "atendimento",
    content:
      "Responder com linguagem simples, acolhedora e consultiva, sem prometer cura ou diagnostico definitivo.",
  },
  {
    id: "escalacao-humana",
    title: "Escalacao humana",
    category: "processo",
    content:
      "Escalar quando houver duvida medica sensivel, pagamento, reembolso, reclamacao forte ou risco juridico.",
  },
  {
    id: "qualificacao-inicial",
    title: "Qualificacao inicial",
    category: "funil",
    content:
      "Entender dor principal, tempo de dor, impacto na rotina e disponibilidade para atendimento.",
  },
];

export const demoObjections: ObjectionItem[] = [
  {
    id: "preco",
    title: "Preco",
    triggerKeywords: "preco, valor, caro, custa",
    responseTemplate:
      "Entendo sua preocupacao com valor. Antes de falar de investimento, quero entender melhor seu caso para indicar o caminho mais adequado.",
  },
  {
    id: "resultado",
    title: "Medo de nao funcionar",
    triggerKeywords: "funciona, resultado, garantia",
    responseTemplate:
      "Faz sentido ter essa duvida. Nao prometemos cura, mas avaliamos seu caso com cuidado para orientar o proximo passo com seguranca.",
  },
  {
    id: "tempo",
    title: "Tempo",
    triggerKeywords: "sem tempo, agenda, horario",
    responseTemplate:
      "Vamos tentar encontrar um horario que encaixe melhor na sua rotina. Quais periodos costumam ser mais tranquilos para voce?",
  },
];

export const demoConversations: ConversationItem[] = [
  {
    id: "conv-jose",
    leadName: "Jose Ferreira",
    lastMessage: "Quero entender quantas sessoes normalmente sao indicadas.",
    channel: "WhatsApp",
    status: "IA respondendo",
    updatedAt: "2026-05-17T12:32:00-03:00",
  },
  {
    id: "conv-ana",
    leadName: "Ana Costa",
    lastMessage: "Achei o valor alto. Tem alguma condicao melhor?",
    channel: "WhatsApp",
    status: "Aguardando humano",
    updatedAt: "2026-05-17T12:18:00-03:00",
  },
  {
    id: "conv-carlos",
    leadName: "Carlos Santos",
    lastMessage: "Pode me mandar os horarios para essa semana?",
    channel: "WhatsApp",
    status: "Negociacao",
    updatedAt: "2026-05-17T11:58:00-03:00",
  },
];

export function getDashboardMetrics(leads = demoLeads) {
  return {
    totalLeads: leads.length,
    hotLeads: leads.filter((lead) => lead.temperature === "quente").length,
    needsHuman: leads.filter((lead) => lead.needsHuman).length,
    aiResponseRate: 94,
  };
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
