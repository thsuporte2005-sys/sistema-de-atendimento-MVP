import { AppShell } from "@/components/app-shell";
import { HumanBadge, TemperatureBadge } from "@/components/status-badge";
import { demoLeads, formatDateTime } from "@/lib/demo-data";
import { getSupabaseStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const status = await getSupabaseStatus();

  return (
    <AppShell title="Leads" subtitle="Lista operacional para priorizar atendimento." status={status}>
      <section className="rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Nome</th>
                <th className="px-5 py-3 font-semibold">Resumo</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Temperatura</th>
                <th className="px-5 py-3 font-semibold">Atendimento</th>
                <th className="px-5 py-3 font-semibold">Criado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {demoLeads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="px-5 py-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="max-w-md px-5 py-4 text-slate-600">{lead.internalSummary}</td>
                  <td className="px-5 py-4 text-slate-600">{lead.status}</td>
                  <td className="px-5 py-4">
                    <TemperatureBadge value={lead.temperature} />
                  </td>
                  <td className="px-5 py-4">
                    <HumanBadge active={lead.needsHuman} />
                  </td>
                  <td className="px-5 py-4 text-slate-500">{formatDateTime(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
