"use client"

import { Sidebar } from '@/components/Sidebar';
import { 
  Users, 
  MessageCircle, 
  BrainCircuit,
  Flame,
  UserCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockChartData = [
  { name: 'Seg', novos: 40, quentes: 24, fechados: 10 },
  { name: 'Ter', novos: 30, quentes: 13, fechados: 5 },
  { name: 'Qua', novos: 50, quentes: 38, fechados: 15 },
  { name: 'Qui', novos: 27, quentes: 19, fechados: 8 },
  { name: 'Sex', novos: 65, quentes: 48, fechados: 20 },
  { name: 'Sáb', novos: 80, quentes: 60, fechados: 25 },
  { name: 'Dom', novos: 90, quentes: 75, fechados: 30 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="bg-card border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Visão geral do seu funil e atendimento IA</p>
          </div>
          
          <div className="flex items-center gap-6">
            <select className="bg-background border rounded-md px-3 py-1.5 text-sm">
              <option>Hoje</option>
              <option>Ontem</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Personalizado</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium">Motor IA Online</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              BL
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Novos Leads</p>
                  <h3 className="text-3xl font-bold text-foreground mt-2">382</h3>
                </div>
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Users size={24} />
                </div>
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-4">
                <TrendingUp size={12} /> +12% desde ontem
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Leads Quentes</p>
                  <h3 className="text-3xl font-bold text-foreground mt-2">145</h3>
                </div>
                <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
                  <Flame size={24} />
                </div>
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-4">
                <TrendingUp size={12} /> +5% desde ontem
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aguardando Humano</p>
                  <h3 className="text-3xl font-bold text-destructive mt-2">8</h3>
                </div>
                <div className="p-3 bg-destructive/10 text-destructive rounded-lg">
                  <UserCheck size={24} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Requerem atenção imediata
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Resposta IA</p>
                  <h3 className="text-3xl font-bold text-green-600 mt-2">97%</h3>
                </div>
                <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                  <BrainCircuit size={24} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                2,401 mensagens automáticas
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-card p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-foreground">Evolução dos Leads</h3>
                <select className="bg-background border rounded-md px-2 py-1 text-sm">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="novos" name="Novos Leads" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="quentes" name="Quentes" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="fechados" name="Fechados" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Smart Summary */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <BrainCircuit size={20} />
                <h3 className="text-lg font-semibold">Resumo do Dia (IA)</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="bg-card p-4 rounded-lg border text-sm">
                  <strong className="block text-foreground mb-1">Tendência de hoje:</strong>
                  <span className="text-muted-foreground">A maioria dos leads está perguntando sobre os valores e condições de parcelamento. Houve um pico de 15% em leads quentes após as 14h.</span>
                </div>
                
                <div className="bg-card p-4 rounded-lg border text-sm">
                  <strong className="block text-foreground mb-1 flex items-center gap-1">
                    <AlertCircle size={14} className="text-orange-500" />
                    Principais Objeções:
                  </strong>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                    <li>"Achei o valor um pouco alto"</li>
                    <li>"Preciso falar com meu sócio/marido"</li>
                    <li>"Qual o prazo de entrega?"</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border text-sm">
                  <strong className="block text-destructive mb-1 flex items-center gap-1">
                    <UserCheck size={14} />
                    Atenção Necessária:
                  </strong>
                  <span className="text-muted-foreground">8 leads pediram para falar com um humano por dúvidas técnicas complexas. <a href="/leads?filter=needs_human" className="text-primary hover:underline">Ver leads</a>.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
