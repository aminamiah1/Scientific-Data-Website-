import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Breakdown heat - dwelling type - GET request" }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ status: 200 });
}
