"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@iphoneskup.pl");
  const [password, setPassword] = useState("Admin123!ChangeMe");
  const [totp, setTotp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      totp: totp || undefined,
      redirect: false
    });
    setLoading(false);

    if (result?.error) {
      setMessage("Nieprawidłowe dane logowania lub kod 2FA.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <CardTitle>Logowanie do panelu</CardTitle>
        <CardDescription>Sesja jest przechowywana w HTTP-only cookie. Kod 2FA jest obsługiwany, gdy konto ma go włączone.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Hasło</Label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="totp">Kod 2FA</Label>
            <Input id="totp" inputMode="numeric" value={totp} onChange={(event) => setTotp(event.target.value)} placeholder="Opcjonalnie" />
          </div>
          <Button type="submit" variant="accent" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Zaloguj
          </Button>
          {message ? <p className="text-sm text-destructive">{message}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
