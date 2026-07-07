"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/ui/select";
import { leadStatusLabels } from "@/lib/pricing-data";

type Status = keyof typeof leadStatusLabels;

export function StatusSelect({ leadId, status }: { leadId: string; status: Status }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  async function update(nextStatus: Status) {
    setValue(nextStatus);
    setLoading(true);
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus, note: `Status zmieniony na ${leadStatusLabels[nextStatus]}.` })
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex min-w-40 items-center gap-2">
      <Select value={value} onChange={(event) => update(event.target.value as Status)} disabled={loading}>
        {Object.entries(leadStatusLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </Select>
      {loading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
    </div>
  );
}
