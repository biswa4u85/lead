import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";

const resource = "batimentCategory";

export  async function GET(request: NextRequest) {
    try {

        const skip = Number(request.nextUrl.searchParams.get("skip")) || 0
        const take = Number(request.nextUrl.searchParams.get("take")) || 100

        const counts = await prisma[resource].count()
        const result = await prisma[resource].findMany({
            skip,
            take,
        });
        if (!result) return errorResponse("Record Not Found");
        return successResponse(result, counts);
    } catch (error: any) {
        errorResponse(error.message);
    }
}

export async function PATCH(request: NextRequest) {
    
}