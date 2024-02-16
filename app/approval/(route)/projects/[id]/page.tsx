"use client"
import { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { Buttons } from "@/components/RenderFroms";
import { Select } from 'antd';
import { AiOutlineDoubleRight, AiFillHome } from "react-icons/ai";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { toast } from 'react-toastify';

export default function Page({ params }: { params: { id: string } }) {
    const printInfoRef: any = useRef();
    const router = useRouter();
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const [assignTo, setAssignTo] = useState([])

    const { data: users } = useFetch({ url: "users", query: JSON.stringify({ role: "user" }) });
    const userOptions = users?.data ? users.data.map((item: any) => {
        return { label: `${item?.firstName} ${item?.lastName}`, value: item?.id }
    }) : []
    const { data: leads } = useFetch({ url: "findProjects", query: JSON.stringify({ type, id: params.id }) });
    let lead = leads?.data ? leads.data[0] : {}

    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (assignStatus: any) => {
        if (assignTo.length > 0) {
            const assignOj = assignTo.map((item: any) => {
                return { name: item, status: 'new' }
            })
            edit("findProjects", { type, id: params.id, assignStatus, assignTo: assignOj, assignedDate: new Date() })
        } else {
            toast.error(`Required to Assigned anyone`);
        }
    }
    useEffect(() => {
        if (respond) {
            toast.success(`Assigned Successfully`);
            router.push(`/approval`)
        }
    }, [respond])

    return (
        <>
            <div className="container p-10 mx-auto mb-10 md:mb-10">
                <div className="flex items-center pb-8">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">Project Detail</p>
                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div ref={printInfoRef} className="md:col-span-2 sm:col-span-1 text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">
                        <h3 className="pb-6 font-medium text-indigo-800 text-2xs font-inter">{lead?.title}</h3>

                        {lead?.batimentCategory && (<div className="flex flex-col py-4">
                            <div className="grid grid-cols-2 mb-2">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">Select the type of work you want to carry out</p>
                                    <p className="text-sm font-semibold text-deep-black">{lead?.batimentCategory?.name}</p>
                                </div>
                            </div>
                        </div>)}

                        {lead?.depannageCategory && (<div className="flex flex-col py-4">
                            <div className="grid grid-cols-2 mb-2">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">Select the type of work you want to carry out</p>
                                    <p className="text-sm font-semibold text-deep-black">{lead?.depannageCategory?.name}</p>
                                </div>
                            </div>
                        </div>)}
                        <p className="py-4 font-normal text-xs2 text-graylight-900">{lead?.description}</p>
                    </div>

                    <div className="col-span-1">

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] p-3 mb-5">
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Posted</p>
                                <p className="font-semibold text-sm1 text-deep-black">{new Date(lead?.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Assigned</p>
                                <p className="font-semibold text-sm1 text-deep-black">{new Date().toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] p-3 mb-5">
                            <p className="text-sm font-medium font-inter text-graylight-800">Assign To</p>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Posted</p>
                                <p className="font-semibold text-sm1 text-deep-black">{new Date(lead?.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select"
                                    defaultValue={assignTo}
                                    onChange={(obj: any) => setAssignTo(obj)}
                                    options={userOptions}
                                />
                            </div>
                        </div>

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] p-3">
                            <p className="text-sm font-medium font-inter text-graylight-800">Client details</p>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Name</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.firstName} {lead?.address?.lastName}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">City</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.city}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Postal code</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.postalCode}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Phone</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.phone}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Email</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.email}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Address</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.firstName} {lead?.address?.lastName}, {lead?.address?.company},  {lead?.address?.postalCode}</p>
                            </div>
                        </div>
                        <Buttons className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins" value="Assign to Professional" loading={loading} onClick={() => handleUpdate('assigned')} />
                    </div>
                </div>
            </div>
        </>
    );
}