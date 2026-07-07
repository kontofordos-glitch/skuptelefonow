import { ContactStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { sendContactMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { originGuard, rateLimit } from "@/lib/security";
import { contactMessageSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "contact", { limit: 8, windowMs: 60_000 });
  if (limited) return limited;

  const originError = originGuard(request);
  if (originError) return originError;

  const payload = contactMessageSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ message: "Sprawdź wymagane pola formularza kontaktowego." }, { status: 400 });
  }

  const input = payload.data;
  const contact = await prisma.contactMessage.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      status: ContactStatus.NEW
    }
  });

  try {
    const result = await sendContactMail(input);
    const status = result.sent ? ContactStatus.SENT : ContactStatus.FAILED;

    await prisma.contactMessage.update({
      where: { id: contact.id },
      data: {
        status,
        error: result.sent ? null : result.reason
      }
    });

    return NextResponse.json({
      ok: true,
      sent: result.sent,
      message: result.sent
        ? "Wiadomość została wysłana do JablkoSkup.pl."
        : "Wiadomość została zapisana. Skonfiguruj SMTP, aby wysyłać ją emailem."
    });
  } catch (error) {
    await prisma.contactMessage.update({
      where: { id: contact.id },
      data: {
        status: ContactStatus.FAILED,
        error: error instanceof Error ? error.message.slice(0, 500) : "Unknown mail error"
      }
    });

    return NextResponse.json(
      { message: "Wiadomość została zapisana, ale wysyłka email nie powiodła się." },
      { status: 502 }
    );
  }
}
