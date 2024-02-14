"use client"
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { AiOutlineDoubleRight, AiFillHome, AiOutlineRise, AiOutlineCloudUpload } from "react-icons/ai";
import { Buttons } from "@/components/RenderFroms";
import { SignatureBox } from "@/components/RenderElements";
import { useReactToPrint } from "react-to-print";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { toast } from 'react-toastify';
import language from "@/contexts/language";


const readFileAsDataURL = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export default function Page({ params }: { params: { id: string } }) {
    const printInfoRef: any = useRef();
    const fileInputRef: any = useRef();
    const router = useRouter();
    const [signature, setSignature] = useState<any>(null)
    const searchParams = useSearchParams()

    const { data: lead } = useFetch({ url: "submit", query: JSON.stringify({ id: params.id }) });

    const handleFileChange = async (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const base64String = await readFileAsDataURL(selectedFile);
            setSignature(base64String);
        }
    };

    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = () => {
        if (signature) {
            edit("invoices", { id: lead?.data?.invoice?.id, cusSignature: signature })
        } else {
            toast.error(`Signature Required`);
        }
    }
    const handleRefused = () => {
        edit("submit", { type: lead.data.invoice.leadType, id: lead.data.id, name: lead.data.invoice.userId, status: "refused" })
    }
    useEffect(() => {
        if (respond) {
            toast.success(`Proposal Update successfully`);
            setSignature(null);
            if (signature) {
                router.push(`/payment?id=${params.id}`)
            }
        }
    }, [respond])

    const handlePrint = useReactToPrint({
        content: () => printInfoRef.current
    });


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
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">{language.project}</p>
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">{language.submit}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div ref={printInfoRef} className="md:col-span-2 sm:col-span-1 text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">
                        <h3 className="pb-6 font-medium text-2xs font-inter text-graylight-900">{language.description_label}</h3>

                        <div className="grid md:grid-cols-2 gap-9">
                            <div className="col-span-1 p-3 border border-gray-300 rounded">
                                <p className="text-xs font-medium text-deep-black font-inter">{language.client_details}</p>
                                <div className="my-3 font-normal text-gray-800 font-inter text-xs1">
                                    <p>{lead?.data?.address?.firstName} {lead?.data?.address?.lastName}</p>
                                    <p>{lead?.data?.address?.city}, {lead?.data?.address?.postalCode}</p>
                                </div>

                                <div className="font-normal text-gray-800 font-inter text-xs1">
                                    <p>{lead?.data?.address?.email}</p>
                                    <p>{lead?.data?.address?.phone}</p>
                                </div>
                                {lead?.data?.invoice?.proSignature && (<img src={lead?.data?.invoice?.cusSignature} />)}
                            </div>
                            <div className="col-span-1">
                                <div className="col-span-1 p-3 border border-gray-300 rounded">
                                    <p className="text-xs font-medium text-deep-black font-inter">{language.Professional_text}</p>
                                    <div className="my-3 font-normal text-gray-800 font-inter text-xs1">
                                        <p>{lead?.data?.profeional?.firstName} {lead?.data?.profeional?.lastName}</p>
                                        <p>{lead?.data?.profeional?.company}, {lead?.data?.profeional?.postalCode}</p>
                                    </div>

                                    <div className="font-normal text-gray-800 font-inter text-xs1">
                                        <p>{lead?.data?.profeional?.email}</p>
                                        <p>{lead?.data?.profeional?.phone}</p>
                                    </div>
                                    {lead?.data?.invoice?.proSignature && (<img src={lead?.data?.invoice?.proSignature} />)}
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-3 font-medium text-indigo-800 text-2xs font-inter">{lead?.data?.title}</h3>
                        <p className="py-4 font-normal text-xs2 text-graylight-900">{lead?.data?.description}</p>

                        <div className="flex flex-col py-4">
                            <div className="grid grid-cols-3 mb-4">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">{language.contact_start}</p>
                                    <p className="text-sm font-semibold text-deep-black">{new Date(lead?.data?.invoice?.contractStart).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">{language.contact_end}</p>
                                    <p className="text-sm font-semibold text-deep-black">{new Date(lead?.data?.invoice?.contractEnd).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <table className="w-full border">
                            <thead>
                                <tr className="font-normal text-left text-white bg-indigo-800 text-xs1 font-inter">
                                    <th className="p-2">{language.items}</th>
                                    <th className="p-2">{language.description_label}</th>
                                    <th className="p-2">{language.qty}</th>
                                    <th className="p-2">{language.rate}</th>
                                    <th className="p-2">{language.tax}</th>
                                    <th className="p-2">{language.subtotal}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lead?.data?.invoice?.items && lead?.data?.invoice?.items.map((item: any, key: any) => <tr key={key}>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item?.name}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item?.description}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item?.qty}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${item?.rate}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{item?.tax}%</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${(item.qty && item.rate) ? Number(item.qty * item.rate) + Number(item.tax ?? 1 * Number(item.qty * item.rate) / 100) : 0}</td>
                                </tr>)}
                            </tbody>
                        </table>

                        <div className="grid md:grid-cols-3">
                            <div></div>
                            <div></div>
                            <div className="mt-8 border border-gray-200 rounded-sm mb-15">
                                <p className="py-2 font-bold text-center text-white bg-indigo-800 rounded-t-sm text-xs1 font-inter">{language.invoice_summary}</p>
                                <div className="px-2">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">{language.subtotal}</p>
                                        <p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{lead?.data?.invoice?.items ? calcTotal(lead?.data?.invoice.items, 'total') : '0'}</span></p>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">{language.tax}</p>
                                        <p className="font-light font-inter text-xs1 text-black-100">12%</p>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">{language.total}</p>
                                        <p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{lead?.data?.invoice?.items ? calcTotal(lead?.data?.invoice?.items) : '0'}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <p className="font-medium font-inter text-2xs text-graylight-800">{language.generate}</p>
                        <div className='px-3 py-2 rounded-lg border-gray-200 md:text-sm text-xs1 shadow-[0px_5px_10px_1px_#F2F6FB] my-5'>
                            <div className="flex items-center justify-center">
                                <AiOutlineRise size="25" className="text-green" />
                                <SignatureBox setSignature={setSignature} />
                            </div>
                        </div>
                        <p className="mb-3 font-medium font-inter text-2xs text-graylight-800">{language.uplode}</p>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center py-2 border-2 border-indigo-800 border-dashed">
                            <AiOutlineCloudUpload size="25" className="text-indigo-800" />
                            <button onClick={() => fileInputRef.current.click()} className="ml-4 font-normal text-indigo-800 font-poppins text-2xs">{language.uplode}</button>
                        </div>

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] mt-7 p-3">
                            <p className="text-sm font-medium font-inter text-graylight-800">{language.profeional_details}</p>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.name}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.firstName} {lead?.data?.profeional?.lastName}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.company}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.company}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.postal_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.postalCode}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.phone_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.phone}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">{language.email_label}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.email}</p>
                            </div>
                            <div className="flex items-start justify-between py-3">
                                <p className="w-1/2 text-sm font-normal text-gray-700">{language.address}</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.firstName} {lead?.data?.profeional?.lastName}, {lead?.data?.profeional?.company},  {lead?.data?.profeional?.postalCode}</p>
                            </div>
                        </div>
                        <Buttons type="submit" value="Refused" onLoad={loading} onClick={() => handleRefused()} className="w-full p-2 my-5 text-sm font-normal text-white rounded-md bg-danger font-poppins">

                        </Buttons>
                        <Buttons type="submit" value="Pay" onLoad={loading} onClick={() => handleUpdate()} className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins">

                        </Buttons>
                        <Buttons type="submit" value="Downloaded" onLoad={loading} onClick={handlePrint} className="w-full p-2 text-sm font-normal text-indigo-800 border border-indigo-800 rounded-md font-poppins">

                        </Buttons>
                    </div>
                </div>
            </div>
        </>
    );
}