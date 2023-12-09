import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        const user = await prisma.user.create({
            data: { email, name, password }
        });
        return NextResponse.json(user);
    } catch (error: any) {
        console.log({ error });
    }
}