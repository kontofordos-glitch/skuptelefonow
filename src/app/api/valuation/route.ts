import { DeviceCondition } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { originGuard, rateLimit } from "@/lib/security";
import { valuationSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

const conditionOrder = [DeviceCondition.EXCELLENT, DeviceCondition.GOOD, DeviceCondition.FAIR, DeviceCondition.DAMAGED];

function worstCondition(visual: DeviceCondition, technical: DeviceCondition) {
  return conditionOrder[Math.max(conditionOrder.indexOf(visual), conditionOrder.indexOf(technical))];
}

function accessoryBonus(accessories: string[]) {
  return accessories.reduce((sum, item) => {
    if (item === "box") return sum + 60;
    if (item === "cable") return sum + 40;
    if (item === "receipt") return sum + 120;
    return sum;
  }, 0);
}

async function estimatePrice(input: {
  model: string;
  capacity: string;
  visualCondition: DeviceCondition;
  technicalCondition: DeviceCondition;
  batteryHealth: number;
  accessories: string[];
}) {
  const condition = worstCondition(input.visualCondition, input.technicalCondition);
  const price = await prisma.priceItem.findFirst({
    where: {
      model: input.model,
      capacity: input.capacity,
      condition,
      isActive: true
    }
  });

  const base = price?.price ?? 0;
  const batteryMultiplier = input.batteryHealth < 80 ? 0.86 : input.batteryHealth < 90 ? 0.95 : 1;
  return Math.max(0, Math.round((base * batteryMultiplier + accessoryBonus(input.accessories)) / 10) * 10);
}

function valuationNumber() {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ISK-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}${suffix}`;
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "valuation", { limit: 12, windowMs: 60_000 });
  if (limited) return limited;

  const originError = originGuard(request);
  if (originError) return originError;

  const payload = valuationSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ message: "Sprawdź wymagane pola formularza." }, { status: 400 });
  }

  const input = payload.data;
  const estimatedPrice = await estimatePrice({
    model: input.model,
    capacity: input.capacity,
    visualCondition: input.visualCondition,
    technicalCondition: input.technicalCondition,
    batteryHealth: input.batteryHealth,
    accessories: input.accessories
  });

  const lead = await prisma.lead.create({
    data: {
      valuationNumber: valuationNumber(),
      model: input.model,
      capacity: input.capacity,
      visualCondition: input.visualCondition,
      technicalCondition: input.technicalCondition,
      batteryHealth: input.batteryHealth,
      accessories: input.accessories.join(","),
      estimatedPrice,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      city: input.city,
      notes: input.notes,
      consentMarketing: input.consentMarketing,
      events: {
        create: {
          status: "NEW",
          note: "Zgłoszenie utworzone przez formularz wyceny online."
        }
      }
    }
  });

  return NextResponse.json({
    id: lead.id,
    valuationNumber: lead.valuationNumber,
    estimatedPrice: lead.estimatedPrice
  });
}
