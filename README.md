# iPhoneSkup.pl

Nowoczesna strona skupu iPhone'ów z panelem administracyjnym, kalkulatorem wyceny, SQLite/Prisma i responsywnym UI w stylu Apple.

## Stack

- Next.js 15 App Router, TypeScript
- Tailwind CSS i komponenty shadcn-style w `src/components/ui`
- Prisma + SQLite dla lokalnego startu
- NextAuth.js v5 Credentials: bcrypt, JWT session, opcjonalny TOTP
- Framer Motion, dark mode, JSON-LD, sitemap i robots

## Uruchomienie

```bash
npm install
npm run prisma:generate
npm run db:init
npm run prisma:seed
npm run dev
```

Domyślny panel: `http://localhost:3000/admin`

Konto seed:

- email: `admin@iphoneskup.pl`
- hasło: `Admin123!ChangeMe`

Przed wdrożeniem zmień `NEXTAUTH_SECRET`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` i uruchom seed ponownie.

## Najważniejsze ścieżki

- `/` - strona główna z hero, SEO i blokami zaufania
- `/wycena-iphone` - kalkulator i formularz leada
- `/modele-iphone` - karty modeli
- `/kontakt` - FAQ i Google Maps
- `/admin` - dashboard
- `/admin/zlecenia` - statusy zleceń
- `/admin/cennik` - edycja cen
- `/admin/tresci` - edycja treści hero i banerów
- `/admin/raporty` - CSV i Excel-kompatybilny XLS

## API

- `GET /api/prices`
- `POST /api/valuation`
- `GET|POST /api/auth/[...nextauth]`
- `PATCH /api/admin/leads/:id`
- `POST /api/admin/prices`
- `PATCH /api/admin/prices/:id`
- `POST /api/admin/content`
- `GET /api/admin/export?format=csv|xls`

## SEO

Projekt ma:

- meta title i description per kluczowa podstrona
- frazy: `skup iphone`, `skup iphone warszawa`, `sprzedaj iphone`, `kupimy iphone`, `skup telefonów apple`, `wycena iphone`
- JSON-LD `Organization` i `Offer`
- `sitemap.xml` i `robots.txt`
- lokalny obraz hero w `public/images/hero-iphone-buyback.png`
- lazy loading mapy i priorytet dla hero image

Zalecenia po wdrożeniu:

- Ustaw prawdziwy `NEXT_PUBLIC_SITE_URL`.
- Dodaj zweryfikowany profil Google Business Profile dla frazy `skup iPhone Warszawa`.
- Rozbuduj strony modelowe o osobne URL-e dla top modeli, np. `/modele-iphone/iphone-16-pro`.
- Dodaj realne opinie z datą, miejscowością i zgodą klienta.
- Monitoruj Core Web Vitals w Search Console.

## Bezpieczeństwo

Zaimplementowano:

- walidację Zod po stronie serwera
- NextAuth JWT session z czasem życia 8h
- bcrypt dla haseł
- opcjonalny sekret TOTP w modelu administratora
- origin guard dla mutacji API
- prosty rate limiting in-memory
- nagłówki bezpieczeństwa i CSP w middleware
- brak podatnej biblioteki `xlsx`; eksport XLS jest HTML table z właściwym MIME

Uwaga: `npm audit` dla Next 15.5.20 raportuje umiarkowane ostrzeżenie PostCSS wewnątrz paczki `next`. `npm audit fix --force` proponuje cofnięcie Next do starej, nieakceptowalnej wersji, więc należy aktualizować Next, gdy upstream opublikuje poprawkę. Użyta jest beta NextAuth v5, ponieważ stabilna linia v4 wnosiła dodatkowe ostrzeżenie audytu przez zależność `uuid`.

## Deployment Vercel

SQLite jest wygodne lokalnie, ale na Vercel zalecany jest PostgreSQL.

1. Utwórz bazę PostgreSQL.
2. Zmień `DATABASE_URL`.
3. Zmień `provider = "postgresql"` w `prisma/schema.prisma`.
4. Użyj migracji Prisma zamiast `db:init`.
5. Dodaj zmienne środowiskowe w Vercel.

Lokalny skrypt `db:init` istnieje jako szybkie, niezależne od `prisma db push` uruchomienie SQLite.
