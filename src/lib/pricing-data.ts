export const conditionLabels = {
  EXCELLENT: "Idealny",
  GOOD: "Bardzo dobry",
  FAIR: "Widoczne ślady",
  DAMAGED: "Uszkodzony"
} as const;

export const leadStatusLabels = {
  NEW: "Nowy",
  SENT: "Wysłany",
  RECEIVED: "Odebrany",
  VERIFIED: "Zweryfikowany",
  PAID: "Opłacony",
  REJECTED: "Odrzucony"
} as const;

export const leadStatusTone = {
  NEW: "default",
  SENT: "info",
  RECEIVED: "info",
  VERIFIED: "warning",
  PAID: "success",
  REJECTED: "destructive"
} as const;

export const publicModels = [
  {
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    priceFrom: 3650,
    priceTo: 5900,
    badges: ["Nowość", "Najwyższa wycena"]
  },
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    priceFrom: 3260,
    priceTo: 5350,
    badges: ["Nowość", "Pro"]
  },
  {
    name: "iPhone 17",
    slug: "iphone-17",
    priceFrom: 2420,
    priceTo: 4100,
    badges: ["Nowość", "Szybka wycena"]
  },
  {
    name: "iPhone 16 Pro Max",
    slug: "iphone-16-pro-max",
    priceFrom: 2950,
    priceTo: 4900,
    badges: ["Top cena", "1 TB"]
  },
  {
    name: "iPhone 16 Pro",
    slug: "iphone-16-pro",
    priceFrom: 2600,
    priceTo: 4400,
    badges: ["Najczęściej wybierany", "Pro"]
  },
  {
    name: "iPhone 16",
    slug: "iphone-16",
    priceFrom: 1950,
    priceTo: 3220,
    badges: ["Szybka wycena"]
  },
  {
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    priceFrom: 2310,
    priceTo: 4420,
    badges: ["Premium"]
  },
  {
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    priceFrom: 2000,
    priceTo: 3970,
    badges: ["Dobry popyt"]
  },
  {
    name: "iPhone 15",
    slug: "iphone-15",
    priceFrom: 1500,
    priceTo: 2570,
    badges: ["Popularny"]
  },
  {
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    priceFrom: 1430,
    priceTo: 2470,
    badges: ["ProMotion"]
  },
  {
    name: "iPhone 14",
    slug: "iphone-14",
    priceFrom: 1010,
    priceTo: 1670,
    badges: ["Wysyłka 24h"]
  },
  {
    name: "iPhone 13",
    slug: "iphone-13",
    priceFrom: 770,
    priceTo: 1320,
    badges: ["Stały skup"]
  },
  {
    name: "iPhone 12",
    slug: "iphone-12",
    priceFrom: 530,
    priceTo: 980,
    badges: ["Także uszkodzone"]
  }
];

export const recentlyBought = [
  { model: "iPhone 17 Pro Max 256 GB", city: "Warszawa", price: 5480, time: "7 min temu" },
  { model: "iPhone 17 Pro 256 GB", city: "Kraków", price: 4990, time: "16 min temu" },
  { model: "iPhone 16 Pro Max 256 GB", city: "Warszawa", price: 4580, time: "12 min temu" },
  { model: "iPhone 15 Pro 512 GB", city: "Wrocław", price: 3180, time: "28 min temu" },
  { model: "iPhone 14 Pro 128 GB", city: "Gdańsk", price: 2040, time: "47 min temu" },
  { model: "iPhone 13 128 GB", city: "Poznań", price: 1120, time: "1 godz. temu" }
];

export const defaultPriceMatrix = [
  { model: "iPhone 17 Pro Max", slug: "iphone-17-pro-max", capacity: "256 GB", condition: "EXCELLENT", price: 5200 },
  { model: "iPhone 17 Pro Max", slug: "iphone-17-pro-max", capacity: "256 GB", condition: "GOOD", price: 4520 },
  { model: "iPhone 17 Pro Max", slug: "iphone-17-pro-max", capacity: "256 GB", condition: "FAIR", price: 3640 },
  { model: "iPhone 17 Pro", slug: "iphone-17-pro", capacity: "256 GB", condition: "EXCELLENT", price: 4870 },
  { model: "iPhone 17 Pro", slug: "iphone-17-pro", capacity: "256 GB", condition: "GOOD", price: 4240 },
  { model: "iPhone 17", slug: "iphone-17", capacity: "128 GB", condition: "EXCELLENT", price: 3450 },
  { model: "iPhone 17", slug: "iphone-17", capacity: "128 GB", condition: "GOOD", price: 3000 },
  { model: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", capacity: "256 GB", condition: "EXCELLENT", price: 4200 },
  { model: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", capacity: "256 GB", condition: "GOOD", price: 3650 },
  { model: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", capacity: "256 GB", condition: "FAIR", price: 2940 },
  { model: "iPhone 16 Pro", slug: "iphone-16-pro", capacity: "256 GB", condition: "EXCELLENT", price: 3920 },
  { model: "iPhone 16 Pro", slug: "iphone-16-pro", capacity: "256 GB", condition: "GOOD", price: 3410 },
  { model: "iPhone 16", slug: "iphone-16", capacity: "128 GB", condition: "EXCELLENT", price: 2800 },
  { model: "iPhone 15 Pro", slug: "iphone-15-pro", capacity: "256 GB", condition: "GOOD", price: 2670 },
  { model: "iPhone 15", slug: "iphone-15", capacity: "128 GB", condition: "GOOD", price: 1870 },
  { model: "iPhone 14 Pro", slug: "iphone-14-pro", capacity: "128 GB", condition: "GOOD", price: 1780 },
  { model: "iPhone 13", slug: "iphone-13", capacity: "128 GB", condition: "GOOD", price: 960 }
];

export type PublicPriceItem = (typeof defaultPriceMatrix)[number];
