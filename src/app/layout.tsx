import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jablkoskup.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JablkoSkup.pl - skup iPhone, wycena online i szybka wypłata",
    template: "%s | JablkoSkup.pl"
  },
  description:
    "Skup iPhone online i Warszawa. Sprzedaj iPhone'a szybko i bezpiecznie, sprawdź wycenę, wyślij telefon i odbierz płatność po weryfikacji.",
  keywords: [
    "skup iphone",
    "skup iphone warszawa",
    "sprzedaj iphone",
    "kupimy iphone",
    "skup telefonów apple",
    "wycena iphone",
    "skup apple"
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "JablkoSkup.pl - sprzedaj iPhone'a szybko i bezpiecznie",
    description: "Wycena online, bezpieczna wysyłka, weryfikacja i płatność nawet tego samego dnia.",
    url: siteUrl,
    siteName: "JablkoSkup.pl",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/images/hero-iphone-buyback.png",
        width: 1680,
        height: 960,
        alt: "Nowoczesny skup iPhone'ów i wycena online"
      }
    ]
  },
  alternates: {
    canonical: siteUrl
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JablkoSkup.pl",
    url: siteUrl,
    logo: `${siteUrl}/images/hero-iphone-buyback.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+48 22 123 45 67",
      contactType: "customer service",
      areaServed: "PL",
      availableLanguage: ["pl"]
    },
    sameAs: ["https://www.facebook.com/jablkoskup", "https://www.instagram.com/jablkoskup"]
  };

  return (
    <html lang="pl" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
