import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "src/data/leads.json");

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry: string;
  createdAt: string;
};

function getLeads(): Lead[] {
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "[]");
    return [];
  }
  return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiry } = body;

    if (!name || !email || !inquiry) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const leads = getLeads();
    const lead: Lead = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      inquiry,
      createdAt: new Date().toISOString(),
    };
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get("admin_session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { validateSession } = await import("@/lib/auth");
  if (!validateSession(sessionId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json(leads);
}
