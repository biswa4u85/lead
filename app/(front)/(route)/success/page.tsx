"use client"
import { useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import success from "../../../images/success.png"
import { useReactToPrint } from "react-to-print";
import { useFetch } from "@/contexts/useFetch";
import { usePost } from "@/contexts/usePost";
import { usePatch } from "@/contexts/usePatch";
import language from "@/contexts/language";


export default function Page() {
    const router = useRouter();
    const printInfoRef: any = useRef();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const payment_intent = searchParams.get('payment_intent')
    const { data: lead } = useFetch({ url: "submit", query: JSON.stringify({ id }) });
    const { create, data: respond, loading } = usePost();

    const calcTotal = (items: any, type = 'all') => {
        let total = 0
        for (let item of items) {
            item.qty = Number(item.qty)
            item.rate = Number(item.rate)
            item.tax = Number(item.tax ?? 1)
            if (type == 'all') {
                total += (item.qty && item.rate) ? Number(item.qty * item.rate) + Number(item.tax ?? 1 * Number(item.qty * item.rate) / 100) : 0
            } else {
                total += (item.qty && item.rate) ? Number(item.qty * item.rate) : 0
            }
        }
        return total
    }

    const handlePrint = useReactToPrint({
        content: () => printInfoRef.current
    });

    const { edit } = usePatch();
    const makePaymentEntry = useCallback(async (leads: any) => {
        if (leads) {
            create("payments", { userId: leads?.invoice?.userId, type: "card", amount: Number(leads?.invoice?.items ? calcTotal(leads?.invoice?.items) : 0), refId: payment_intent, paymentType: leads?.invoice?.leadType, leadId: id })
            edit("submit", { type: leads.invoice.leadType, id: leads.id, name: leads.invoice.userId, status: "active", assignStatus: 'active', profeionalId: leads?.invoice?.userId })
        }
    }, []);

    useEffect(() => {
        makePaymentEntry(lead.data)
    }, [lead.data])

    return (
        <>
            <div className="bg-white p-8 rounded-md w-1/3 mx-auto shadow-[0px_0px_10px_1px_#F2F6FB] my-10">
                <div ref={printInfoRef} className="print_css">
                    <div className="flex flex-col items-center">
                        <Image
                            alt=""
                            src={success}
                            className="rounded-full "
                        /></div>
                    <p className="pt-5 font-semibold text-center text-indigo-900 text-sm2 font-inter">{language.payment_sucessful}</p>
                    <p className="pb-5 font-normal text-center border-b border-gray-700 font-inter text-deepblack-100 font-xs">{language.payment_id} :{payment_intent}</p>

                    <div className="flex items-center justify-between pt-5">
                        <p className="text-sm font-semibold font-inter text-deepblack-100">{language.amount} :</p>
                        <p className="font-semibold text-sm1 text-deepblack-100">${Number(lead?.data?.invoice?.items ? calcTotal(lead?.data?.invoice?.items) : 0)}</p>
                    </div>
                    <div className="flex items-center justify-between pb-5">
                        <p className="text-sm font-semibold font-inter text-deepblack-100">{language.Category} :</p>
                        <p className="font-semibold text-sm1 text-deepblack-100">{lead?.data?.invoice?.leadType == "depannage" ? lead?.data?.depannageCategory?.name : ""}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-7">
                    <button onClick={handlePrint} type="submit" className="px-5 py-2 my-5 text-sm font-medium text-white bg-indigo-500 rounded-md font-inter">
                    {language.download}
                    </button>
                    <button onClick={() => router.push(`/`)} type="submit" className="p-2 px-5 py-2 my-5 text-sm font-medium border border-indigo-500 rounded-md text-graylight-900 font-inter">
                    {language.cancel}
                    </button>
                </div>
            </div>
        </>
    );
}