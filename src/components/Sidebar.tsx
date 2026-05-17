"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  MessageCircle, 
  Settings, 
  BookOpen, 
  AlertTriangle,
  BrainCircuit,
  Activity,
  BarChart,
  Smartphone,
  GraduationCap
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: Activity },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/conversas', label: 'Conversas', icon: MessageCircle },
    { href: '/whatsapp', label: 'WhatsApp', icon: Smartphone },
    { href: '/gerenciamento-ia', label: 'Gerenciamento da IA', icon: BrainCircuit },
    { href: '/relatorios', label: 'Relatórios', icon: BarChart },
    { href: '/conhecimento', label: 'Base de Conhecimento', icon: BookOpen },
    { href: '/treinamento-ia', label: 'Treinamento da IA', icon: GraduationCap },
    { href: '/objecoes', label: 'Objeções', icon: AlertTriangle },
  ];

  return (
    <aside className="w-64 bg-background border-r flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          Bussines Leads
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Plataforma Profissional</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon size={18} /> {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t space-y-4">
        <Link 
          href="/configuracoes" 
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            pathname === '/configuracoes'
              ? 'bg-primary/10 text-primary font-medium' 
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <Settings size={18} /> Configurações
        </Link>
        <ThemeToggle />
      </div>
    </aside>
  );
}
