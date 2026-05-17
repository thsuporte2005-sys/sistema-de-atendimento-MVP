import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  tone: "blue" | "orange" | "red" | "green";
  icon: LucideIcon;
};

const toneClasses = {
  blue: "bg-blue-50 text-blue-700",
  orange: "bg-orange-50 text-orange-700",
  red: "bg-red-50 text-red-700",
  green: "bg-emerald-50 text-emerald-700",
};

export function MetricCard({ title, value, tone, icon: Icon }: MetricCardProps) {
  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-normal text-slate-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon size={22} />
        </div>
      </div>
    </section>
  );
}
