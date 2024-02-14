import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { getToken } from "@/libs/getToken";
import { sendEmail } from "../emails";
import language from "@/contexts/language";

const resource = "batiment";
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
            include: { address: true, batimentCategory: { select: { name: true } }, batimentType: { select: { name: true } } }
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
        const { batimentCategoryId, batimentTypeId, title, description, firstName, lastName, city, email, phone, postalCode } = data
        const address = { firstName, lastName, city, email, phone, postalCode }
        const res = await prisma[resource].create({
            data: {
                title, description, batimentCategoryId, batimentTypeId,
                address: {
                    create: address
                }
            }
        });
        autoAssignTo(res)
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error.message);
    }
}

async function autoAssignTo(data: any) {
    let where: any = {}
    if (data.batimentCategoryId) {
        where['category'] = { has: data.batimentCategoryId }
    }
    if (data.batimentTypeId) {
        where['service'] = { has: data.batimentTypeId }
    }
    const users: any = await prisma[assignresource].findMany({ where });
    const allAssigns = users.map((item: any) => {
        return { name: item.id, status: "new" }
    });
    await prisma[resource].update({
        where: { id: data.id },
        data: { assignTo: allAssigns }
    });

    // Email Admin
    const admin: any = await prisma[assignresource].findMany({ where: { role: "admin" } });
    if (admin && admin[0]) {
        let title = language?.professional_emails?.newLead_admin_title
        let body = language?.professional_emails?.newLead_admin_body
        body = body.replace('[name]', `${data.firstName} ${data.lastName}`);
        body = body.replace('[email]', `${data.email}`);
        body = body.replace('[phone]', `${data.phone}`);
        body = body.replace('[title]', `${data.title}`);
        body = body.replace('[message]', `${data.description}`);
        sendEmail(admin[0].email, `${admin[0].firstName} ${admin[0].lastName}`, title, body)
    }

    // Email Pro Users
    for (let user of users) {
        let title = language?.professional_emails?.newLead_pro_title
        let body = language?.professional_emails?.newLead_pro_body
        body = body.replace('[name]', `${user.firstName} ${user.lastName}`);
        body = body.replace('[project]', `${data.title}`);
        sendEmail(user.email, `${user.firstName} ${user.lastName}`, title, body)
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

        const { batimentCategoryId, batimentTypeId, title, description, status, firstName, lastName, city, email, phone, postalCode } = data
        const address = { firstName, lastName, city, email, phone, postalCode }
        const res = await prisma[resource].update({
            where: { id },
            data: { batimentCategoryId, batimentTypeId, title, description, status, address: { update: address } },
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