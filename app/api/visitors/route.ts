import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = process.env.VERCEL
  ? path.join("/tmp", "visitors.json")
  : path.join(process.cwd(), ".visitors.json");

const TTL = 30_000;
const EVENT_TTL = 30_000;

type Sessions = Record<string, number>;

type VisitorEvent = {
  id: number;
  sessionId: string;
  location: string;
  timestamp: number;
};

type Store = {
  sessions: Sessions;
  events: VisitorEvent[];
  nextEventId: number;
};

function emptyStore(): Store {
  return { sessions: {}, events: [], nextEventId: 1 };
}

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(store), "utf-8");
}

function clean(s: Store): Store {
  const now = Date.now();
  for (const [id, time] of Object.entries(s.sessions)) {
    if (now - time > TTL) delete s.sessions[id];
  }
  const cutoff = now - EVENT_TTL;
  s.events = s.events.filter((e) => e.timestamp > cutoff);
  return s;
}

function location(req: Request): string {
  const city = req.headers.get("x-vercel-ip-city") || "";
  const region = req.headers.get("x-vercel-ip-country-region") || "";
  const country = req.headers.get("x-vercel-ip-country") || "";
  const parts = [city, region, country].filter(Boolean);
  return parts.join(", ") || "Unknown location";
}

export async function POST(req: Request) {
  try {
    const { sessionId, lastEventId = 0 } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    let store = clean(await readStore());

    const isNew = !store.sessions[sessionId];
    store.sessions[sessionId] = Date.now();

    if (isNew) {
      store.events.push({
        id: store.nextEventId++,
        sessionId,
        location: location(req),
        timestamp: Date.now(),
      });
    }

    await writeStore(store);

    // Return only events NOT created by this session (everyone else should see them)
    const newEvents = store.events.filter(
      (e) => e.id > lastEventId && e.sessionId !== sessionId
    );

    return NextResponse.json({
      count: Object.keys(store.sessions).length,
      events: newEvents.map((e) => ({ id: e.id, location: e.location })),
    });
  } catch {
    return NextResponse.json({ count: 0, events: [] });
  }
}

export async function GET() {
  try {
    const store = clean(await readStore());
    await writeStore(store);
    return NextResponse.json({ count: Object.keys(store.sessions).length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
