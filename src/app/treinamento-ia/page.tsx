import { Sidebar } from "@/components/Sidebar";
import { BookOpen, CheckCircle2, GraduationCap, ShieldAlert } from "lucide-react";

const rules = [
  "Responder com tom consultivo, claro e humano.",
  "Confirmar a necessidade do lead antes de oferecer uma solucao.",
  "Enviar para humano quando houver duvida tecnica, reclamacao ou pedido direto.",
];

const approvedAnswers = [
  "Entendi sua duvida. Vou te explicar de forma simples e, se fizer sentido, ja deixo o proximo passo encaminhado.",
  "Para te passar uma orientacao correta, preciso confirmar alguns detalhes rapidos com voce.",
  "Nesse caso e melhor um especialista continuar o atendimento para nao deixar passar nenhum detalhe.",
];

export default function TreinamentoIAPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-card px-8 py-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <GraduationCap className="text-primary" />
            Treinamento da IA
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure tom de voz, regras, funil, palavras proibidas e respostas aprovadas.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 p-8 xl:grid-cols-3">
          <section className="space-y-6 xl:col-span-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                <BookOpen size={18} className="text-primary" />
                Orientacoes principais
              </h3>
              <textarea
                className="min-h-40 w-full rounded-lg border bg-background p-4 text-sm outline-none ring-primary focus:ring-2"
                defaultValue="A IA deve atuar como uma atendente comercial experiente, entendendo a necessidade do lead, respondendo com clareza e conduzindo para o proximo passo sem prometer o que a empresa nao pode cumprir."
              />
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                <CheckCircle2 size={18} className="text-green-500" />
                Respostas aprovadas
              </h3>
              <div className="space-y-3">
                {approvedAnswers.map((answer) => (
                  <div key={answer} className="rounded-lg border bg-muted/30 p-4 text-sm text-foreground">
                    {answer}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-foreground">Regras ativas</h3>
              <div className="space-y-3">
                {rules.map((rule) => (
                  <div key={rule} className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-destructive">
                <ShieldAlert size={18} />
                Palavras proibidas
              </h3>
              <div className="flex flex-wrap gap-2">
                {["garantido", "milagre", "sem risco", "resultado certo"].map((word) => (
                  <span key={word} className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
