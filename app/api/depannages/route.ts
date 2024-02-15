import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { getToken } from "@/libs/getToken";
import { sendEmail, sendSms } from "../emails";
import language from "@/contexts/language";

const resource = "depannage";
const assignresource = "user";

export async function GET(request: NextRequest) {
    try {

        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0
        const take = Number(request.nextUrl.searchParams.get("take")) || 100

        const counts = await prisma[resource].count()
        const result = await prisma[resource].findMany({
            skip,
            take,
            include: { address: true, depannageCategory: { select: { name: true, price: true } } }
        });
        if (!result) return errorResponse("Record Not Found");
        return successResponse(result, counts);
    } catch (error: any) {
        errorResponse(error.message);
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { depannageCategoryId, title, description, firstName, lastName, city, email, phone, postalCode } = data
        const address = { firstName, lastName, city, email, phone, postalCode }
        const res = await prisma[resource].create({
            data: {
                title, description, depannageCategoryId,
                address: {
                    create: address
                }
            }
        });
        autoAssignTo(res, address)
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error.message);
    }
}

async function autoAssignTo(data: any, address: any) {
    let where: any = {}
    if (data.depannageCategoryId) {
        where['category_new'] = { has: data.depannageCategoryId }
    }
    const users: any = await prisma[assignresource].findMany({ where });
    const allAssigns = users.map((item: any) => {
        return { name: item.id, status: "new" }
    });
    await prisma[resource].update({
        where: { id: data.id },
        data: { assignTo: allAssigns }
    });

    // Email to Admin
    const admin: any = await prisma[assignresource].findMany({ where: { role: "admin" } });
    if (admin && admin[0]) {
        let title = language?.admin_emails?.new_lead_title
        let body = language?.admin_emails?.new_lead_body
        body = body.replace('[name_cus]', `${address.firstName} ${address.lastName}`);
        body = body.replace('[email_cus]', `${address.email}`);
        body = body.replace('[phone_cus]', `${address.phone}`);
        body = body.replace('[title]', `${data.title}`);
        body = body.replace('[message]', `${data.description}`);
        sendEmail(admin[0].email, `${admin[0].firstName} ${admin[0].lastName}`, title, body)
    }

    // Email to Customer
    let title = language?.customer_emails?.receipt_title
    let body = language?.customer_emails?.receipt_body
    body = body.replace('[name]', `${address.firstName} ${address.lastName}`);
    sendEmail(address.email, `${address.firstName} ${address.lastName}`, title, body)

    // SMS to Pros
    for (let user of users) {
        let body = language?.professional_sms?.project_allocation_body
        body = body.replace('[project]', `${data.title}`);
        body = body.replace('[url]', `${data.title}`);
        sendSms(user.phone, body)
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const data = await request.json();
        let id = JSON.parse(JSON.stringify(data.id))
        delete data.id
        delete data.edit

        const { depannageCategoryId, title, description, status, firstName, lastName, city, email, phone, postalCode } = data
        const address = { firstName, lastName, city, email, phone, postalCode }
        const res = await prisma[resource].update({
            where: { id },
            data: { depannageCategoryId, title, description, status, address: { update: address } },
            include: { address: true }
        });
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const id: any = request.nextUrl.searchParams.get("id")
        if (!id) return errorResponse("Record Not Found");

        const res = await prisma[resource].delete({ where: { id }, include: { address: true } });
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}