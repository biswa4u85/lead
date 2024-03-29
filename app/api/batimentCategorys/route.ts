import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { getToken } from "@/libs/getToken";
import language from "@/contexts/language";
import { sendEmail } from "../emails";

const resource = "batimentCategory";

export async function GET(request: NextRequest) {
    try {
        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0
        const take = Number(request.nextUrl.searchParams.get("take")) || 100
        const parentId = request.nextUrl.searchParams.get("parentId")
        const ids = request.nextUrl.searchParams.get("ids")
        const showAll = request.nextUrl.searchParams.get("showAll") || false

        let where: any = {}
        if (ids) where['id'] = { in: ids.split(',') }

        if (parentId) {
            let include: any = {}
            if (parentId != "0") {
                include['parent'] = { select: { id: true, name: true } }
            }
            const result = await prisma[resource].findMany({
                where: {
                    parentId
                },
                include
            });
            if (!result) return errorResponse("Record Not Found");
            return successResponse(result);
        } else if (showAll) {
            const result = await prisma[resource].findMany({
                skip,
                take,
                where
            });
            if (!result) return errorResponse("Record Not Found");
            return successResponse(result);
        } else if (skip == 0) {
            const counts = await prisma[resource].count()
            const findRootCategories = await prisma[resource].findMany({
                where: {
                    parentId: "0"
                }
            });
            const result = await prisma[resource].findMany({
                where: {
                    parentId: {
                        not: "0",
                    },
                },
                skip,
                take: 10 - findRootCategories.length,
                include: {
                    parent: { select: { id: true, name: true }, }
                }
            });
            if (!result) return errorResponse("Record Not Found");
            return successResponse([...findRootCategories, ...result], counts);
        } else {
            const counts = await prisma[resource].count()
            const result = await prisma[resource].findMany({
                where: {
                    parentId: {
                        not: "0",
                    },
                },
                skip,
                take,
                include: {
                    parent: { select: { id: true, name: true }, }
                }
            });
            if (!result) return errorResponse("Record Not Found");
            return successResponse(result, counts);
        }
    } catch (error: any) {
        errorResponse(error.message);
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const data = await request.json();
        const res = await prisma[resource].create({ data });

        // Send Email to Users
        const users: any = await prisma.user.findMany({ where: { role: "user" } });
        for (let user of users) {
            let title = language?.professional_emails?.validation_title
            let body = language?.professional_emails?.validation_body
            body = body.replace('[name]', `${user.firstName} ${user.lastName}`);
            body = body.replace('[url]', `${process.env.SITE_URL}/`);
            sendEmail(user.email, `${user.firstName} ${user.lastName}`, title, body)
        }

        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const data = await request.json();
        const { id, name, icon, description, parentId, isParent } = data
        const res = await prisma[resource].update({
            where: { id },
            data: { name, icon, description, parentId, isParent }
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

        const res = await prisma[resource].delete({ where: { id } });
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}