import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import bcryptjs from "bcryptjs";

const resource = "user";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { email } = data;

        const user: any = await prisma[resource].findUnique({ where: { email } });
        if (user) return errorResponse("User already Exists", 400);

        // Hash password
        if (data.password) {
            const salt = await bcryptjs.genSalt(10)
            data.password = await bcryptjs.hash(data.password, salt)
        }
        delete data.cPassword
        delete data.terms

        const res = await prisma[resource].create({ data });
        return successResponse(res);
    } catch (error: any) {
        console.log(error)
        errorResponse(error.message);
    }
}