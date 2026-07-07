import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultPriceMatrix } from "@/lib/pricing-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prices = await prisma.priceItem.findMany({
      where: { isActive: true },
      orderBy: [{ model: "desc" }, { capacity: "asc" }, { condition: "asc" }],
      select: {
        model: true,
        slug: true,
        capacity: true,
        condition: true,
        price: true
      }
    });

    return NextResponse.json({ prices: prices.length ? prices : defaultPriceMatrix });
  } catch {
    return NextResponse.json({ prices: defaultPriceMatrix });
  }
}
