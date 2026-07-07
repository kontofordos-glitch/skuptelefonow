import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { originGuard } from "@/lib/security";
import { priceItemSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminApi();
    const prices = await prisma.priceItem.findMany({
      orderBy: [{ model: "desc" }, { capacity: "asc" }, { condition: "asc" }]
    });
    return NextResponse.json({ prices });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się pobrać cennika." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminApi();
    const originError = originGuard(request);
    if (originError) return originError;

    const payload = priceItemSchema.safeParse(await request.json().catch(() => null));
    if (!payload.success) {
      return NextResponse.json({ message: "Nieprawidłowa pozycja cennika." }, { status: 400 });
    }

    const price = await prisma.priceItem.create({ data: payload.data });
    return NextResponse.json({ price }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się dodać pozycji. Sprawdź, czy nie istnieje duplikat." }, { status: 400 });
  }
}
