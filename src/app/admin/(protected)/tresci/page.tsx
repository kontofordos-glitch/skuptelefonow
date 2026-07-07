import { ContentEditor } from "@/components/admin/content-editor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Treści admin | JablkoSkup.pl"
};

export default async function AdminContentPage() {
  const blocks = await prisma.contentBlock.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Treści strony</h1>
        <p className="mt-2 text-sm text-muted-foreground">Edytuj najważniejsze teksty, banery i komunikaty serwisu.</p>
      </div>
      <ContentEditor
        blocks={blocks.map((block) => ({
          id: block.id,
          key: block.key,
          title: block.title,
          value: block.value,
          type: block.type
        }))}
      />
    </div>
  );
}
