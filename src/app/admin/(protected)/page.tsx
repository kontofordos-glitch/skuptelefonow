import { LeadStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leadStatusLabels, leadStatusTone } from "@/lib/pricing-data";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard admin | iPhoneSkup.pl"
};

export default async function AdminDashboardPage() {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [leadsThisMonth, paidThisMonth, payoutAggregate, newLeads, recentLeads] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.lead.count({ where: { status: LeadStatus.PAID, updatedAt: { gte: monthStart } } }),
    prisma.lead.aggregate({
      where: { status: LeadStatus.PAID, updatedAt: { gte: monthStart } },
      _sum: { finalPrice: true }
    }),
    prisma.lead.count({ where: { status: LeadStatus.NEW } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 })
  ]);

  const stats = [
    { title: "Leady w miesiącu", value: leadsThisMonth.toString(), hint: "Nowe formularze wyceny" },
    { title: "Kupione w miesiącu", value: paidThisMonth.toString(), hint: "Status opłacony" },
    { title: "Suma wypłat", value: formatCurrency(payoutAggregate._sum.finalPrice ?? 0), hint: "W tym miesiącu" },
    { title: "Nowe do obsługi", value: newLeads.toString(), hint: "Wymagają reakcji" }
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Szybki obraz leadów, wypłat i bieżących zleceń.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-normal">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ostatnie zlecenia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numer</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Wycena</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.valuationNumber}</TableCell>
                    <TableCell>{lead.contactName}</TableCell>
                    <TableCell>{lead.model} {lead.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={leadStatusTone[lead.status]}>{leadStatusLabels[lead.status]}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(lead.finalPrice ?? lead.estimatedPrice)}</TableCell>
                    <TableCell>{formatDate(lead.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
