import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, sessionCookieOptions, signSession } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = String(body.password || "");
  const email = String(body.email || "admin@bonneassise.bj");
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = signSession(email);
  const res = NextResponse.json({ ok: true, email });
  const opts = sessionCookieOptions(token);
  res.cookies.set(opts.name, opts.value, opts);
  return res;
}
