import { MessageCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { demoConversations, formatDateTime } from "@/lib/demo-data";
import { getSupabaseStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ConversasPage() {
  const status = await getSupabaseStatus();

  return (
    <AppShell title="Conversas" subtitle="Acompanhamento das interacoes por canal." status={status}>
      <section className="grid gap-4 lg:grid-cols-3">
        {demoConversations.map((conversation) => (
          <article key={conversation.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <MessageCircle size={19} />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-slate-900">{conversation.leadName}</h2>
                <p className="text-xs text-slate-500">
                  {conversation.channel} - {formatDateTime(conversation.updatedAt)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{conversation.lastMessage}</p>
            <div className="mt-4 inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
              {conversation.status}
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
