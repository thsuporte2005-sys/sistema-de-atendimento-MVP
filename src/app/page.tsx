import { BrainCircuit, Flame, MessageCircle, UserCheck, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { HumanBadge, TemperatureBadge } from "@/components/status-badge";
import { demoConversations, demoLeads, formatDateTime, getDashboardMetrics } from "@/lib/demo-data";
import { getSupabaseStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const status = await getSupabaseStatus();
  const metrics = getDashboardMetrics();
  const recentLeads = demoLeads.slice(0, 4);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Operacao de atendimento, leads e IA em um unico painel."
      status={status}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Total de leads" value={String(metrics.totalLeads)} tone="blue" icon={Users} />
          <MetricCard title="Leads quentes" value={String(metrics.hotLeads)} tone="orange" icon={Flame} />
          <MetricCard title="Aguardando humano" value={String(metrics.needsHuman)} tone="red" icon={UserCheck} />
          <MetricCard title="Taxa de resposta IA" value={`${metrics.aiResponseRate}%`} tone="green" icon={BrainCircuit} />
        </div>

        <section className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Fila de leads</h2>
              <p className="text-sm text-slate-500">{status.message}</p>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3 pr-4 font-semibold">Lead</th>
                  <th className="px-4 py-3 font-semibold">Dor principal</th>
                  <th className="px-4 py-3 font-semibold">Funil</th>
                  <th className="px-4 py-3 font-semibold">Temperatura</th>
                  <th className="px-4 py-3 font-semibold">Atendimento</th>
                  <th className="py-3 pl-4 font-semibold">Criado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="align-top">
                    <td className="py-4 pr-4 font-medium text-slate-900">{lead.name}</td>
                    <td className="px-4 py-4 text-slate-600">{lead.mainPain}</td>
                    <td className="px-4 py-4 text-slate-600">{lead.funnelStage}</td>
                    <td className="px-4 py-4">
                      <TemperatureBadge value={lead.temperature} />
                    </td>
                    <td className="px-4 py-4">
                      <HumanBadge active={lead.needsHuman} />
                    </td>
                    <td className="py-4 pl-4 text-slate-500">{formatDateTime(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Conversas recentes</h2>
            <div className="mt-4 space-y-3">
              {demoConversations.map((conversation) => (
                <div key={conversation.id} className="flex gap-3 rounded-lg border p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <MessageCircle size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-medium text-slate-900">{conversation.leadName}</p>
                      <p className="text-xs text-slate-500">{formatDateTime(conversation.updatedAt)}</p>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Proximo passo</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              O banco esta criado e protegido por RLS. Para exibir dados reais do Supabase na interface publica,
              habilite uma politica de leitura controlada ou forneca uma chave server-side segura na Vercel.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
