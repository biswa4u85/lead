"use client"
import { useState, useRef, useEffect } from 'react';
import { AiOutlineDoubleRight, AiFillHome } from "react-icons/ai";
import { useFetch } from "@/contexts/useFetch";
import Image from "next/image";
import { useFetchByLoad } from "@/contexts/useFetchByLoad";


export default function Page({ params }: { params: { id: string } }) {
    const printInfoRef: any = useRef();
    const [leadId, setLeadId] = useState('')
    const [userId, setUserId] = useState('')

    const { data: invoices } = useFetch({ url: "invoices", query: JSON.stringify({ id: params.id }) });
    let invoice = invoices?.data ? invoices.data[0] : {}

    const { fetch, data: leads } = useFetchByLoad({ url: "findProjects", query: JSON.stringify({ id: leadId }) });
    let lead = leads?.data ? leads.data[0] : {}

    const { fetch: fetchUser, data: users } = useFetchByLoad({ url: "users", query: JSON.stringify({ id: userId }) });
    let user = users?.data ? users.data[0] : {}

    useEffect(() => {
        if (invoice.id) {
            setLeadId(invoice.leadId)
            setUserId(invoice.userId)
        }
    }, [invoice.id])

    useEffect(() => {
        if (leadId) {
            fetch()
            fetchUser()
        }
    }, [leadId])


    const calcTotal = (items: any, type = 'all') => {
        let total = 0
        for (let item of items) {
            if (type == 'all') {
                total += (item.qty && item.rate) ? Number(item.qty * item.rate) + Number(item.tax ?? 1 * Number(item.qty * item.rate) / 100) : 0
            } else {
                total += (item.qty && item.rate) ? Number(item.qty * item.rate) : 0
            }
        }
        return total
    }

    return (
        <>
            <div className="container p-10 mx-auto mb-10 md:mb-10">
                <div className="flex items-center pb-8">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">Project Detail</p>
                </div>
                <div className="grid md:grid-cols-1 gap-9">
                    <div ref={printInfoRef} className="text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">

                        <div className="grid md:grid-cols-2 gap-9">
                            <div className="col-span-1 p-3 border border-gray-300 rounded">
                                <p className="text-xs font-medium text-deep-black font-inter">Client Details</p>
                                <div className="my-3 font-normal text-gray-800 font-inter text-xs1">
                                    <p>{lead?.address?.firstName} {lead?.address?.lastName}</p>
                                    <p>{lead?.address?.city}, {lead?.address?.postalCode}</p>
                                </div>

                                <div className="font-normal text-gray-800 font-inter text-xs1">
                                    <p>{lead?.address?.email}</p>
                                    <p>{lead?.address?.phone}</p>
                                </div>
                                {lead.signature && (<img alt="" width={200} height={200} src={lead.signature} />)}
                            </div>
                            <div className="col-span-1">
                                <div className="col-span-1 p-3 border border-gray-300 rounded">
                                    <p className="text-xs font-medium text-deep-black font-inter">Professional</p>
                                    <div className="my-3 font-normal text-gray-800 font-inter text-xs1">
                                        <p>{user?.firstName} {user?.lastName}</p>
                                        <p>{user?.company}, {user?.postalCode}</p>
                                    </div>

                                    <div className="font-normal text-gray-800 font-inter text-xs1">
                                        <p>{user?.email}</p>
                                        <p>{user?.phone}</p>
                                    </div>
                                    {invoice.signature && (<img alt="" width={200} height={200} src={invoice.signature} />)}
                                </div>
                            </div>
                        </div>
                        <p className="pt-4 font-normal text-xs2 text-graylight-900">Description</p>
                        <p className="pt-4 font-normal text-xs2 text-graylight-900">{invoice?.description}</p>

                        <div className="flex flex-col py-4">
                            <div className="grid grid-cols-3 mb-4">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">Contract Start</p>
                                    <p className="text-sm font-semibold text-deep-black">{new Date(invoice?.contractStart).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">Contract End</p>
                                    <p className="text-sm font-semibold text-deep-black">{new Date(invoice?.contractEnd).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <table className="w-full border">
                            <thead>
                                <tr className="font-normal text-left text-white bg-indigo-800 text-xs1 font-inter">
                                    <th className="p-2">Items</th>
                                    <th className="p-2">QTY/HRS</th>
                                    <th className="p-2">Rate</th>
                                    <th className="p-2">Tax</th>
                                    <th className="p-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice?.items && invoice?.items.map((item: any, key: any) => <tr key={key}>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item.name}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item.qty}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${item.rate}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item.tax}%</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${Number(item.rate) + Number(item.tax * Number(item.qty) / 100)}</td>
                                </tr>)}
                            </tbody>
                        </table>

                        <div className="grid md:grid-cols-3">
                            <div></div>
                            <div></div>
                            <div className="mt-8 border border-gray-200 rounded-sm mb-15">
                                <p className="py-2 font-bold text-center text-white bg-indigo-800 rounded-t-sm text-xs1 font-inter">Invoice Summary</p>
                                <div className="px-2">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Subtotal</p>
                                        {invoice?.items && (<p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{calcTotal(invoice.items, 'total')}</span></p>)}
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Tax</p>
                                        {invoice?.items && (<p className="font-light font-inter text-xs1 text-black-100">{invoice?.items[0].tax}%</p>)}
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Total</p>
                                        {invoice?.items && (<p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{calcTotal(invoice.items)}</span></p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}