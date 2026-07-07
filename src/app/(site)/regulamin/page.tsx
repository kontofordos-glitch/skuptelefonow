import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin skupu iPhone",
  description: "Regulamin korzystania z serwisu JablkoSkup.pl, wyceny online, wysyłki i sprzedaży iPhone'a.",
  alternates: { canonical: "/regulamin" }
};

export default function TermsPage() {
  return (
    <section className="page-section">
      <div className="container max-w-3xl">
        <p className="section-eyebrow">Regulamin</p>
        <h1 className="section-title">Regulamin JablkoSkup.pl</h1>
        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <h2>1. Zakres usługi</h2>
          <p>
            Serwis umożliwia wstępną wycenę, przyjęcie zgłoszenia sprzedaży telefonu Apple iPhone,
            weryfikację urządzenia oraz przedstawienie finalnej oferty odkupu.
          </p>
          <h2>2. Wycena</h2>
          <p>
            Wycena online jest szacunkowa. Finalna cena zależy od zgodności opisu, stanu technicznego,
            kondycji baterii, blokad konta, historii napraw i kompletności akcesoriów.
          </p>
          <h2>3. Wysyłka i weryfikacja</h2>
          <p>
            Użytkownik powinien usunąć dane, wylogować iCloud oraz zabezpieczyć urządzenie do transportu.
            Po weryfikacji serwis przedstawia finalną ofertę, którą użytkownik może zaakceptować lub odrzucić.
          </p>
          <h2>4. Płatność</h2>
          <p>
            Płatność następuje po akceptacji finalnej oferty. Dostępne metody płatności mogą obejmować
            przelew bankowy lub BLIK.
          </p>
        </div>
      </div>
    </section>
  );
}
