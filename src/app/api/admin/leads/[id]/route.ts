import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { originGuard } from "@/lib/security";
import { leadPatchSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminApi();
    const originError = originGuard(request);
    if (originError) return originError;

    const { id } = await context.params;
    const payload = leadPatchSchema.safeParse(await request.json().catch(() => null));
    if (!payload.success) {
      return NextResponse.json({ message: "Nieprawidłowe dane statusu." }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status: payload.data.status,
        finalPrice: payload.data.finalPrice === undefined ? undefined : payload.data.finalPrice,
        events: payload.data.status
          ? {
              create: {
                status: payload.data.status,
                note: payload.data.note
              }
            }
          : undefined
      }
    });

    return NextResponse.json({ lead });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się zaktualizować zlecenia." }, { status: 500 });
  }
}
