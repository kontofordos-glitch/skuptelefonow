import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kontakt i FAQ - skup iPhone Warszawa",
  description:
    "Kontakt z iPhoneSkup.pl, skup iPhone Warszawa i online. Sprawdź odpowiedzi FAQ, adres punktu i dane kontaktowe.",
  alternates: { canonical: "/kontakt" }
};

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">Kontakt i FAQ</p>
        <h1 className="section-title">Porozmawiajmy o Twoim iPhonie</h1>
        <p className="section-copy">
          Pracujemy online w całej Polsce i stacjonarnie w Warszawie. Możesz zapytać o cenę,
          status przesyłki albo szczegóły weryfikacji.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Phone className="h-5 w-5 text-accent" />
              <CardTitle>Telefon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">+48 22 123 45 67</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Mail className="h-5 w-5 text-accent" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">kontakt@iphoneskup.pl</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MapPin className="h-5 w-5 text-accent" />
              <CardTitle>Punkt Warszawa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">ul. Prosta 20, 00-850 Warszawa</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">Najczęstsze pytania</h2>
            <div className="mt-5">
              <FaqList />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border bg-card">
            <iframe
              title="Mapa punktu iPhoneSkup.pl Warszawa"
              src="https://www.google.com/maps?q=Prosta%2020%20Warszawa&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
