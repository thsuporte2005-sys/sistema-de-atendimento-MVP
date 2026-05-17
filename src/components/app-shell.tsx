"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import type { SupabaseStatus } from "@/lib/supabase";

const navItems = [
  { href: "/", label: "Dashboard", icon: Activity },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/conversas", label: "Conversas", icon: MessageCircle },
  { href: "/conhecimento", label: "Base", icon: BookOpen },
  { href: "/objecoes", label: "Objecoes", icon: AlertTriangle },
  { href: "/configuracoes", label: "Configuracoes", icon: Settings },
];

type AppShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  status?: SupabaseStatus;
};

export function AppShell({ children, title, subtitle, status }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 lg:flex">
      <aside className="border-b bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
        <div className="border-b px-5 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BrainCircuit size={22} />
            </span>
            <span>
              <span className="block text-lg font-bold">Atendimento IA</span>
              <span className="block text-xs text-slate-500">MVP operacional</span>
            </span>
          </Link>
        </div>

        <nav className="grid gap-1 p-3 sm:grid-cols-3 lg:grid-cols-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="border-b bg-white px-5 py-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-normal text-slate-900">
                {title}
              </h1>
              {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
            </div>

            {status ? (
              <div className="flex max-w-full items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <CheckCircle2
                  size={18}
                  className={status.reachable ? "text-emerald-600" : "text-amber-600"}
                />
                <span className="truncate">
                  {status.reachable ? "Supabase conectado" : "Supabase pendente"}
                </span>
              </div>
            ) : null}
          </div>
        </header>

        <div className="px-5 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
