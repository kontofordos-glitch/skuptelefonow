import Link from "next/link";

const links = [
  { href: "/jak-dziala-skup", label: "Jak działa skup" },
  { href: "/wycena-iphone", label: "Wycena iPhone" },
  { href: "/modele-iphone", label: "Modele iPhone" },
  { href: "/kontakt", label: "Kontakt i FAQ" },
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" }
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 text-base font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
              JS
            </span>
            <span>JablkoSkup.pl</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Skup iPhone&apos;ów online i stacjonarnie w Warszawie. Wycena, bezpieczna wysyłka,
            weryfikacja i szybka płatność.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 JablkoSkup.pl. Wszystkie prawa zastrzeżone.</p>
          <p>Przykładowy serwis produkcyjny gotowy pod wdrożenie Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
