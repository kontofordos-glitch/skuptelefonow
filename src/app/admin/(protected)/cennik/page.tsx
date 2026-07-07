import { PriceEditor } from "@/components/admin/price-editor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cennik admin | iPhoneSkup.pl"
};

export default async function AdminPricingPage() {
  const prices = await prisma.priceItem.findMany({
    orderBy: [{ model: "desc" }, { capacity: "asc" }, { condition: "asc" }]
  });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Cennik</h1>
        <p className="mt-2 text-sm text-muted-foreground">Edytuj ceny modeli, pojemności i stanów używane przez kalkulator online.</p>
      </div>
      <PriceEditor
        prices={prices.map((price) => ({
          id: price.id,
          model: price.model,
          slug: price.slug,
          capacity: price.capacity,
          condition: price.condition,
          price: price.price,
          isActive: price.isActive
        }))}
      />
    </div>
  );
}
