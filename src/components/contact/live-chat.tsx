"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "consultant" | "user";
  text: string;
};

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "consultant",
      text: "Cześć, tu JablkoSkup.pl. Podaj model i stan iPhone'a, a podpowiem, od czego zacząć."
    }
  ]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "consultant",
        text: "Dzięki. Najszybciej będzie wypełnić wycenę online albo zostawić numer w formularzu kontaktowym."
      }
    ]);
    setDraft("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Live chat</p>
              <p className="text-xs text-muted-foreground">Symulowany konsultant online</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Zamknij chat">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid max-h-80 gap-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[80%] rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground"
                    : "mr-auto max-w-[85%] rounded-lg bg-secondary px-3 py-2 text-sm"
                }
              >
                {message.text}
              </div>
            ))}
          </div>
          <form className="flex gap-2 border-t p-3" onSubmit={submit}>
            <Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Napisz wiadomość..." />
            <Button type="submit" size="icon" aria-label="Wyślij wiadomość na czacie">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <Button size="lg" variant="accent" className="shadow-soft" onClick={() => setOpen(true)}>
          <MessageCircle className="h-5 w-5" />
          Chat
        </Button>
      )}
    </div>
  );
}
