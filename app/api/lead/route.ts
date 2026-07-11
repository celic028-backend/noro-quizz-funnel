import { NextRequest, NextResponse } from "next/server";

/**
 * Prima lead payload sa fronta i prosleđuje ga na Make webhook.
 * MAKE_WEBHOOK_URL je server-only (nije NEXT_PUBLIC).
 * Ako URL nije postavljen, payload se loguje (dev).
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const payload = {
    ...body,
    meta: {
      ...(typeof body.meta === "object" && body.meta ? body.meta : {}),
      submitted_at: new Date().toISOString(),
      funnel: "noro-quiz-v1",
    },
  };

  const url = process.env.MAKE_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("[lead] Make webhook greška:", e);
    }
  } else {
    console.log(
      "[lead] MAKE_WEBHOOK_URL nije postavljen - payload:\n",
      JSON.stringify(payload, null, 2),
    );
  }

  return NextResponse.json({ ok: true });
}
