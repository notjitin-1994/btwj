import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  rateLimit,
  getClientIp,
  rateLimitKey,
  RATE_LIMITS,
} from "@/lib/rate-limit";
import {
  sanitizeText,
  validateEmail,
  isSpam,
} from "@/lib/validation";

export async function POST(req: Request) {
  // Rate limit: 5 requests per 10 minutes per IP
  const ip = getClientIp(req);
  const rl = rateLimit(rateLimitKey(ip, "contact"), RATE_LIMITS.contact);
  if (rl) return rl;

  try {
    const body = await req.json();
    const name = sanitizeText(body.name, 200);
    const email = validateEmail(body.email);
    const message = sanitizeText(body.message, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    // Spam check
    if (isSpam(name) || isSpam(message)) {
      return NextResponse.json(
        { ok: false, error: "Your message was flagged. Please call us directly." },
        { status: 400 }
      );
    }

    await db.contactMessage.create({
      data: { name, email, message },
    });

    return NextResponse.json({
      ok: true,
      message: "Message received. Our travel experts will reach out shortly.",
    });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "contact" });
}
