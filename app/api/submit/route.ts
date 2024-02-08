import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";

const subRes = "user";

export async function GET(request: NextRequest) {
    try {
        const resource: any = String(request.nextUrl.searchParams.get("type")) || 'batiment'
        const id = request.nextUrl.searchParams.get("id")
        let include: any = { address: true }
        if (resource == 'depannage') {
            include['depannageCategory'] = { select: { name: true, price: true } }
        } else {
            include['batimentCategory'] = { select: { name: true } }
            include['batimentType'] = { select: { name: true } }
        }
        let where: any = {}
        if (id) where['id'] = id
        const result = await (prisma[resource] as any).findUnique({
            where,
            include
        });
        if (!result?.assignTo) return errorResponse("Assign Not Found");
        const profeional = await prisma.user.findUnique({
            where: { id: result?.assignTo }
        });
        const invoice = await prisma.invoice.findMany({
            where: { userId: result?.assignTo, leadId: result?.id }
        });
        if (!invoice) return errorResponse("Invoice Not Found");
        if (!result) return errorResponse("Record Not Found");
        return successResponse({ ...result, profeional, invoice: invoice[0] ?? {} });
    } catch (error: any) {
        errorResponse(error.message);
    }
}


export async function PATCH(request: NextRequest) {
    try {

        const data = await request.json();
        let id = JSON.parse(JSON.stringify(data.id))
        let resource = JSON.parse(JSON.stringify(data.type)) || 'batiment'
        delete data.id
        delete data.type

        const { assignStatus } = data
        const res = await (prisma[resource] as any).update({
            where: { id },
            data: { assignStatus }
        });
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}