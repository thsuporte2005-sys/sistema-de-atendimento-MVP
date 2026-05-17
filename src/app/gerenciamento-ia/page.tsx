import { Sidebar } from "@/components/Sidebar";
import { BrainCircuit, Clock, MessageSquare, UserCheck } from "lucide-react";

const activities = [
  {
    lead: "Mariana Alves",
    phone: "+55 85 99999-1001",
    time: "09:12",
    action: "Respondeu duvida sobre valores",
    status: "IA respondeu",
  },
  {
    lead: "Rafael Costa",
    phone: "+55 85 99999-1002",
    time: "10:28",
    action: "Identificou objeção de preco",
    status: "Em nutricao",
  },
  {
    lead: "Camila Rocha",
    phone: "+55 85 99999-1003",
    time: "11:04",
    action: "Lead pediu atendimento humano",
    status: "Humano acionado",
  },
];

export default function GerenciamentoIAPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-card px-8 py-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <BrainCircuit className="text-primary" />
            Gerenciamento da IA
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe atendimentos, respostas geradas e encaminhamentos para humano.
          </p>
        </header>

        <div className="space-y-8 p-8">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <MessageSquare className="mb-4 text-primary" />
              <p className="text-sm text-muted-foreground">Respostas geradas hoje</p>
              <strong className="mt-2 block text-3xl text-foreground">248</strong>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <Clock className="mb-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Tempo medio de resposta</p>
              <strong className="mt-2 block text-3xl text-foreground">18s</strong>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <UserCheck className="mb-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Enviados para humano</p>
              <strong className="mt-2 block text-3xl text-foreground">8</strong>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="border-b p-4">
              <h3 className="font-semibold text-foreground">Atividades recentes da IA</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Horario</th>
                  <th className="px-4 py-3 font-medium">Acao</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {activities.map((item) => (
                  <tr key={item.phone} className="hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{item.lead}</div>
                      <div className="text-xs text-muted-foreground">{item.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.time}</td>
                    <td className="px-4 py-3 text-foreground">{item.action}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
