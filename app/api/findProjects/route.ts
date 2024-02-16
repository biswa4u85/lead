import prisma from "@/libs/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/libs/utility";
import { getToken } from "@/libs/getToken";
import { sendEmail } from "../emails";
import language from "@/contexts/language";

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
        const status = request.nextUrl.searchParams.get("status")
        const assignStatus = request.nextUrl.searchParams.get("assignStatus")
        const profeionalId = request.nextUrl.searchParams.get("profeionalId")
        const id = request.nextUrl.searchParams.get("id")
        let where: any = {}
        if (title) where['title'] = { contains: title }
        if (profeionalId) where['profeionalId'] = profeionalId
        if (assignTo && status) where['assignTo'] = { has: { name: assignTo, status } }
        if (id) where['id'] = id
        if (assignStatus) where['assignStatus'] = assignStatus

        const result1 = await prisma[resource1].findMany({
            skip,
            take,
            where,
            include: { address: true, batimentCategory: { select: { name: true } } }
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

        const { type, assignedDate, assignStatus, assignTo, name, status, amount, invoiceId } = data
        const lead = await (prisma[type] as any).findMany({
            where: { id },
            include: { address: true }
        })

        let allAssigns = []
        if (assignTo) {
            allAssigns = assignTo
        } else {
            allAssigns = lead[0].assignTo
            let index = lead[0].assignTo.findIndex((item: any) => item.name == name)
            allAssigns[index] = { name, status }
        }
        const res = await (prisma[type] as any).update({
            where: { id },
            data: { assignedDate, assignStatus, assignTo: allAssigns, amount }
        });
        if (assignTo) {
            // Email Pro Users
            // let ids = allAssigns.map((item: any) => item.name)
            // const users: any = await prisma.user.findMany({ where: { id: { in: ids } } });
            // for (let user of users) {
            //     let title = language?.professional_emails?.newLead_pro_title
            //     title = title.replace('[project]', `${lead[0].title}`);
            //     let body = language?.professional_emails?.newLead_pro_body
            //     body = body.replace('[name]', `${user.firstName} ${user.lastName}`);
            //     body = body.replace('[project]', `${lead[0].title}`);
            //     sendEmail(user.email, `${user.firstName} ${user.lastName}`, title, body)
            // }
        }
        if (status == 'accepted' && name) {
            const admin: any = await prisma.user.findFirst({ where: { role: "admin" } });
            const user: any = await prisma.user.findUnique({ where: { id: name } });

            // Email to Admin when Accepted
            let title = language?.admin_emails?.accept_pro_title
            title = title.replace('[project]', `${lead[0].title}`);
            let body = language?.admin_emails?.accept_pro_body
            body = body.replace('[name_pro]', `${user.firstName} ${user.lastName}`);
            body = body.replace('[project]', `${lead[0].title}`);
            sendEmail(admin.email, `${admin.firstName} ${admin.lastName}`, title, body)

            // Email to Customer when Accepted
            let title1 = language?.customer_emails?.accept_title
            title1 = title1.replace('[name_pro]', `${user.firstName} ${user.lastName}`);
            let body1 = language?.customer_emails?.accept_body
            body1 = body1.replace('[name_pro]', `${user.firstName} ${user.lastName}`);
            body1 = body1.replace('[name]', `${lead[0].address.firstName} ${lead[0].address.lastName}`);
            sendEmail(lead[0].address.email, `${lead[0].address.firstName} ${lead[0].address.lastName}`, title1, body1)

            // Email to Pro when Customer Accepted
            let title2 = language?.professional_emails?.accept_order_title
            title2 = title2.replace('[project]', `${lead[0].title}`);
            let body2 = language?.professional_emails?.accept_order_body
            body2 = body2.replace('[name]', `${user.firstName} ${user.lastName}`);
            body2 = body2.replace('[url]', `${process.env.SITE_URL}/pro/estimate/${lead[0].id}?type=${type}`);
            sendEmail(user.email, `${user.firstName} ${user.lastName}`, title2, body2)

            // Email to Pro when Customer Accepted
            let title3 = language?.professional_emails?.clear_invoice_title
            title3 = title3.replace('[project]', `${lead[0].title}`);
            let body3 = language?.professional_emails?.clear_invoice_body
            body3 = body3.replace('[name]', `${user.firstName} ${user.lastName}`);
            body3 = body3.replace('[project]', `${lead[0].title}`);
            body3 = body3.replace('[url]', `${process.env.SITE_URL}/pro/invoice/${invoiceId}`);
            sendEmail(user.email, `${user.firstName} ${user.lastName}`, title3, body3)
        }
        if (status == 'pending' && name) {
            const admin: any = await prisma.user.findFirst({ where: { role: "admin" } });
            const user: any = await prisma.user.findUnique({ where: { id: name } });

            // Email to Admin when Pending
            let title = language?.admin_emails?.quote_pro_title
            title = title.replace('[project]', `${lead[0].title}`);
            let body = language?.admin_emails?.quote_pro_body
            body = body.replace('[name_pro]', `${user.firstName} ${user.lastName}`);
            body = body.replace('[project]', `${lead[0].title}`);
            body = body.replace('[amount]', `$${amount}`);
            sendEmail(admin.email, `${admin.firstName} ${admin.lastName}`, title, body)

            // Email to Customer when Signature
            let title1 = language?.customer_emails?.estimate_title
            let body1 = language?.customer_emails?.estimate_body
            body1 = body1.replace('[name_pro]', `${user.firstName} ${user.lastName}`);
            body1 = body1.replace('[name]', `${lead[0].address.firstName} ${lead[0].address.lastName}`);
            body1 = body1.replace('[url]', `${process.env.SITE_URL}/projects/${invoiceId}`);
            sendEmail(lead[0].address.email, `${lead[0].address.firstName} ${lead[0].address.lastName}`, title1, body1)

            // Email to Pro when make new Invoice
            let title2 = language?.professional_emails?.invoice_title
            title2 = title2.replace('[project]', `${lead[0].title}`);
            let body2 = language?.professional_emails?.invoice_body
            body2 = body2.replace('[name]', `${user.firstName} ${user.lastName}`);
            body2 = body2.replace('[project]', `${lead[0].title}`);
            body2 = body2.replace('[url]', `${process.env.SITE_URL}/pro/invoice/${invoiceId}`);
            sendEmail(user.email, `${user.firstName} ${user.lastName}`, title2, body2)
        }
        return successResponse(res);
    } catch (error: any) {
        errorResponse(error);
    }
}