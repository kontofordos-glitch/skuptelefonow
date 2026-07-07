import type { Metadata } from "next";
import { ValuationCalculator } from "@/components/valuation-calculator";

export const metadata: Metadata = {
  title: "Wycena iPhone online - sprawdź ile dostaniesz za telefon",
  description:
    "Wypełnij formularz wyceny iPhone online. Wybierz model, pojemność, stan, baterię i zostaw kontakt do potwierdzenia ceny skupu.",
  alternates: { canonical: "/wycena-iphone" }
};

export default function ValuationPage() {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Wycena iPhone online",
    url: "https://jablkoskup.pl/wycena-iphone",
    priceCurrency: "PLN",
    areaServed: "PL",
    itemOffered: {
      "@type": "Product",
      name: "Używany telefon Apple iPhone"
    }
  };

  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">Cennik i wycena online</p>
        <h1 className="section-title">Ile wart jest Twój iPhone?</h1>
        <p className="section-copy">
          Kalkulator pokazuje estymację dla fraz takich jak skup iPhone, wycena iPhone i kupimy iPhone.
          Finalna oferta zależy od weryfikacji urządzenia.
        </p>
        <div className="mt-10">
          <ValuationCalculator />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }} />
    </section>
  );
}
