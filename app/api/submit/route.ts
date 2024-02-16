import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { sendEmail } from "../emails";
import language from "@/contexts/language";

const subRes: any = "invoice";

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        const invoice = await (prisma[subRes] as any).findUnique({
            where: { id }
        });
        if (!invoice) return errorResponse("Invoice Not Found");
        if (!invoice?.userId) return errorResponse("Professional Not Found");
        if (!invoice?.leadId) return errorResponse("Lead Not Found");

        const resource: any = String(invoice.leadType)

        let include: any = { address: true }
        if (resource == 'depannage') {
            include['depannageCategory'] = { select: { name: true, price: true } }
        } else {
            include['batimentCategory'] = { select: { name: true } }
        }
        let where: any = {}
        if (id) where['id'] = invoice?.leadId
        const result = await (prisma[resource] as any).findUnique({
            where,
            include
        });
        const profeional = await prisma.user.findUnique({
            where: { id: invoice?.userId }
        });
        let checkStatus = result.assignTo.find((item: any) => item.name == invoice.userId)
        if (checkStatus.status == 'refused') return errorResponse("Already Refused");
        if (!result) return errorResponse("Record Not Found");
        return successResponse({ ...result, profeional, invoice });
    } catch (error: any) {
        errorResponse(error.message);
    }
}

export async function PATCH(request: NextRequest) {
    try {

        const data = await request.json();
        let id = JSON.parse(JSON.stringify(data.id))
        delete data.id

        const { type, assignedDate, assignStatus, profeionalId, name, status } = data
        const lead = await (prisma[type] as any).findMany({
            where: { id },
            include: { address: true }
        })
        let allAssigns = lead[0].assignTo
        let index = lead[0].assignTo.findIndex((item: any) => item.name == name)
        allAssigns[index] = { status, name }
        const res = await (prisma[type] as any).update({
            where: { id },
            data: { assignedDate, assignStatus, profeionalId, assignTo: allAssigns }
        });

        if (status == 'active' && name) {
            // Email to Admin when Customer Acept
            const admin: any = await prisma.user.findFirst({ where: { role: "admin" } });
            let title = language?.admin_emails?.quote_cus_title
            title = title.replace('[project]', `${lead[0].title}`);
            let body = language?.admin_emails?.quote_cus_body
            sendEmail(admin.email, `${admin.firstName} ${admin.lastName}`, title, body)

            // Email to Customer when Signature Done
            let title1 = language?.customer_emails?.signature_title
            let body1 = language?.customer_emails?.signature_body
            body1 = body1.replace('[name]', `${lead[0].address.firstName} ${lead[0].address.lastName}`);
            body1 = body1.replace('[project]', `${lead[0].title}`);
            sendEmail(lead[0].address.email, `${lead[0].address.firstName} ${lead[0].address.lastName}`, title1, body1)


        }

        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}

