import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Klienci admin | iPhoneSkup.pl"
};

export default async function AdminCustomersPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const customers = Array.from(
    leads.reduce((map, lead) => {
      const current = map.get(lead.email);
      if (!current) {
        map.set(lead.email, {
          email: lead.email,
          name: lead.contactName,
          phone: lead.phone,
          city: lead.city,
          leads: 1,
          total: lead.finalPrice ?? lead.estimatedPrice,
          last: lead.createdAt
        });
        return map;
      }
      current.leads += 1;
      current.total += lead.finalPrice ?? lead.estimatedPrice;
      if (lead.createdAt > current.last) current.last = lead.createdAt;
      return map;
    }, new Map<string, { email: string; name: string; phone: string; city: string | null; leads: number; total: number; last: Date }>())
  ).map(([, value]) => value);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Klienci i leady</h1>
        <p className="mt-2 text-sm text-muted-foreground">Widok łączy formularze wyceny po adresie email klienta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista klientów</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Klient</TableHead>
                  <TableHead>Kontakt</TableHead>
                  <TableHead>Liczba leadów</TableHead>
                  <TableHead>Wartość</TableHead>
                  <TableHead>Ostatni kontakt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.email}>
                    <TableCell>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.city || "Online"}</p>
                    </TableCell>
                    <TableCell>
                      <p>{customer.email}</p>
                      <p className="text-xs text-muted-foreground">{customer.phone}</p>
                    </TableCell>
                    <TableCell>{customer.leads}</TableCell>
                    <TableCell>{formatCurrency(customer.total)}</TableCell>
                    <TableCell>{formatDate(customer.last)}</TableCell>
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
