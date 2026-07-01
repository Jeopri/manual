import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = process.env.VERCEL
  ? path.join("/tmp", "visitor-count.json")
  : path.join(process.cwd(), ".visitor-count.json");

async function readCount(): Promise<number> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw).count;
  } catch {
    return 0;
  }
}

async function writeCount(count: number): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify({ count }), "utf-8");
}

export async function POST() {
  try {
    const count = await readCount();
    await writeCount(count + 1);
    return NextResponse.json({ count: count + 1 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function GET() {
  try {
    const count = await readCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
