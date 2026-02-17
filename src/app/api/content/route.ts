import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";

function checkAuth(request: NextRequest): boolean {
  const sessionId = request.cookies.get("admin_session")?.value;
  if (!sessionId) return false;
  return validateSession(sessionId);
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = getContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    saveContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid content data" }, { status: 400 });
  }
}
