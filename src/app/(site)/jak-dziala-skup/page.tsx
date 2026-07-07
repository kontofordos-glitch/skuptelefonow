import type { Metadata } from "next";
import { Banknote, ClipboardCheck, PackageOpen, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Jak działa skup iPhone - wycena, wysyłka, weryfikacja, płatność",
  description:
    "Zobacz jak działa skup iPhone w iPhoneSkup.pl: wycena online, bezpieczna wysyłka, weryfikacja urządzenia i szybka płatność.",
  alternates: { canonical: "/jak-dziala-skup" }
};

const steps = [
  {
    title: "Wycena online",
    icon: ClipboardCheck,
    copy: "Podajesz model, pojemność, stan wizualny, techniczny, baterię i akcesoria. Otrzymujesz szacowaną cenę."
  },
  {
    title: "Wysyłka",
    icon: PackageOpen,
    copy: "Wysyłasz telefon kurierem z ubezpieczeniem albo rezerwujesz wizytę w punkcie w Warszawie."
  },
  {
    title: "Weryfikacja",
    icon: ShieldCheck,
    copy: "Technik sprawdza ekran, baterię, Face ID, aparat, blokady i zgodność danych z formularza."
  },
  {
    title: "Płatność",
    icon: Banknote,
    copy: "Akceptujesz finalną ofertę i otrzymujesz wypłatę przelewem lub BLIK. Możesz też odrzucić ofertę."
  }
];

export default function HowItWorksPage() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">Jak działa skup</p>
        <h1 className="section-title">Prosty proces, pełna kontrola statusu</h1>
        <p className="section-copy">
          Skup iPhone&apos;ów działa jak uporządkowane zlecenie serwisowe: najpierw estymacja,
          potem logistyka, weryfikacja i transparentna decyzja o płatności.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-sm font-semibold text-accent-foreground">
                      {index + 1}
                    </span>
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{step.copy}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
