import { CheckCircle2, KeyRound, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getSupabaseStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ConfiguracoesPage() {
  const status = await getSupabaseStatus();

  return (
    <AppShell title="Configuracoes" subtitle="Saude das integracoes principais." status={status}>
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className={status.reachable ? "text-emerald-600" : "text-amber-600"} size={22} />
            <h2 className="font-semibold text-slate-900">Supabase</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{status.message}</p>
          <p className="mt-3 break-all text-xs text-slate-500">{status.projectUrl}</p>
        </section>

        <section className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={22} />
            <h2 className="font-semibold text-slate-900">RLS</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            As tabelas foram criadas com Row Level Security ativo. A leitura publica de dados reais precisa
            de aprovacao explicita para nao expor informacoes de leads.
          </p>
        </section>

        <section className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <KeyRound className="text-slate-700" size={22} />
            <h2 className="font-semibold text-slate-900">OpenAI</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A API responde com fallback seguro se `OPENAI_API_KEY` ainda nao estiver configurada na Vercel.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
