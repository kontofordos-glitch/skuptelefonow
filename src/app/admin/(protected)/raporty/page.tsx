import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Raporty admin | iPhoneSkup.pl"
};

export default function AdminReportsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Raporty i eksport</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pobierz leady i wypłaty w formacie CSV albo Excel-kompatybilnym XLS.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Eksport CSV</CardTitle>
            <CardDescription>Najlepszy do arkuszy, BI i importu do CRM.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="accent">
              <a href="/api/admin/export?format=csv">
                <Download className="h-4 w-4" />
                Pobierz CSV
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eksport Excel</CardTitle>
            <CardDescription>Plik `.xls` z tabelą HTML otwierany bez dodatkowej biblioteki z podatnościami.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <a href="/api/admin/export?format=xls">
                <Download className="h-4 w-4" />
                Pobierz XLS
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
