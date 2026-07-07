import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireAdminApi } from "@/lib/auth";
import { leadStatusLabels } from "@/lib/pricing-data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function htmlCell(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminApi();
    const format = request.nextUrl.searchParams.get("format") === "xls" ? "xls" : "csv";
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    const headers = [
      "Numer",
      "Status",
      "Klient",
      "Email",
      "Telefon",
      "Miasto",
      "Model",
      "Pojemność",
      "Bateria",
      "Wycena",
      "Cena finalna",
      "Data"
    ];
    const rows = leads.map((lead) => [
      lead.valuationNumber,
      leadStatusLabels[lead.status],
      lead.contactName,
      lead.email,
      lead.phone,
      lead.city ?? "",
      lead.model,
      lead.capacity,
      `${lead.batteryHealth}%`,
      lead.estimatedPrice,
      lead.finalPrice ?? "",
      lead.createdAt.toISOString()
    ]);

    if (format === "xls") {
      const body = `<!doctype html><html><head><meta charset="utf-8" /></head><body><table><thead><tr>${headers
        .map((header) => `<th>${htmlCell(header)}</th>`)
        .join("")}</tr></thead><tbody>${rows
        .map((row) => `<tr>${row.map((cell) => `<td>${htmlCell(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></body></html>`;

      return new NextResponse(body, {
        headers: {
          "Content-Type": "application/vnd.ms-excel; charset=utf-8",
          "Content-Disposition": "attachment; filename=jablkoskup-leady.xls"
        }
      });
    }

    const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\n")}`;
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=jablkoskup-leady.csv"
      }
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: "Brak autoryzacji." }, { status: 401 });
    }
    return NextResponse.json({ message: "Nie udało się wygenerować eksportu." }, { status: 500 });
  }
}
