import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const destination =
      typeof body.destination === "string" ? body.destination.trim() : "";
    const dates = typeof body.dates === "string" ? body.dates.trim() : "";
    const travellers =
      typeof body.travellers === "string" ? body.travellers.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const notes =
      typeof body.notes === "string" && body.notes.trim()
        ? body.notes.trim()
        : null;

    if (!service || !destination || !dates || !travellers || !budget || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid phone number." },
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
