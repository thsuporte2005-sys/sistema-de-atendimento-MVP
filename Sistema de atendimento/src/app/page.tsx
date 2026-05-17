import Link from 'next/link';
import { 
  Users, 
  MessageCircle, 
  Settings, 
  BookOpen, 
  AlertTriangle,
  BrainCircuit,
  Activity,
  Flame,
  UserCheck
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            Atendimento IA
          </h1>
          <p className="text-xs text-slate-500 mt-1">MVP Version 1.0</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 bg-slate-100 text-slate-900 rounded-md">
            <Activity size={20} /> Dashboard
          </Link>
          <Link href="/leads" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Users size={20} /> Leads
          </Link>
          <Link href="/conversas" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <MessageCircle size={20} /> Conversas
          </Link>
          <Link href="/conhecimento" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <BookOpen size={20} /> Base de Conhecimento
          </Link>
          <Link href="/objecoes" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <AlertTriangle size={20} /> Objeções
          </Link>
        </nav>
        
        <div className="p-4 border-t">
          <Link href="/configuracoes" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            <Settings size={20} /> Configurações
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium">IA Ativa</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total de Leads</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">1,248</h3>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Users size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Leads Quentes</p>
                  <h3 className="text-3xl font-bold text-slate-800 mt-2">86</h3>
                </div>
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                  <Flame size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Aguardando Humano</p>
                  <h3 className="text-3xl font-bold text-red-600 mt-2">12</h3>
                </div>
                <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                  <UserCheck size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Taxa de Resposta IA</p>
                  <h3 className="text-3xl font-bold text-green-600 mt-2">94%</h3>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <BrainCircuit size={24} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl border shadow-sm flex flex-col items-center justify-center py-16">
             <MessageCircle className="text-slate-300 w-16 h-16 mb-4" />
             <h3 className="text-xl font-semibold text-slate-700">Selecione um lead para iniciar o atendimento</h3>
             <p className="text-slate-500 mt-2 text-center max-w-md">
               Acesse o menu "Leads" para visualizar a lista, abrir as conversas e simular o fluxo com a IA.
             </p>
             <Link href="/leads" className="mt-6 px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors">
               Ir para Leads
             </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
