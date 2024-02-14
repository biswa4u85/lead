import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import bcryptjs from "bcryptjs";
import language from "@/contexts/language";
import { sendEmail } from "../../emails";

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

        //Send Email
        if (res?.role && res.role == 'user') {
            let title = language?.professional_emails?.welcome_title
            let body = language?.professional_emails?.welcome_body
            const bodyWithName = body.replace('[name]', `${res.firstName} ${res.lastName}`);
            sendEmail(res.email, `${res.firstName} ${res.lastName}`, title, bodyWithName)
        }
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error.message);
    }
}