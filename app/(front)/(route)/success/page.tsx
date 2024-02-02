"use client"
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import success from "../../../images/success.png"
import { useReactToPrint } from "react-to-print";
import { useFetch } from "@/contexts/useFetch";
import { usePost } from "@/contexts/usePost";

export default function Page() {
    const router = useRouter();
    const printInfoRef: any = useRef();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const type = searchParams.get('type')
    const payment_intent = searchParams.get('payment_intent')
    const { data: lead } = useFetch({ url: "submit", query: JSON.stringify({ type, id }) });
    const { create, data: respond, loading } = usePost();

    const handlePrint = useReactToPrint({
        content: () => printInfoRef.current
    });

    useEffect(() => {
        if (lead?.data && payment_intent) {
            create("payments", { userId: lead?.data?.profeionalId, type: "card", amount: Number(lead?.data?.depannageCategory?.price), refId: payment_intent, leadType: type, leadId: id })
        }
    }, [lead, payment_intent])

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
                    <p className="pt-5 font-semibold text-center text-indigo-900 text-sm2 font-inter">Payment Successfully</p>
                    <p className="pb-5 font-normal text-center border-b border-gray-700 font-inter text-deepblack-100 font-xs">Payment ID :{payment_intent}</p>

                    <div className="flex items-center justify-between pt-5">
                        <p className="text-sm font-semibold font-inter text-deepblack-100">Amount Paid :</p>
                        <p className="font-semibold text-sm1 text-deepblack-100">${(type == "depannage" && lead?.data) ? Number(lead?.data?.depannageCategory?.price) : 0}</p>
                    </div>
                    <div className="flex items-center justify-between pb-5">
                        <p className="text-sm font-semibold font-inter text-deepblack-100">Depannage Category :</p>
                        <p className="font-semibold text-sm1 text-deepblack-100">{type == "depannage" ? lead?.data?.depannageCategory?.name : ""}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-7">
                    <button onClick={handlePrint} type="submit" className="px-5 py-2 my-5 text-sm font-medium text-white bg-indigo-500 rounded-md font-inter">
                        Download
                    </button>
                    <button onClick={() => router.push(`/`)} type="submit" className="p-2 px-5 py-2 my-5 text-sm font-medium border border-indigo-500 rounded-md text-graylight-900 font-inter">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}