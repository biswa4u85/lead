import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { getToken } from "@/libs/getToken";

const resource1 = "batiment";
const resource2 = "depannage";

export async function GET(request: NextRequest) {
    try {

        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0
        const take = Number(request.nextUrl.searchParams.get("take")) || 100
        const title = request.nextUrl.searchParams.get("search")
        const assignTo = request.nextUrl.searchParams.get("assignTo")
        const assignStatus = request.nextUrl.searchParams.get("assignStatus")
        const id = request.nextUrl.searchParams.get("id")
        let where: any = {}
        if (title) where['title'] = { contains: title }
        if (assignTo) where['assignTo'] = assignTo
        if (id) where['id'] = id
        if (assignStatus) where['assignStatus'] = assignStatus

        const result1 = await prisma[resource1].findMany({
            skip,
            take,
            where,
            include: { address: true, batimentCategory: { select: { name: true } }, batimentType: { select: { name: true } } }
        });
        const result2 = await prisma[resource2].findMany({
            skip,
            take,
            where,
            include: { address: true, depannageCategory: { select: { name: true, price: true } } }
        });
        if (!result1 || !result2) return errorResponse("Record Not Found");
        return successResponse([...result1, ...result2]);
    } catch (error: any) {
        errorResponse(error.message);
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getToken(request);
        if (!session) return errorResponse("You are not Not Authorized", 401);

        const data = await request.json();
        let id = JSON.parse(JSON.stringify(data.id))
        delete data.id

        const { type, assignedDate, assignStatus, assignTo } = data
        const res = await (prisma[type] as any).update({
            where: { id },
            data: { assignedDate, assignStatus, assignTo }
        });
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}