"use client"
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Buttons } from "@/components/RenderFroms";
import { AiOutlineDoubleRight, AiFillHome } from "react-icons/ai";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify';
import language from "@/contexts/language";



export default function Page({ params }: { params: { id: string } }) {
    const { data } = useSession()
    const printInfoRef: any = useRef();
    const router = useRouter();
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const { data: leads } = useFetch({ url: "findProjects", query: JSON.stringify({ type, id: params.id, status, assignTo: (data?.user as any)?.id }) });
    let lead = leads?.data ? leads.data[0] : {}

    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (assignStatus: any) => {
        if (status == 'accepted') {
            router.push(`/pro/proposals/${lead?.id}?status=${status}&type=${lead?.batimentCategoryId ? "batiment" : "depannage"}`)
        } else {
            edit("findProjects", { type, id: params.id, name: (data?.user as any)?.id, status: assignStatus })
        }
    }
    useEffect(() => {
        if (respond) {
            toast.success(`Signature update successfully`);
            router.push(`/pro`)
        }
    }, [respond])

    return (
        <>
            <div className="container p-10 mx-auto mb-10 md:mb-10">
                <div className="flex items-center pb-8">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">{language.project}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div ref={printInfoRef} className="md:col-span-2 sm:col-span-1 text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">
                        <h3 className="pb-6 font-medium text-indigo-800 text-2xs font-inter">{lead?.title}</h3>

                        {lead?.batimentCategory && (<div className="flex flex-col py-4">
                            <div className="grid grid-cols-2 mb-2">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">{language.carry_out}</p>
                                    <p className="text-sm font-semibold text-deep-black">{lead?.batimentCategory?.name}</p>
                                </div>
                            </div>
                        </div>)}

                        {lead?.depannageCategory && (<div className="flex flex-col py-4">
                            <div className="grid grid-cols-2 mb-2">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">{language.carry_out}</p>
                                    <p className="text-sm font-semibold text-deep-black">{lead?.depannageCategory?.name}</p>
                                </div>
                            </div>
                        </div>)}
                        <p className="py-4 font-normal text-xs2 text-graylight-900">{lead?.description}</p>
                    </div>

                    <div className="col-span-1">

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] p-3 mb-5">
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.posted}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{new Date(lead?.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.assigned}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{new Date(lead?.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] p-3">
                            <p className="text-sm font-medium font-inter text-graylight-800">{language.client_details}</p>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.name}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.firstName} {lead?.address?.lastName}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.address}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.full_address}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.city_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.city}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.postal_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.postalCode}</p>
                            </div>
                            {lead?.assignStatus == "accepted" && (<div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.phone_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.phone}</p>
                            </div>)}
                            {lead?.assignStatus == "accepted" && (<div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.email_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.email}</p>
                            </div>)}
                            {lead?.assignStatus == "accepted" && (<div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.address}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.firstName} {lead?.address?.lastName}, {lead?.address?.company},  {lead?.address?.postalCode}</p>
                            </div>)}
                        </div>
                        {status == 'accepted'? <Buttons className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins" value="Submit Proposal" loading={loading} onClick={() => handleUpdate('submited')} /> :
                            <Buttons className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins" value="Accept" loading={loading} onClick={() => handleUpdate('accepted')} />}
                    </div>
                </div>
            </div>
        </>
    );
}