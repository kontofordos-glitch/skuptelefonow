import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicModels } from "@/lib/pricing-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Modele iPhone w skupie - cennik Apple iPhone",
  description:
    "Lista modeli iPhone przyjmowanych w skupie: iPhone 16, 15, 14, 13, 12 oraz wersje Pro i Pro Max. Sprawdź widełki wyceny.",
  alternates: { canonical: "/modele-iphone" }
};

export default function ModelsPage() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">Modele iPhone</p>
        <h1 className="section-title">Skupujemy popularne modele Apple iPhone</h1>
        <p className="section-copy">
          Ceny są orientacyjne i zależą od pojemności, stanu technicznego, kondycji baterii, blokad oraz historii napraw.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publicModels.map((model) => (
            <Card key={model.slug}>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  {model.badges.map((badge) => (
                    <Badge key={badge} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <CardTitle>{model.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Szacunkowo od</p>
                <p className="mt-1 text-2xl font-semibold tracking-normal">
                  {formatCurrency(model.priceFrom)} do {formatCurrency(model.priceTo)}
                </p>
                <Button asChild className="mt-5 w-full" variant="accent">
                  <Link href={`/wycena-iphone?model=${model.slug}`}>Wyceń ten model</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
