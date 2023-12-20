import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/utils/data";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
            status: 403,
        });
    }
    const { email } = await request.json();
    if (!email) {
        return new NextResponse(
            JSON.stringify({ message: "Email is required" }),
            {
                status: 400,
            }
        );
    }
    try {
        const userToDelete = await db.user.findUnique({ where: { email } });
        if (!userToDelete) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                {
                    status: 404,
                }
            );
        }
        if (userToDelete.role !== "admin") {
            return new NextResponse(
                JSON.stringify({ message: "User is not an admin" }),
                { status: 403 }
            );
        }
        await db.user.delete({ where: { email } });
        return new NextResponse(
            JSON.stringify({ message: "Admin deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
