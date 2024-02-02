"use client"
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { AiOutlineDoubleRight, AiFillHome, AiOutlineRise, AiOutlineCloudUpload } from "react-icons/ai";
import { SignatureBox } from "@/components/RenderElements";
import { useReactToPrint } from "react-to-print";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { toast } from 'react-toastify';

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
    const type = searchParams.get('type')

    const { data: lead } = useFetch({ url: "submit", query: JSON.stringify({ type, id: params.id }) });

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
            edit("submit", { type, id: params.id, signature })
        } else {
            toast.error(`Signature Required`);
        }
    }
    useEffect(() => {
        if (respond) {
            toast.success(`Signature update successfully`);
            setSignature(null);
            router.push(`/payment?id=${params.id}&type=${type}`)
        }
    }, [respond])

    const handlePrint = useReactToPrint({
        content: () => printInfoRef.current
    });


    return (
        <>
            <div className="container p-10 mx-auto mb-10 md:mb-10">
                <div className="flex items-center pb-8">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">Project Detail</p>
                    <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                    <p className="font-normal text-indigo-900 font-roboto text-2xs">Submit Proposal </p>
                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div ref={printInfoRef} className="md:col-span-2 sm:col-span-1 text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">
                        <h3 className="pb-6 font-medium text-2xs font-inter text-graylight-900">Description</h3>

                        <div className="grid md:grid-cols-2 gap-9">
                            <div className="col-span-1 p-3 border border-gray-300 rounded">
                                <p className="text-xs font-medium text-deep-black font-inter">Client Details</p>
                                <div className="my-3 font-normal text-gray-800 font-inter text-xs1">
                                    <p>{lead?.data?.address?.firstName} {lead?.data?.address?.lastName}</p>
                                    <p>{lead?.data?.address?.city}, {lead?.data?.address?.postalCode}</p>
                                </div>

                                <div className="font-normal text-gray-800 font-inter text-xs1">
                                    <p>{lead?.data?.address?.email}</p>
                                    <p>{lead?.data?.address?.phone}</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="col-span-1 p-3 border border-gray-300 rounded">
                                    <p className="text-xs font-medium text-deep-black font-inter">Professional</p>
                                    <div className="my-3 font-normal text-gray-800 font-inter text-xs1">
                                        <p>{lead?.data?.profeional?.firstName} {lead?.data?.profeional?.lastName}</p>
                                        <p>{lead?.data?.profeional?.company}, {lead?.data?.profeional?.postalCode}</p>
                                    </div>

                                    <div className="font-normal text-gray-800 font-inter text-xs1">
                                        <p>{lead?.data?.profeional?.email}</p>
                                        <p>{lead?.data?.profeional?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="pt-4 font-normal text-xs2 text-graylight-900">{lead?.data?.title}</p>
                        <p className="pt-4 font-normal text-xs2 text-graylight-900">{lead?.data?.description}</p>

                        <div className="flex flex-col py-4">
                            <div className="grid grid-cols-3 mb-4">
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">Contract Start</p>
                                    <p className="text-sm font-semibold text-deep-black">{new Date(lead?.data?.contractStart).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-normal text-gray-700 font-inter">Contract End</p>
                                    <p className="text-sm font-semibold text-deep-black">{new Date(lead?.data?.contractEnd).toLocaleDateString()}</p>
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
                                {lead?.data?.batimentCategory && (<tr>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{lead?.data?.batimentCategory.name}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">23</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${lead?.data?.batimentCategory.price}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">12%</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${Number(lead?.data?.batimentCategory.price) + Number(12 * Number(lead?.data?.batimentCategory.price) / 100)}</td>
                                </tr>)}
                                {lead?.data?.batimentType && (<tr>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{lead?.data?.batimentType.name}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">23</td>
                                </tr>)}
                                {lead?.data?.depannageCategory && (<tr>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">{lead?.data?.depannageCategory.name}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">23</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${lead?.data?.depannageCategory.price}</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">12%</td>
                                    <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">${Number(lead?.data?.depannageCategory.price) + Number(12 * Number(lead?.data?.depannageCategory.price) / 100)}</td>
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
                                        {lead?.data?.batimentCategory && (<p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{lead?.data?.batimentCategory.price}</span></p>)}
                                        {lead?.data?.depannageCategory && (<p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{lead?.data?.depannageCategory.price}</span></p>)}
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Tax</p>
                                        <p className="font-light font-inter text-xs1 text-black-100">12%</p>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Total</p>
                                        {lead?.data?.batimentCategory && (<p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{Number(lead?.data?.batimentCategory.price) + Number(12 * Number(lead?.data?.batimentCategory.price) / 100)}</span></p>)}
                                        {lead?.data?.depannageCategory && (<p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{Number(lead?.data?.depannageCategory.price) + Number(12 * Number(lead?.data?.depannageCategory.price) / 100)}</span></p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <p className="font-medium font-inter text-2xs text-graylight-800">Generate signature</p>
                        <div className='px-3 py-2 rounded-lg border-gray-200 md:text-sm text-xs1 shadow-[0px_5px_10px_1px_#F2F6FB] my-5'>
                            <div className="flex items-center justify-center">
                                <AiOutlineRise size="25" className="text-green" />
                                <SignatureBox setSignature={setSignature} />
                            </div>
                        </div>
                        <p className="mb-3 font-medium font-inter text-2xs text-graylight-800">Upload signature</p>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center py-2 border-2 border-indigo-800 border-dashed">
                            <AiOutlineCloudUpload size="25" className="text-indigo-800" />
                            <button onClick={() => fileInputRef.current.click()} className="ml-4 font-normal text-indigo-800 font-poppins text-2xs">Upload signature</button>
                        </div>

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] mt-7 p-3">
                            <p className="text-sm font-medium font-inter text-graylight-800">Profeional details details</p>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Name</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.firstName} {lead?.data?.profeional?.lastName}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Company</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.company}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Postal code</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.postalCode}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Phone</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.phone}</p>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <p className="text-sm font-normal text-gray-700">Email</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.email}</p>
                            </div>
                            <div className="flex items-start justify-between py-3">
                                <p className="w-1/2 text-sm font-normal text-gray-700">Address</p>
                                <p className="font-semibold text-sm1 text-deep-black">{lead?.data?.profeional?.firstName} {lead?.data?.profeional?.lastName}, {lead?.data?.profeional?.company},  {lead?.data?.profeional?.postalCode}</p>
                            </div>
                        </div>
                        <button type="submit" onClick={() => handleUpdate()} className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins">
                            Pay
                        </button>
                        <button onClick={handlePrint} type="submit" className="w-full p-2 text-sm font-normal text-indigo-800 border border-indigo-800 rounded-md font-poppins">
                            Downloaded
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}