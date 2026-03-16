import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Rate limiting ────────────────────────────────────────────────────────────
// Simple in-memory store: { ip -> { count, resetAt } }
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT   = 3;          // max requests
const RATE_WINDOW  = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── HTML escaping ────────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Validation constants ─────────────────────────────────────────────────────
const MAX_NAME    = 100;
const MAX_EMAIL   = 254;
const MAX_MESSAGE = 5000;
const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  // Type checks
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid input types" }, { status: 400 });
  }

  // Length + format validation
  if (!name.trim() || name.length > MAX_NAME) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!email.trim() || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!message.trim() || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const safeName    = escapeHtml(name.trim());
  const safeEmail   = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");
  const recipient   = process.env.CONTACT_RECIPIENT_EMAIL ?? "teshabayevmakhkambek@gmail.com";

  try {
    await transporter.sendMail({
      from:    `"UzDynamics Contact" <${process.env.GMAIL_USER}>`,
      to:      recipient,
      replyTo: email.trim(),
      subject: `[UzDynamics] New message from ${name.trim()}`,
      text:    `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <hr/>
        <p>${safeMessage}</p>
      `,
    });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
