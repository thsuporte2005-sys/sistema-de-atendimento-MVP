import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { demoObjections } from "@/lib/demo-data";
import { getSupabaseStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ObjecoesPage() {
  const status = await getSupabaseStatus();

  return (
    <AppShell title="Objecoes" subtitle="Respostas base para duvidas frequentes dos leads." status={status}>
      <section className="space-y-4">
        {demoObjections.map((item) => (
          <article key={item.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                <AlertTriangle size={19} />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.triggerKeywords}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{item.responseTemplate}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
