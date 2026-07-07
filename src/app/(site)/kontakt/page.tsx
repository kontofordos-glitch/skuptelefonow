import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { LiveChat } from "@/components/contact/live-chat";
import { FaqList } from "@/components/faq-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kontakt i FAQ - skup iPhone Warszawa",
  description:
    "Kontakt z JablkoSkup.pl, skup iPhone Warszawa i online. Telefon, email, formularz kontaktowy, live chat i odpowiedzi FAQ.",
  alternates: { canonical: "/kontakt" }
};

const contactMethods = [
  {
    title: "Telefon",
    value: "+48 22 123 45 67",
    copy: "Najszybsza ścieżka dla pilnych wycen i statusów płatności.",
    icon: Phone
  },
  {
    title: "Email",
    value: "kontakt@jablkoskup.pl",
    copy: "Wyślij zdjęcia telefonu, opis stanu albo pytanie o finalną ofertę.",
    icon: Mail
  },
  {
    title: "Formularz",
    value: "Odpowiedź tego samego dnia",
    copy: "Zostaw dane kontaktowe i wiadomość bezpośrednio na stronie.",
    icon: MessageCircle
  }
];

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">Kontakt i FAQ</p>
        <h1 className="section-title">Skontaktuj się z JablkoSkup.pl</h1>
        <p className="section-copy">
          Pracujemy online w całej Polsce i stacjonarnie w Warszawie. Możesz zapytać o cenę,
          status przesyłki, płatność albo szczegóły weryfikacji iPhone&apos;a.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title}>
                <CardHeader>
                  <Icon className="h-5 w-5 text-accent" />
                  <CardTitle>{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base font-semibold">{method.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{method.copy}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ContactForm />
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <MapPin className="h-5 w-5 text-accent" />
                <CardTitle>Punkt Warszawa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">ul. Prosta 20, 00-850 Warszawa</p>
                <p className="mt-2 text-sm text-muted-foreground">Poniedziałek-piątek, 9:00-18:00</p>
              </CardContent>
            </Card>
            <div className="overflow-hidden rounded-lg border bg-card">
              <iframe
                title="Mapa punktu JablkoSkup.pl Warszawa"
                src="https://www.google.com/maps?q=Prosta%2020%20Warszawa&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold tracking-normal">Najczęstsze pytania</h2>
          <div className="mt-5">
            <FaqList />
          </div>
        </div>
      </div>
      <LiveChat />
    </section>
  );
}
