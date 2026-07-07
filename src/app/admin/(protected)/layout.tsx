import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPage } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminPage();

  return (
    <AdminShell
      user={{
        name: user.name,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled
      }}
    >
      {children}
    </AdminShell>
  );
}
