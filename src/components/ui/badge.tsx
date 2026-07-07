import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        info: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
        destructive: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
        outline: "border border-border bg-background"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
