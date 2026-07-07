"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    setError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message, consent })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(data.message ?? "Nie udało się wysłać wiadomości.");
      return;
    }

    setStatus(data.message ?? "Dziękujemy za wiadomość.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setConsent(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formularz kontaktowy</CardTitle>
        <CardDescription>
          Napisz, jaki model chcesz sprzedać albo o co chcesz zapytać. Odpowiemy mailowo lub telefonicznie.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Imię</Label>
              <Input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-phone">Telefon</Label>
            <Input id="contact-phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-message">Wiadomość</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Np. Mam iPhone 17 Pro 256 GB, stan idealny, bateria 98%. Czy mogę podjechać dziś do punktu?"
              required
            />
          </div>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
            />
            <span>Wyrażam zgodę na kontakt w odpowiedzi na moją wiadomość.</span>
          </label>
          <Button type="submit" variant="accent" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Wyślij wiadomość
          </Button>
          {status ? <p className="text-sm text-emerald-600 dark:text-emerald-300">{status}</p> : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
