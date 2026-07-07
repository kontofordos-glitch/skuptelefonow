import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusSelect } from "@/components/admin/status-select";
import { leadStatusLabels, leadStatusTone } from "@/lib/pricing-data";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Zlecenia admin | iPhoneSkup.pl"
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { events: { orderBy: { createdAt: "desc" }, take: 2 } }
  });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Zlecenia wyceny</h1>
        <p className="mt-2 text-sm text-muted-foreground">Statusy: nowy, wysłany, odebrany, zweryfikowany, opłacony lub odrzucony.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista telefonów do wyceny</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zlecenie</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Stan</TableHead>
                  <TableHead>Cena</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Utworzone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <p className="font-medium">{lead.valuationNumber}</p>
                      <p className="text-xs text-muted-foreground">{lead.city || "Online"}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{lead.contactName}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </TableCell>
                    <TableCell>
                      <p>{lead.model}</p>
                      <p className="text-xs text-muted-foreground">{lead.capacity}, bateria {lead.batteryHealth}%</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-muted-foreground">Wizualny: {lead.visualCondition}</p>
                      <p className="text-xs text-muted-foreground">Techniczny: {lead.technicalCondition}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{formatCurrency(lead.finalPrice ?? lead.estimatedPrice)}</p>
                      {lead.finalPrice ? <p className="text-xs text-muted-foreground">finalna</p> : null}
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-2">
                        <Badge variant={leadStatusTone[lead.status]}>{leadStatusLabels[lead.status]}</Badge>
                        <StatusSelect leadId={lead.id} status={lead.status} />
                      </div>
                    </TableCell>
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
