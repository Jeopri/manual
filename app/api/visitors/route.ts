import { NextResponse } from "next/server";

const NAMESPACE = "jeopri";
const KEY = "portfolio-visits";
const API = "https://api.countapi.xyz";

export async function POST() {
  try {
    const res = await fetch(`${API}/hit/${NAMESPACE}/${KEY}`);
    const data = await res.json();
    return NextResponse.json({ count: data.value });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function GET() {
  try {
    const res = await fetch(`${API}/get/${NAMESPACE}/${KEY}`);
    const data = await res.json();
    return NextResponse.json({ count: data.value });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
