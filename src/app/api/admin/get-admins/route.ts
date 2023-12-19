import { db } from "@/app/utils/data";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
        return new NextResponse(
            JSON.stringify({ message: "Method Not Allowed" }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== "admin") {
        return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    try {
        const admins = await db.user.findMany({
            where: { role: "admin" },
            select: { id: true, name: true, email: true },
        });

        return new NextResponse(JSON.stringify(admins), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Request error", error);
        return new NextResponse(
            JSON.stringify({ error: "Error fetching admins" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
