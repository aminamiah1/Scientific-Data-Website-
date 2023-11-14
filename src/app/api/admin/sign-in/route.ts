import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Log in - GET request" }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ status: 200 });
}
