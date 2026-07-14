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
  validatePhone,
  validateEnum,
  isSpam,
} from "@/lib/validation";

const ALLOWED_SERVICES = [
  "tour-packages",
  "hotel-resort",
  "umrah",
  "event-management",
  "custom",
] as const;

const ALLOWED_BUDGETS = ["budget", "mid", "premium", "flexible"] as const;

const ALLOWED_TRAVELLERS = ["1", "2", "3-5", "6+"] as const;

export async function POST(req: Request) {
  // Rate limit: 10 requests per 10 minutes per IP
  const ip = getClientIp(req);
  const rl = rateLimit(rateLimitKey(ip, "trip-plan"), RATE_LIMITS.tripPlan);
  if (rl) return rl;

  try {
    const body = await req.json();
    const service = validateEnum(body.service, ALLOWED_SERVICES);
    const destination = sanitizeText(body.destination, 300);
    const dates = sanitizeText(body.dates, 200);
    const travellers = validateEnum(body.travellers, ALLOWED_TRAVELLERS);
    const budget = validateEnum(body.budget, ALLOWED_BUDGETS);
    const phone = validatePhone(body.phone);
    const notes = body.notes ? sanitizeText(body.notes, 2000) : null;

    if (!service || !destination || !dates || !travellers || !budget || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    // Spam check
    if (isSpam(destination) || (notes && isSpam(notes))) {
      return NextResponse.json(
        { ok: false, error: "Your request was flagged. Please call us directly." },
        { status: 400 }
      );
    }

    await db.tripPlan.create({
      data: { service, destination, dates, travellers, budget, phone, notes },
    });

    return NextResponse.json({
      ok: true,
      message: "Trip request received. Our travel experts will call you within 24 hours.",
    });
  } catch (err) {
    console.error("[trip-plan] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "trip-plan" });
}
