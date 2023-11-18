import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Breakdown energy - total heat demand - GET request" }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ status: 200 });
}
