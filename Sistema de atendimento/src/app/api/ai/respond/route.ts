import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { aiSystemPrompt } from '@/ai-system-prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { lead_id, message, history, lead_data, base_knowledge } = await req.json();

    const messages = [
      { role: 'system', content: aiSystemPrompt },
      { role: 'system', content: `Base de Conhecimento: ${JSON.stringify(base_knowledge)}` },
      { role: 'system', content: `Dados do Lead: ${JSON.stringify(lead_data)}` },
      ...history.map((msg: any) => ({
        role: msg.sender_type === 'lead' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or process.env.AI_MODEL
      messages: messages as any,
      response_format: { type: "json_object" }
    });

    const aiResponseContent = response.choices[0].message.content;
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(aiResponseContent || '{}');
    } catch (e) {
      jsonResponse = {
        response_text: "Entendi. Para te orientar certinho nesse caso, vou pedir para um atendente verificar sua situação com mais atenção.",
        should_escalate_to_human: true,
        escalation_reason: "Erro no parse JSON da IA"
      };
    }

    // A lógica de salvar no Supabase (ai_logs, messages, leads) iria aqui ou no cliente
    // Como é um MVP e a estrutura está sendo montada, retornamos a resposta
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("AI Respond Error:", error);
    return NextResponse.json(
      { error: 'Failed to process AI response' },
      { status: 500 }
    );
  }
}
