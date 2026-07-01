import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = process.env.VERCEL
  ? path.join("/tmp", "visitor-sessions.json")
  : path.join(process.cwd(), ".visitor-sessions.json");

const TTL = 30_000;

type Sessions = Record<string, number>;

async function readSessions(): Promise<Sessions> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeSessions(sessions: Sessions): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(sessions), "utf-8");
}

function clean(sessions: Sessions): Sessions {
  const now = Date.now();
  for (const [id, time] of Object.entries(sessions)) {
    if (now - time > TTL) delete sessions[id];
  }
  return sessions;
}

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }
    let sessions = await readSessions();
    sessions = clean(sessions);
    sessions[sessionId] = Date.now();
    await writeSessions(sessions);
    return NextResponse.json({ count: Object.keys(sessions).length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function GET() {
  try {
    const sessions = clean(await readSessions());
    await writeSessions(sessions);
    return NextResponse.json({ count: Object.keys(sessions).length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
