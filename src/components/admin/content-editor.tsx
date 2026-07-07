"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContentBlock = {
  id: string;
  key: string;
  title: string;
  value: string;
  type: "TEXT" | "MARKDOWN" | "IMAGE" | "JSON";
};

export function ContentEditor({ blocks }: { blocks: ContentBlock[] }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(blocks.map((block) => [block.key, block.value]))
  );
  const [saving, setSaving] = useState<string | null>(null);

  async function save(block: ContentBlock) {
    setSaving(block.key);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...block, value: values[block.key] })
    });
    setSaving(null);
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      {blocks.map((block) => (
        <Card key={block.key}>
          <CardHeader>
            <CardTitle>{block.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor={block.key}>{block.key}</Label>
              <Textarea
                id={block.key}
                value={values[block.key]}
                onChange={(event) => setValues((current) => ({ ...current, [block.key]: event.target.value }))}
              />
            </div>
            <Button className="mt-4" onClick={() => save(block)} disabled={saving === block.key}>
              {saving === block.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Zapisz treść
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
