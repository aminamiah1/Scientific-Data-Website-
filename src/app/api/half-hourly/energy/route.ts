import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Half hourly heat production and energy consumption - GET request" }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ status: 200 });
}
