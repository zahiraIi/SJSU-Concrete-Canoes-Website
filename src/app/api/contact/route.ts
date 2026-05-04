import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
