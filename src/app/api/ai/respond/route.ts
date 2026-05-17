import { NextResponse } from "next/server";
import OpenAI from "openai";
import { aiSystemPrompt } from "@/ai-system-prompt";

type HistoryMessage = {
  sender_type?: "lead" | "ai" | "human";
  content?: string;
};

const fallbackResponse = {
  response_text:
    "Entendi. Para te orientar com seguranca, vou registrar seu caso e pedir para um atendente humano acompanhar.",
  should_escalate_to_human: true,
  escalation_reason: "Atendimento encaminhado para humano por seguranca operacional.",
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const { message, history = [], lead_data, base_knowledge } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({
        ...fallbackResponse,
        escalation_reason: "OPENAI_API_KEY nao configurada.",
      });
    }

    const openai = new OpenAI({ apiKey });
    const safeHistory = Array.isArray(history) ? (history as HistoryMessage[]) : [];

    const messages = [
      { role: "system", content: aiSystemPrompt },
      {
        role: "system",
        content:
          "Responda somente em JSON valido com response_text, should_escalate_to_human, escalation_reason, detected_intent, detected_objection, detected_pain, suggested_funnel_stage e lead_temperature.",
      },
      { role: "system", content: `Base de Conhecimento: ${JSON.stringify(base_knowledge || [])}` },
      { role: "system", content: `Dados do Lead: ${JSON.stringify(lead_data || {})}` },
      ...safeHistory
        .filter((item) => item.content)
        .map((item) => ({
          role: item.sender_type === "lead" ? "user" : "assistant",
          content: item.content as string,
        })),
      { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: messages as any,
      response_format: { type: "json_object" },
    });

    const aiResponseContent = response.choices[0]?.message?.content;

    try {
      return NextResponse.json(JSON.parse(aiResponseContent || "{}"));
    } catch {
      return NextResponse.json({
        ...fallbackResponse,
        escalation_reason: "Resposta da IA nao veio em JSON valido.",
      });
    }
  } catch (error) {
    console.error("AI Respond Error:", error);

    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}
