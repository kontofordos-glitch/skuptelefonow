import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności JablkoSkup.pl: dane kontaktowe, dane z formularzy, cel przetwarzania i prawa użytkownika.",
  alternates: { canonical: "/polityka-prywatnosci" }
};

export default function PrivacyPage() {
  return (
    <section className="page-section">
      <div className="container max-w-3xl">
        <p className="section-eyebrow">Prywatność</p>
        <h1 className="section-title">Polityka prywatności</h1>
        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <h2>Administrator danych</h2>
          <p>
            Administratorem danych jest JablkoSkup.pl. Dane kontaktowe podane w formularzu służą do obsługi wyceny,
            kontaktu z klientem, realizacji sprzedaży i obowiązków księgowych.
          </p>
          <h2>Zakres danych</h2>
          <p>
            Przetwarzamy dane identyfikacyjne, kontaktowe, informacje o urządzeniu, historię statusów zlecenia
            oraz korespondencję dotyczącą wyceny.
          </p>
          <h2>Bezpieczeństwo</h2>
          <p>
            Formularze są walidowane po stronie serwera, panel administracyjny wymaga logowania, a sesje są
            przechowywane w ciasteczkach HTTP-only.
          </p>
          <h2>Prawa użytkownika</h2>
          <p>
            Użytkownik może żądać dostępu do danych, sprostowania, ograniczenia przetwarzania lub usunięcia,
            o ile nie koliduje to z obowiązkami prawnymi administratora.
          </p>
        </div>
      </div>
    </section>
  );
}
