import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/utils/data";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
                status: 403,
            });
        }

        const { name, email } = await request.json();

        if (!name || !email) {
            return new NextResponse(
                JSON.stringify({ message: "Name and email are required" }),
                { status: 400 }
            );
        }

        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ message: "User already exists" }),
                { status: 400 }
            );
        }

        const newUser = await db.user.create({
            data: { name, email, role: "admin" },
        });

        return new NextResponse(JSON.stringify(newUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
