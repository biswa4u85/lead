import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return;
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });
        if (!currentUser) throw Error("User Not Found")
        return NextResponse.json(currentUser);
    } catch (e: any) {
        NextResponse.json({ "dc": "sdvfd" });
    }
}