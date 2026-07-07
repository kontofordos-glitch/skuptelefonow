"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BarChart3, FileDown, Home, LayoutPanelLeft, LogOut, Menu, Tags, Users, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/zlecenia", label: "Zlecenia", icon: LayoutPanelLeft },
  { href: "/admin/cennik", label: "Cennik", icon: Tags },
  { href: "/admin/tresci", label: "Treści", icon: BarChart3 },
  { href: "/admin/klienci", label: "Klienci", icon: Users },
  { href: "/admin/raporty", label: "Raporty", icon: FileDown }
];

export function AdminShell({
  children,
  user
}: {
  children: React.ReactNode;
  user: { name: string; email: string; twoFactorEnabled: boolean };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function logout() {
    await signOut({ callbackUrl: "/admin/login" });
  }

  const sidebar = (
    <aside className="flex h-full flex-col border-r bg-background">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background">
          JS
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">JablkoSkup.pl</p>
          <p className="truncate text-xs text-muted-foreground">Panel administracyjny</p>
        </div>
      </div>
      <nav className="grid gap-1 p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-secondary",
                active ? "bg-secondary text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t p-4">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        <p className="mt-1 text-xs text-muted-foreground">2FA: {user.twoFactorEnabled ? "włączone" : "gotowe do włączenia"}</p>
      </div>
    </aside>
  );

  return (
    <div className="min-h-svh bg-secondary/35">
      <div className="hidden fixed inset-y-0 left-0 z-40 w-72 lg:block">{sidebar}</div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Zamknij menu" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72 max-w-[85vw] bg-background">{sidebar}</div>
        </div>
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/88 px-4 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div>
              <p className="text-sm font-semibold">Administracja</p>
              <p className="text-xs text-muted-foreground">Leady, cennik, treści i raporty</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={logout} title="Wyloguj" aria-label="Wyloguj">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
