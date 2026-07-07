import nodemailer from "nodemailer";

export type ContactMail = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

export async function sendContactMail(input: ContactMail) {
  if (!isSmtpConfigured()) {
    return {
      sent: false,
      reason: "SMTP is not configured."
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const to = process.env.CONTACT_TO_EMAIL ?? "kontakt@jablkoskup.pl";
  const from = process.env.SMTP_FROM ?? "JablkoSkup.pl <kontakt@jablkoskup.pl>";

  await transporter.sendMail({
    to,
    from,
    replyTo: input.email,
    subject: `Nowa wiadomość z JablkoSkup.pl od ${input.name}`,
    text: [
      "Nowa wiadomość z formularza kontaktowego JablkoSkup.pl",
      "",
      `Imię: ${input.name}`,
      `Email: ${input.email}`,
      `Telefon: ${input.phone || "brak"}`,
      "",
      input.message
    ].join("\n"),
    html: `
      <h2>Nowa wiadomość z JablkoSkup.pl</h2>
      <p><strong>Imię:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(input.phone || "brak")}</p>
      <p style="white-space: pre-line">${escapeHtml(input.message)}</p>
    `
  });

  return { sent: true };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
