import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SESSION_FILE = process.env.VERCEL
  ? path.join("/tmp", "visitor-sessions.json")
  : path.join(process.cwd(), ".visitor-sessions.json");

const EVENTS_FILE = process.env.VERCEL
  ? path.join("/tmp", "visitor-events.json")
  : path.join(process.cwd(), ".visitor-events.json");

const TTL = 30_000;
const EVENT_TTL = 60_000;

type Sessions = Record<string, number>;

type VisitorEvent = {
  id: number;
  location: string;
  timestamp: number;
};

async function readJSON<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJSON(file: string, data: unknown): Promise<void> {
  await fs.writeFile(file, JSON.stringify(data), "utf-8");
}

function cleanSessions(sessions: Sessions): Sessions {
  const now = Date.now();
  for (const [id, time] of Object.entries(sessions)) {
    if (now - time > TTL) delete sessions[id];
  }
  return sessions;
}

function cleanEvents(events: VisitorEvent[]): VisitorEvent[] {
  const cutoff = Date.now() - EVENT_TTL;
  return events.filter((e) => e.timestamp > cutoff);
}

function getLocation(req: Request): string {
  const country = req.headers.get("x-vercel-ip-country") || "";
  const region = req.headers.get("x-vercel-ip-country-region") || "";
  const city = req.headers.get("x-vercel-ip-city") || "";
  if (city && country) return `${city}, ${country}`;
  if (country) return country;
  return "Unknown";
}

export async function POST(req: Request) {
  try {
    const { sessionId, lastEventId = 0 } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    let sessions = await readJSON<Sessions>(SESSION_FILE, {});
    sessions = cleanSessions(sessions);

    const isNew = !sessions[sessionId];
    sessions[sessionId] = Date.now();
    await writeJSON(SESSION_FILE, sessions);

    let events = await readJSON<VisitorEvent[]>(EVENTS_FILE, []);
    events = cleanEvents(events);

    if (isNew) {
      const location = getLocation(req);
      const nextId = events.length > 0 ? events[events.length - 1].id + 1 : 1;
      events.push({ id: nextId, location, timestamp: Date.now() });
      await writeJSON(EVENTS_FILE, events);
    }

    const newEvents = events.filter((e) => e.id > lastEventId);

    return NextResponse.json({
      count: Object.keys(sessions).length,
      events: newEvents,
    });
  } catch {
    return NextResponse.json({ count: 0, events: [] });
  }
}

export async function GET() {
  try {
    const sessions = cleanSessions(await readJSON<Sessions>(SESSION_FILE, {}));
    await writeJSON(SESSION_FILE, sessions);
    return NextResponse.json({ count: Object.keys(sessions).length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
