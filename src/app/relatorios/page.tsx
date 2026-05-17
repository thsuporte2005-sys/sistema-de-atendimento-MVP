import { Sidebar } from "@/components/Sidebar";
import { BarChart, BrainCircuit, MessageCircle, Target, Users } from "lucide-react";

const metrics = [
  { label: "Leads captados", value: "382", icon: Users, tone: "text-blue-500" },
  { label: "Mensagens trocadas", value: "2.401", icon: MessageCircle, tone: "text-green-500" },
  { label: "Atendimentos IA", value: "1.928", icon: BrainCircuit, tone: "text-primary" },
  { label: "Fechamentos", value: "64", icon: Target, tone: "text-orange-500" },
];

const objections = ["Valor alto", "Preciso pensar", "Falar com socio", "Prazo de entrega"];
const pains = ["Demora no atendimento", "Falta de previsibilidade", "Perda de leads", "Equipe sobrecarregada"];

export default function RelatoriosPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-8 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
              <BarChart className="text-primary" />
              Relatorios
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Visao diaria de leads, IA, humanos, fechamentos, objeções e dores comuns.
            </p>
          </div>
          <select className="rounded-md border bg-background px-3 py-2 text-sm">
            <option>Hoje</option>
            <option>Ontem</option>
            <option>Ultimos 7 dias</option>
            <option>Ultimos 30 dias</option>
          </select>
        </header>

        <div className="space-y-8 p-8">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="rounded-xl border bg-card p-6 shadow-sm">
                  <Icon className={metric.tone} />
                  <p className="mt-4 text-sm text-muted-foreground">{metric.label}</p>
                  <strong className="mt-2 block text-3xl text-foreground">{metric.value}</strong>
                </div>
              );
            })}
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-foreground">Objeções mais comuns</h3>
              <div className="space-y-3">
                {objections.map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                    <span className="text-sm text-foreground">{item}</span>
                    <span className="text-sm font-semibold text-primary">{28 - index * 5}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-foreground">Dores mais relatadas</h3>
              <div className="space-y-3">
                {pains.map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                    <span className="text-sm text-foreground">{item}</span>
                    <span className="text-sm font-semibold text-primary">{31 - index * 4}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
