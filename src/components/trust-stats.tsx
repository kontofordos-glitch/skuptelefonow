import { ShieldCheck, Star, WalletCards } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const stats = [
  { label: "kupionych iPhone'ów", value: "14 800+", icon: ShieldCheck },
  { label: "wypłacone klientom", value: formatCurrency(38_400_000), icon: WalletCards },
  { label: "średnia opinia", value: "4.9/5", icon: Star }
];

export function TrustStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-lg border bg-card p-5">
            <Icon className="h-5 w-5 text-accent" />
            <p className="mt-4 text-2xl font-semibold tracking-normal">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
