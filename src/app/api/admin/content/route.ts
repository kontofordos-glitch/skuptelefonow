import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { originGuard } from "@/lib/security";
import { contentPatchSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminApi();
    const blocks = await prisma.contentBlock.findMany({ orderBy: { key: "asc" } });
    return NextResponse.json({ blocks });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się pobrać treści." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminApi();
    const originError = originGuard(request);
    if (originError) return originError;

    const payload = contentPatchSchema.safeParse(await request.json().catch(() => null));
    if (!payload.success) {
      return NextResponse.json({ message: "Nieprawidłowa treść." }, { status: 400 });
    }

    const block = await prisma.contentBlock.upsert({
      where: { key: payload.data.key },
      update: payload.data,
      create: payload.data
    });

    return NextResponse.json({ block });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się zapisać treści." }, { status: 500 });
  }
}
