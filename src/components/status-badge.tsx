import type { LeadTemperature } from "@/lib/demo-data";

const temperatureClasses: Record<LeadTemperature, string> = {
  frio: "bg-slate-100 text-slate-700",
  morno: "bg-amber-50 text-amber-700",
  quente: "bg-red-50 text-red-700",
};

export function TemperatureBadge({ value }: { value: LeadTemperature }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${temperatureClasses[value]}`}>
      {value}
    </span>
  );
}

export function HumanBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
        active ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {active ? "humano" : "ia"}
    </span>
  );
}
