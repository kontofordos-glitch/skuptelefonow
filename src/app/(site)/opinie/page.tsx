import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustStats } from "@/components/trust-stats";

export const metadata: Metadata = {
  title: "Opinie klientów - zaufany skup iPhone",
  description:
    "Opinie klientów JablkoSkup.pl. Sprawdź dlaczego klienci wybierają nasz skup iPhone online i skup iPhone Warszawa.",
  alternates: { canonical: "/opinie" }
};

const testimonials = [
  {
    name: "Marta, Warszawa",
    text: "Najpierw dostałam wycenę online, następnego dnia telefon był sprawdzony, a pieniądze przyszły BLIK-iem."
  },
  {
    name: "Tomasz, Łódź",
    text: "Cena po weryfikacji różniła się tylko o 40 zł, bo bateria była słabsza. Wszystko było jasno opisane."
  },
  {
    name: "Karolina, Gdańsk",
    text: "Bałam się wysyłki, ale etykieta i statusy były czytelne. Bardzo sprawny kontakt."
  }
];

export default function ReviewsPage() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">Opinie i zaufanie</p>
        <h1 className="section-title">Klienci wracają, bo proces jest przewidywalny</h1>
        <p className="section-copy">
          Liczby są ważne, ale w skupie elektroniki najważniejsze jest zaufanie: jasna cena, dobry kontakt i szybka wypłata.
        </p>

        <div className="mt-10">
          <TrustStats />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <CardHeader>
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
