"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { conditionLabels, defaultPriceMatrix, type PublicPriceItem } from "@/lib/pricing-data";
import { formatCurrency } from "@/lib/utils";

type Condition = keyof typeof conditionLabels;

const conditionOrder: Condition[] = ["EXCELLENT", "GOOD", "FAIR", "DAMAGED"];

const accessoryOptions = [
  { value: "box", label: "Pudełko", bonus: 60 },
  { value: "cable", label: "Kabel", bonus: 40 },
  { value: "receipt", label: "Dowód zakupu", bonus: 120 }
];

function worstCondition(visual: Condition, technical: Condition) {
  const visualIndex = conditionOrder.indexOf(visual);
  const technicalIndex = conditionOrder.indexOf(technical);
  return conditionOrder[Math.max(visualIndex, technicalIndex)];
}

export function ValuationCalculator({ compact = false }: { compact?: boolean }) {
  const [prices, setPrices] = useState<PublicPriceItem[]>(defaultPriceMatrix);
  const [model, setModel] = useState("iPhone 17 Pro");
  const [capacity, setCapacity] = useState("256 GB");
  const [visualCondition, setVisualCondition] = useState<Condition>("GOOD");
  const [technicalCondition, setTechnicalCondition] = useState<Condition>("EXCELLENT");
  const [batteryHealth, setBatteryHealth] = useState(91);
  const [accessories, setAccessories] = useState<string[]>(["box", "cable"]);
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/prices")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { prices: PublicPriceItem[] }) => {
        if (data.prices?.length) setPrices(data.prices);
      })
      .catch(() => setPrices(defaultPriceMatrix));
  }, []);

  const models = useMemo(() => Array.from(new Set(prices.map((item) => item.model))), [prices]);
  const capacities = useMemo(
    () => Array.from(new Set(prices.filter((item) => item.model === model).map((item) => item.capacity))),
    [model, prices]
  );

  useEffect(() => {
    if (capacities.length && !capacities.includes(capacity)) {
      setCapacity(capacities[0]);
    }
  }, [capacities, capacity]);

  const estimate = useMemo(() => {
    const condition = worstCondition(visualCondition, technicalCondition);
    const base =
      prices.find((item) => item.model === model && item.capacity === capacity && item.condition === condition)?.price ??
      prices.find((item) => item.model === model && item.capacity === capacity)?.price ??
      0;
    const batteryMultiplier = batteryHealth < 80 ? 0.86 : batteryHealth < 90 ? 0.95 : 1;
    const bonus = accessoryOptions
      .filter((item) => accessories.includes(item.value))
      .reduce((sum, item) => sum + item.bonus, 0);

    return Math.max(0, Math.round((base * batteryMultiplier + bonus) / 10) * 10);
  }, [accessories, batteryHealth, capacity, model, prices, technicalCondition, visualCondition]);

  function toggleAccessory(value: string) {
    setAccessories((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);

    const response = await fetch("/api/valuation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        capacity,
        visualCondition,
        technicalCondition,
        batteryHealth,
        accessories,
        contactName,
        email,
        phone,
        city,
        notes,
        consent,
        consentMarketing
      })
    });

    const data = await response.json().catch(() => ({}));
    setSubmitting(false);

    if (!response.ok) {
      setMessage(data.message ?? "Nie udało się wysłać wyceny. Sprawdź dane i spróbuj ponownie.");
      return;
    }

    setMessage(`Zgłoszenie ${data.valuationNumber} zapisane. Szacowana cena: ${formatCurrency(data.estimatedPrice)}.`);
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-secondary/50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Wycena online iPhone&apos;a</CardTitle>
            <CardDescription>Wybierz model i stan, a kalkulator pokaże aktualną estymację skupu.</CardDescription>
          </div>
          <Badge variant="success">odpowiedź w 15 min</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <form className="grid gap-5" onSubmit={submitLead}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Select id="model" value={model} onChange={(event) => setModel(event.target.value)}>
                {models.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Pojemność</Label>
              <Select id="capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)}>
                {capacities.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visual">Stan wizualny</Label>
              <Select
                id="visual"
                value={visualCondition}
                onChange={(event) => setVisualCondition(event.target.value as Condition)}
              >
                {conditionOrder.map((item) => (
                  <option key={item} value={item}>
                    {conditionLabels[item]}
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technical">Stan techniczny</Label>
              <Select
                id="technical"
                value={technicalCondition}
                onChange={(event) => setTechnicalCondition(event.target.value as Condition)}
              >
                {conditionOrder.map((item) => (
                  <option key={item} value={item}>
                    {conditionLabels[item]}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="battery">Kondycja baterii</Label>
              <span className="text-sm font-medium">{batteryHealth}%</span>
            </div>
            <input
              id="battery"
              type="range"
              min="50"
              max="100"
              value={batteryHealth}
              onChange={(event) => setBatteryHealth(Number(event.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          <div className="grid gap-2">
            <Label>Akcesoria</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {accessoryOptions.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => toggleAccessory(item.value)}
                  className="flex h-11 items-center justify-between rounded-md border px-3 text-sm transition-colors hover:bg-secondary"
                >
                  <span>{item.label}</span>
                  {accessories.includes(item.value) ? <Check className="h-4 w-4 text-emerald-500" /> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-secondary/50 p-5">
            <p className="text-sm text-muted-foreground">Szacowana cena</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-4xl font-semibold tracking-normal">{formatCurrency(estimate)}</p>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Cena zależy od blokad, napraw i weryfikacji serwisowej. Finalną ofertę potwierdzimy po oględzinach.
              </p>
            </div>
          </div>

          {!compact ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contactName">Imię i nazwisko</Label>
                  <Input id="contactName" value={contactName} onChange={(event) => setContactName(event.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Miasto</Label>
                  <Input id="city" value={city} onChange={(event) => setCity(event.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Dodatkowe informacje</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Np. wymieniony ekran, stan baterii, blokady, preferowana płatność"
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
                <span>Akceptuję regulamin i zgodę na kontakt w sprawie wyceny.</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={consentMarketing}
                  onChange={(event) => setConsentMarketing(event.target.checked)}
                />
                <span>Chcę otrzymywać okazjonalne informacje o promocjach skupu.</span>
              </label>
            </>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type={compact ? "button" : "submit"} asChild={compact} variant="accent" size="lg">
              {compact ? (
                <a href="/wycena-iphone">
                  Dokończ wycenę <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Wyślij do potwierdzenia
                </>
              )}
            </Button>
            {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
