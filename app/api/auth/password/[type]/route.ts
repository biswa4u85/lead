import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import language from "@/contexts/language";
import { sendEmail } from "../../../emails";

const resource = "user";
const subResource = "otp";

export async function POST(request: NextRequest) {
    try {
        const type = request.url.split("password/")[1];
        const data = await request.json();
        const { email, otp, token, password } = data;

        // Make Otp
        let newOtp = getOtp()

        let ifUser: any = await prisma[resource].findUnique({ where: { email } });
        let ifOtp: any = await prisma[subResource].findUnique({ where: { phoneEmail: email } });

        switch (type) {

            case 'validate-email':
                try {
                    // Check User & Otp  if Exit
                    if (!ifUser) return errorResponse("User Not Exit !!");
                    if (!ifOtp) return errorResponse("Otp Not Exit !!");
                    if (ifOtp.otp != token) return errorResponse("Invalid OTP");

                    // Verified Email
                    await prisma[resource].update({ where: { email }, data: { emailVerified: true } });
                    await prisma[subResource].delete({ where: { phoneEmail: email, otp: Number(token) } });
                    return successResponse({ message: `Email Validated Successfully`, success: true });
                } catch (error: any) {
                    errorResponse(error.message);
                }

            case 'forget':
                try {

                    // Check User if Exit
                    if (!ifUser) return errorResponse("User Not Exit !!");
                    if (ifOtp) {
                        await prisma[subResource].update({ where: { phoneEmail: email }, data: { otp: newOtp } });
                    } else {
                        await prisma[subResource].create({ data: { otp: newOtp, phoneEmail: email } });
                    }

                    let title = language?.professional_emails?.forgot_title
                    let body = language?.professional_emails?.forgot_body
                    body = body.replace('[name]', `${ifUser.firstName} ${ifUser.lastName}`);
                    body = body.replace('[url]', `OTP is: [ ${newOtp} ]`);
                    sendEmail(ifUser.email, `${ifUser.firstName} ${ifUser.lastName}`, title, body)

                    return successResponse({ message: `OTP sent successfully`, email, success: true });
                } catch (error: any) {
                    errorResponse(error.message);
                }

            case 'reset':
                try {

                    // Check User & Otp  if Exit
                    if (!ifUser) return errorResponse("User Not Exit !!");
                    if (!ifOtp) return errorResponse("Otp Not Exit !!");
                    if (ifOtp.otp != token) return errorResponse("Invalid OTP");

                    // Hash password
                    if (password) {
                        const salt = await bcryptjs.genSalt(10)
                        const newPassword = await bcryptjs.hash(password, salt)
                        await prisma[resource].update({ where: { email }, data: { password: newPassword } });
                        await prisma[subResource].delete({ where: { phoneEmail: email, otp: Number(token) } });
                        return successResponse({ message: `Password change successfully`, success: true });
                    }
                    return errorResponse("Invalid Password");
                } catch (error: any) {
                    errorResponse(error.message);
                }


            case 'validate':
                // Check User if Exit
                const ifExistUser: any = await prisma[subResource].findUnique({ where: { phoneEmail: email } });
                if (!ifExistUser) return errorResponse("Seems Otp expired !!");
                if (ifExistUser.otp != otp) return errorResponse("Invalid OTP");

                // Login User
                const users: any = await prisma[resource].findMany({ where: { email } });
                if (users && users.length == 0) return errorResponse("User Not Exit !!");
                let user = users[0]

                //create token data
                const tokenData = {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                }
                //create token
                const tokens = await jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, { expiresIn: "1d" })
                user['token'] = tokens
                return successResponse(user);

            default:
                return errorResponse("Something went wrong.");
        }
    } catch (error: any) {
        errorResponse(error);
    }
}

// util to generate otp
let getOtp = () => {
    return (
        Math.floor(Math.random() * (9 * Math.pow(10, 4 - 1))) + Math.pow(10, 4 - 1)
    );
};