import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }
  const { email } = await request.json();
  if (!email) {
    return new NextResponse(JSON.stringify({ message: "Email is required" }), {
      status: 400,
    });
  }
  try {
    const userToDelete = await prisma.user.findUnique({ where: { email } });
    if (!userToDelete) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    if (userToDelete.role !== "admin") {
      return new NextResponse(
        JSON.stringify({ message: "User is not an admin" }),
        { status: 403 }
      );
    }
    await prisma.user.delete({ where: { email } });
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
