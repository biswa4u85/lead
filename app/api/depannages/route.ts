import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { getToken } from "@/libs/getToken";

const resource = "depannage";

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
            include: { address: true, depannageCategory: { select: { name: true, price:true } } }
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
        return successResponse(res);
    } catch (error: any) {
        console.log(error)
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