import { PrismaClient, DeviceCondition, LeadStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";

const prisma = new PrismaClient();

const models = [
  { model: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", base: 4200, capacities: ["256 GB", "512 GB", "1 TB"] },
  { model: "iPhone 16 Pro", slug: "iphone-16-pro", base: 3700, capacities: ["128 GB", "256 GB", "512 GB", "1 TB"] },
  { model: "iPhone 16", slug: "iphone-16", base: 2800, capacities: ["128 GB", "256 GB", "512 GB"] },
  { model: "iPhone 15 Pro Max", slug: "iphone-15-pro-max", base: 3300, capacities: ["256 GB", "512 GB", "1 TB"] },
  { model: "iPhone 15 Pro", slug: "iphone-15-pro", base: 2850, capacities: ["128 GB", "256 GB", "512 GB", "1 TB"] },
  { model: "iPhone 15", slug: "iphone-15", base: 2150, capacities: ["128 GB", "256 GB", "512 GB"] },
  { model: "iPhone 14 Pro", slug: "iphone-14-pro", base: 2050, capacities: ["128 GB", "256 GB", "512 GB"] },
  { model: "iPhone 14", slug: "iphone-14", base: 1450, capacities: ["128 GB", "256 GB"] },
  { model: "iPhone 13", slug: "iphone-13", base: 1100, capacities: ["128 GB", "256 GB"] },
  { model: "iPhone 12", slug: "iphone-12", base: 760, capacities: ["64 GB", "128 GB"] }
];

const conditionMultipliers: Record<DeviceCondition, number> = {
  EXCELLENT: 1,
  GOOD: 0.87,
  FAIR: 0.7,
  DAMAGED: 0.42
};

function capacityBonus(capacity: string) {
  if (capacity === "1 TB") return 700;
  if (capacity === "512 GB") return 420;
  if (capacity === "256 GB") return 220;
  return 0;
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@iphoneskup.pl";
  const password = process.env.ADMIN_PASSWORD ?? "Admin123!ChangeMe";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Administrator iPhoneSkup",
      passwordHash
    },
    create: {
      email,
      name: "Administrator iPhoneSkup",
      passwordHash,
      twoFactorSecret: authenticator.generateSecret(),
      twoFactorEnabled: false
    }
  });
}

async function seedPrices() {
  for (const item of models) {
    for (const capacity of item.capacities) {
      for (const condition of Object.values(DeviceCondition)) {
        const price = Math.round((item.base + capacityBonus(capacity)) * conditionMultipliers[condition] / 10) * 10;
        await prisma.priceItem.upsert({
          where: {
            model_capacity_condition: {
              model: item.model,
              capacity,
              condition
            }
          },
          update: {
            slug: item.slug,
            price,
            isActive: true
          },
          create: {
            model: item.model,
            slug: item.slug,
            capacity,
            condition,
            price
          }
        });
      }
    }
  }
}

async function seedContent() {
  const blocks = [
    {
      key: "hero_title",
      title: "Nagłówek hero",
      value: "Sprzedaj iPhone'a szybko i bezpiecznie"
    },
    {
      key: "hero_subtitle",
      title: "Opis hero",
      value: "Wypełnij wycenę online, wyślij telefon kurierem lub odwiedź punkt w Warszawie. Po weryfikacji płacimy nawet tego samego dnia."
    },
    {
      key: "trust_banner",
      title: "Pasek zaufania",
      value: "Ponad 14 800 kupionych iPhone'ów, 38 mln zł wypłat i średnia ocena 4.9/5."
    },
    {
      key: "faq_shipping",
      title: "FAQ wysyłka",
      value: "Wysyłka jest ubezpieczona i opłacona przez iPhoneSkup.pl. Etykietę otrzymasz po zaakceptowaniu wstępnej wyceny."
    }
  ];

  for (const block of blocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: block,
      create: block
    });
  }
}

async function seedLeads() {
  const sampleLeads = [
    {
      valuationNumber: "ISK-2026-1041",
      model: "iPhone 15 Pro",
      capacity: "256 GB",
      visualCondition: "GOOD",
      technicalCondition: "EXCELLENT",
      batteryHealth: 91,
      accessories: "box,cable",
      estimatedPrice: 2670,
      finalPrice: 2640,
      status: LeadStatus.PAID,
      contactName: "Marta Lewandowska",
      email: "marta@example.com",
      phone: "+48 501 221 104",
      city: "Warszawa",
      notes: "Szybka wypłata BLIK."
    },
    {
      valuationNumber: "ISK-2026-1042",
      model: "iPhone 16",
      capacity: "128 GB",
      visualCondition: "EXCELLENT",
      technicalCondition: "EXCELLENT",
      batteryHealth: 98,
      accessories: "box,cable,receipt",
      estimatedPrice: 2800,
      status: LeadStatus.VERIFIED,
      contactName: "Adam Nowak",
      email: "adam@example.com",
      phone: "+48 602 118 431",
      city: "Kraków",
      notes: "Czeka na akceptację finalnej ceny."
    },
    {
      valuationNumber: "ISK-2026-1043",
      model: "iPhone 14 Pro",
      capacity: "128 GB",
      visualCondition: "FAIR",
      technicalCondition: "GOOD",
      batteryHealth: 84,
      accessories: "none",
      estimatedPrice: 1430,
      status: LeadStatus.RECEIVED,
      contactName: "Julia Wiśniewska",
      email: "julia@example.com",
      phone: "+48 733 440 991",
      city: "Poznań",
      notes: "Rysy na ramce."
    }
  ];

  for (const lead of sampleLeads) {
    await prisma.lead.upsert({
      where: { valuationNumber: lead.valuationNumber },
      update: lead,
      create: {
        ...lead,
        events: {
          create: {
            status: lead.status,
            note: "Seed przykładowego zlecenia."
          }
        }
      }
    });
  }
}

async function main() {
  await seedAdmin();
  await seedPrices();
  await seedContent();
  await seedLeads();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
