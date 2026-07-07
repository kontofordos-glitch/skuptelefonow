const faqs = [
  {
    question: "Czy wycena online jest ostateczna?",
    answer:
      "To wstępna, uczciwa estymacja. Finalną cenę potwierdzamy po krótkiej weryfikacji stanu technicznego, baterii i blokad konta."
  },
  {
    question: "Jak wygląda wysyłka iPhone'a?",
    answer:
      "Po zaakceptowaniu wyceny wysyłamy etykietę kurierską. Przesyłka jest ubezpieczona, a status widzisz w panelu zlecenia."
  },
  {
    question: "Kiedy dostanę pieniądze?",
    answer:
      "Po pozytywnej weryfikacji wypłata trafia przelewem lub BLIK najczęściej tego samego dnia roboczego."
  },
  {
    question: "Czy skupujecie uszkodzone telefony?",
    answer:
      "Tak. Kupujemy też iPhone'y z pękniętym ekranem, zużytą baterią lub uszkodzoną obudową, o ile urządzenie można zweryfikować."
  }
];

export function FaqList() {
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-lg border bg-card p-5">
          <summary className="cursor-pointer list-none text-base font-semibold">
            <span className="inline-flex w-full items-center justify-between gap-4">
              {faq.question}
              <span className="text-xl font-light text-muted-foreground group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
