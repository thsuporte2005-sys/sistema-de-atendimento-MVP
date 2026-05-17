import { NextResponse } from "next/server";
import OpenAI from "openai";
import { aiSystemPrompt } from "@/ai-system-prompt";

type ChatMessage = {
  sender_type?: string;
  content?: string;
};

const fallbackResponse = {
  response_text:
    "Entendi. Para te orientar certinho nesse caso, vou pedir para um atendente verificar sua situacao com mais atencao.",
  should_escalate_to_human: true,
  escalation_reason: "Atendimento humano recomendado.",
  confidence_score: 0,
  ai_action: "escalate",
  next_best_action: "wait_for_human",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      message,
      history = [],
      lead_data = {},
      base_knowledge = [],
    }: {
      message?: string;
      history?: ChatMessage[];
      lead_data?: unknown;
      base_knowledge?: unknown;
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "A mensagem do lead e obrigatoria." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ...fallbackResponse,
        escalation_reason: "OPENAI_API_KEY nao configurada.",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = [
      { role: "system", content: aiSystemPrompt },
      {
        role: "system",
        content: `Base de Conhecimento: ${JSON.stringify(base_knowledge)}`,
      },
      {
        role: "system",
        content: `Dados do Lead: ${JSON.stringify(lead_data)}`,
      },
      ...history.map((msg) => ({
        role: msg.sender_type === "lead" ? "user" : "assistant",
        content: msg.content || "",
      })),
      { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      response_format: { type: "json_object" },
      temperature: Number(process.env.AI_TEMPERATURE || 0.4),
    });

    const aiResponseContent = response.choices[0]?.message?.content;

    try {
      return NextResponse.json(JSON.parse(aiResponseContent || "{}"));
    } catch {
      return NextResponse.json({
        ...fallbackResponse,
        escalation_reason: "Erro no parse JSON da IA.",
      });
    }
  } catch (error) {
    console.error("AI Respond Error:", error);
    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}
