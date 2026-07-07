"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { recentlyBought } from "@/lib/pricing-data";
import { formatCurrency } from "@/lib/utils";

export function RecentlyBought() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-5 py-4">
        <p className="text-sm font-semibold">Ostatnio kupione</p>
      </div>
      <div className="divide-y">
        {recentlyBought.map((item, index) => (
          <motion.div
            key={`${item.model}-${item.time}`}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12 }}
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.model}</p>
              <p className="text-xs text-muted-foreground">
                {item.city} · {item.time}
              </p>
            </div>
            <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
