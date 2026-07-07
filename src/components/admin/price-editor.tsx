"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { conditionLabels } from "@/lib/pricing-data";
import { slugify } from "@/lib/utils";

type PriceRow = {
  id: string;
  model: string;
  slug: string;
  capacity: string;
  condition: keyof typeof conditionLabels;
  price: number;
  isActive: boolean;
};

export function PriceEditor({ prices }: { prices: PriceRow[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(prices);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newRow, setNewRow] = useState({
    model: "iPhone 16 Pro",
    capacity: "128 GB",
    condition: "GOOD" as keyof typeof conditionLabels,
    price: 3200
  });

  function patchRow(id: string, patch: Partial<PriceRow>) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  async function save(row: PriceRow) {
    setSavingId(row.id);
    await fetch(`/api/admin/prices/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row)
    });
    setSavingId(null);
    router.refresh();
  }

  async function create() {
    setSavingId("new");
    await fetch("/api/admin/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newRow, slug: slugify(newRow.model), isActive: true })
    });
    setSavingId(null);
    router.refresh();
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-lg border bg-card p-5">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="grid gap-2 md:col-span-2">
            <Label>Model</Label>
            <Input value={newRow.model} onChange={(event) => setNewRow({ ...newRow, model: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Pojemność</Label>
            <Input value={newRow.capacity} onChange={(event) => setNewRow({ ...newRow, capacity: event.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label>Stan</Label>
            <Select
              value={newRow.condition}
              onChange={(event) => setNewRow({ ...newRow, condition: event.target.value as keyof typeof conditionLabels })}
            >
              {Object.entries(conditionLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Cena</Label>
            <Input
              type="number"
              value={newRow.price}
              onChange={(event) => setNewRow({ ...newRow, price: Number(event.target.value) })}
            />
          </div>
        </div>
        <Button className="mt-4" onClick={create} variant="accent" disabled={savingId === "new"}>
          {savingId === "new" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Dodaj pozycję
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Pojemność</TableHead>
              <TableHead>Stan</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Aktywne</TableHead>
              <TableHead className="text-right">Akcja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="min-w-56">
                  <Input value={row.model} onChange={(event) => patchRow(row.id, { model: event.target.value, slug: slugify(event.target.value) })} />
                </TableCell>
                <TableCell className="min-w-32">
                  <Input value={row.capacity} onChange={(event) => patchRow(row.id, { capacity: event.target.value })} />
                </TableCell>
                <TableCell className="min-w-40">
                  <Select value={row.condition} onChange={(event) => patchRow(row.id, { condition: event.target.value as keyof typeof conditionLabels })}>
                    {Object.entries(conditionLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell className="min-w-28">
                  <Input type="number" value={row.price} onChange={(event) => patchRow(row.id, { price: Number(event.target.value) })} />
                </TableCell>
                <TableCell>
                  <button
                    className="rounded-md"
                    onClick={() => patchRow(row.id, { isActive: !row.isActive })}
                    type="button"
                  >
                    <Badge variant={row.isActive ? "success" : "outline"}>{row.isActive ? "Tak" : "Nie"}</Badge>
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => save(row)} disabled={savingId === row.id}>
                    {savingId === row.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Zapisz
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
