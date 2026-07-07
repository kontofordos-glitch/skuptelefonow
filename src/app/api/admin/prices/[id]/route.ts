import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { originGuard } from "@/lib/security";
import { priceItemSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminApi();
    const originError = originGuard(request);
    if (originError) return originError;

    const { id } = await context.params;
    const payload = priceItemSchema.safeParse(await request.json().catch(() => null));
    if (!payload.success) {
      return NextResponse.json({ message: "Nieprawidłowa pozycja cennika." }, { status: 400 });
    }

    const price = await prisma.priceItem.update({
      where: { id },
      data: payload.data
    });

    return NextResponse.json({ price });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się zaktualizować ceny." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminApi();
    const originError = originGuard(request);
    if (originError) return originError;

    const { id } = await context.params;
    await prisma.priceItem.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się usunąć ceny." }, { status: 400 });
  }
}
