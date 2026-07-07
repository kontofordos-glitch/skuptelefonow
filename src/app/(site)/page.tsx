import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Banknote, ClipboardCheck, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionSection } from "@/components/motion-section";
import { RecentlyBought } from "@/components/recently-bought";
import { TrustStats } from "@/components/trust-stats";
import { ValuationCalculator } from "@/components/valuation-calculator";
import { getContentBlocks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skup iPhone Warszawa i online - sprzedaj iPhone'a szybko",
  description:
    "JablkoSkup.pl to skup iPhone Warszawa i online. Sprawdź wycenę iPhone, wyślij telefon, przejdź weryfikację i odbierz szybką płatność.",
  alternates: { canonical: "/" }
};

const steps = [
  { title: "Wycena online", copy: "Wybierasz model, pojemność, stan i baterię. Estymację widzisz od razu.", icon: ClipboardCheck },
  { title: "Wysyłka lub punkt", copy: "Kurier z ubezpieczeniem albo osobista wizyta w Warszawie.", icon: Truck },
  { title: "Weryfikacja", copy: "Sprawdzamy stan, blokady, numer seryjny i zgodność opisu.", icon: ShieldCheck },
  { title: "Płatność", copy: "Po akceptacji finalnej ceny wypłacamy przelewem lub BLIK.", icon: Banknote }
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContentBlocks({
    hero_title: "Sprzedaj iPhone'a szybko i bezpiecznie",
    hero_subtitle:
      "JablkoSkup.pl wycenia, odbiera, weryfikuje i wypłaca pieniądze bez przeciągania. Online, kuriersko albo w punkcie w Warszawie.",
    trust_banner: "Ponad 14 800 kupionych iPhone'ów, 38 mln zł wypłat i średnia ocena 4.9/5."
  });

  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Skup iPhone i wycena online",
    url: "https://jablkoskup.pl/wycena-iphone",
    areaServed: ["Polska", "Warszawa"],
    priceCurrency: "PLN",
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Product",
      name: "Używany iPhone"
    }
  };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b">
        <Image
          src="/images/hero-iphone-buyback.png"
          alt="Premium skup iPhone'ów online"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.9)_58%,rgba(255,255,255,0.58))] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.95),rgba(255,255,255,0.76)_38%,rgba(255,255,255,0.18)_74%)]" />
        <div className="container flex min-h-[78svh] items-center py-14">
          <div className="max-w-3xl">
            <Badge variant="outline" className="bg-white/80 text-slate-900">
              Skup iPhone Warszawa i cała Polska
            </Badge>
            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              {content.hero_title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              {content.hero_subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/wycena-iphone">
                  Wyceń iPhone&apos;a <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/70 text-slate-950">
                <Link href="/jak-dziala-skup">Jak działa skup</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <MotionSection>
            <p className="section-eyebrow">Proces</p>
            <h2 className="section-title">Od wyceny do wypłaty w czterech jasnych krokach</h2>
            <p className="section-copy">
              Wycena iPhone&apos;a online nie musi oznaczać niepewności. Każdy etap ma status, historię i konkretną osobę
              po stronie obsługi.
            </p>
          </MotionSection>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <MotionSection key={step.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <Icon className="h-6 w-6 text-accent" />
                      <CardTitle className="mt-5">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-muted-foreground">{step.copy}</p>
                    </CardContent>
                  </Card>
                </MotionSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/45 py-14">
        <div className="container">
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">{content.trust_banner}</p>
          <TrustStats />
        </div>
      </section>

      <section className="page-section">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <MotionSection>
            <p className="section-eyebrow">Wycena iPhone</p>
            <h2 className="section-title">Sprawdź cenę przed wysyłką</h2>
            <p className="section-copy">
              Kalkulator bazuje na przykładowym cenniku w panelu administracyjnym i uwzględnia stan wizualny,
              techniczny, baterię oraz akcesoria.
            </p>
          </MotionSection>
          <RecentlyBought />
          <div className="lg:col-span-2">
            <ValuationCalculator compact />
          </div>
        </div>
      </section>

      <section className="page-section border-t bg-secondary/35">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-eyebrow">Zaufanie</p>
            <h2 className="section-title">Kupimy iPhone&apos;a bez ukrytych potrąceń</h2>
            <p className="section-copy">
              Finalna oferta zawsze zawiera powód ewentualnej korekty. Nie blokujemy telefonu tygodniami,
              nie zmieniamy ceny bez dokumentacji i nie wymagamy sprzedaży po weryfikacji.
            </p>
            <Button asChild className="mt-7" variant="outline">
              <Link href="/opinie">Zobacz opinie klientów</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Weryfikacja blokady iCloud",
              "Protokół stanu urządzenia",
              "Ubezpieczona wysyłka",
              "Eksport statusów dla administracji"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <PackageCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }} />
    </>
  );
}
