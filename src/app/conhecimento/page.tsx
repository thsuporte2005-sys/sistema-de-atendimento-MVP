import { BookOpen } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { demoKnowledgeBase } from "@/lib/demo-data";
import { getSupabaseStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ConhecimentoPage() {
  const status = await getSupabaseStatus();

  return (
    <AppShell title="Base de conhecimento" subtitle="Conteudos usados para orientar respostas da IA." status={status}>
      <section className="grid gap-4 lg:grid-cols-3">
        {demoKnowledgeBase.map((item) => (
          <article key={item.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <BookOpen size={19} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{item.title}</h2>
                <p className="text-xs uppercase text-slate-500">{item.category}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{item.content}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
