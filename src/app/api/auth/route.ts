import { NextRequest, NextResponse } from "next/server";
import { authenticate, destroySession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const sessionId = authenticate(username, password);
    if (!sessionId) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", sessionId, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 86400, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const sessionId = request.cookies.get("admin_session")?.value;
  if (sessionId) {
    destroySession(sessionId);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_session");
  return response;
}
