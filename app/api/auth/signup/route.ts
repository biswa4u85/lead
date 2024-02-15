import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import bcryptjs from "bcryptjs";
import language from "@/contexts/language";
import { sendEmail } from "../../emails";

const resource = "user";

export async function POST(request: NextRequest) {

    // Make Otp
    let newOtp = getOtp()

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

        // Send Email to Admin
        const admin: any = await prisma.user.findMany({ where: { role: "admin" } });
        if (admin && admin[0]) {
            let title = language?.admin_emails?.registration_title
            let body = language?.admin_emails?.registration_body
            body = body.replace('[name_pro]', `${res.firstName} ${res.lastName}`);
            body = body.replace('[email_pro]', `${res.email}`);
            body = body.replace('[phone_pro]', `${res.phone}`);
            sendEmail(admin[0].email, `${admin[0].firstName} ${admin[0].lastName}`, title, body)
        }

        // Send Email to User
        let title1 = language?.professional_emails?.welcome_title
        let body1 = language?.professional_emails?.welcome_body
        body1 = body1.replace('[name]', `${res.firstName} ${res.lastName}`);
        sendEmail(res.email, `${res.firstName} ${res.lastName}`, title1, body1)

        // Send Email to User for validate email
        await prisma.otp.create({ data: { otp: newOtp, phoneEmail: res.email } });
        let title2 = language?.professional_emails?.validate_title
        let body2 = language?.professional_emails?.validate_body
        body2 = body2.replace('[name]', `${res.firstName} ${res.lastName}`);
        body2 = body2.replace('[url]', `${process.env.SITE_URL}/auth/validate-email?email=${res.email}&token=${newOtp}`);
        sendEmail(res.email, `${res.firstName} ${res.lastName}`, title2, body2)

        return successResponse(res);
    } catch (error: any) {
        errorResponse(error.message);
    }
}


// util to generate otp
let getOtp = () => {
    return (
        Math.floor(Math.random() * (9 * Math.pow(10, 4 - 1))) + Math.pow(10, 4 - 1)
    );
};