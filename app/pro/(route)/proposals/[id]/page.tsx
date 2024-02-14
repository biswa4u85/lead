"use client"
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { AiOutlineDoubleRight, AiFillHome, AiOutlineRise, AiOutlineCloudUpload } from "react-icons/ai";
import { SignatureBox } from "@/components/RenderElements";
import { InputBox, TextareaBox, DateBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Loader from "@/components/common/Loader";
import { useReactToPrint } from "react-to-print";
import { usePost } from "@/contexts/usePost";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { useSession } from 'next-auth/react'

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

const initialData = {
    // description: "",
    contractStart: "",
    contractEnd: "",
    // proSignature: "",
    items: [{}],
}

export default function Page({ params }: { params: { id: string } }) {
    const printInfoRef: any = useRef();
    const fileInputRef: any = useRef();
    const { data } = useSession()
    const router = useRouter();
    const [value, setValue] = useState<any>(null)
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const { data: leads } = useFetch({ url: "findProjects", query: JSON.stringify({ type, id: params.id, status, assignTo: (data?.user as any)?.id }) });
    let lead = leads?.data ? leads.data[0] : {}

    useEffect(() => {
        if (lead?.batimentCategory) {
            setValue({ ...initialData, items: [{ name: lead?.batimentCategory?.name, qty: 1 }, { name: lead?.batimentType?.name, qty: 1 }] })
        }
        if (lead?.depannageCategory) {
            setValue({ ...initialData, items: [{ name: lead?.depannageCategory?.name, qty: 1, rate: lead?.depannageCategory?.price }] })
        }
    }, [lead])

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

    const validationSchema = Yup.object().shape({
        // description: Yup.string().required("Description is required"),
        contractStart: Yup.string().required("Start Date is required"),
        contractEnd: Yup.string().required("End Date is required"),
        // proSignature: Yup.string().required("Signature is required"),
    });


    const { create, data: respond, loading } = usePost();
    const handleUpdate = (values: any) => {
        if (calcTotal(values.items) > 0) {
            create("invoices", { ...values, leadType: lead?.batimentCategory ? 'batiment' : 'depannage', leadId: params.id, userId: (data?.user as any)?.id })
        } else {
            toast.error(`Items are required`);
        }
    }
    const { edit, data: respond1, loading: loading1 } = usePatch();
    useEffect(() => {
        if (respond) {
            edit("findProjects", { type, id: params.id, name: (data?.user as any)?.id, status: "pending" })
            toast.success(`Invoice update successfully`);
            router.push(`/pro/estimate`)
        }
    }, [respond])

    const handlePrint = useReactToPrint({
        content: () => printInfoRef.current
    });


    return (
        <>{!value ? <Loader /> :
            <Formik
                initialValues={value}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return <div className="container p-10 mx-auto mb-10 md:mb-10">
                        <div className="flex items-center pb-8">
                            <AiFillHome size="20" className="text-indigo-900" />
                            <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                            <p className="font-normal text-indigo-900 font-roboto text-2xs">Project Detail</p>
                            <AiOutlineDoubleRight size="12" className="mx-3 text-indigo-900" />
                            <p className="font-normal text-indigo-900 font-roboto text-2xs">Submit Proposal </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-9">
                            <div ref={printInfoRef} className="md:col-span-2 sm:col-span-1 text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">
                                <h3 className="pb-6 font-medium text-indigo-800 text-2xs font-inter">{lead?.title}</h3>
                                <p className="py-4 font-normal text-xs2 text-graylight-900">{lead?.description}</p>
                                <div className="flex flex-col py-4">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <DateBox
                                                required={true}
                                                name="contractStart"
                                                label="Contract Start"
                                                placeholder="Enter Contract Start"
                                            />
                                        </div>
                                        <div>
                                            <DateBox
                                                required={true}
                                                name="contractEnd"
                                                label="Contract End"
                                                placeholder="Enter Contract End"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <FieldArray
                                    name="items"
                                    render={(arrayHelpers: any) => (<>
                                        <table className="w-full border">
                                            <thead>
                                                <tr className="font-normal text-left text-white bg-indigo-800 text-xs1 font-inter">
                                                    <th className="p-2">Items</th>
                                                    <th className="p-2">Description</th>
                                                    <th className="p-1">QTY/HRS</th>
                                                    <th className="p-2">Rate</th>
                                                    <th className="p-1">Tax</th>
                                                    <th className="p-2">Subtotal</th>
                                                    <th className="p-2" colSpan={2}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values.items.map((item: any, index: any) => (
                                                    <tr key={index}>
                                                        <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            <InputBox required={true} name={`items.${index}.name`} />
                                                        </td>
                                                        <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            <TextareaBox
                                                                required={true}
                                                                name={`items.${index}.description`}
                                                                label="Description"
                                                                placeholder="Enter Description"
                                                            />
                                                        </td>
                                                        <td className="p-1 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            <InputBox required={true} name={`items.${index}.qty`} type="number" />

                                                        </td>
                                                        <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            <InputBox required={true} pre="$" name={`items.${index}.rate`} type="number" />
                                                            {/* {errors['items'] && (
                                                            <div className="mt-1 text-xs-1 text-meta-1">{errors['items'][index]['price']}</div>
                                                        )} */}
                                                        </td>
                                                        <td className="p-1 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            <InputBox required={true} post="%" name={`items.${index}.tax`} type="number" />

                                                        </td>
                                                        <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter"><InputBox pre="$" name={`items.${index}.total`} readOnly type="number" value={(item.qty && item.rate) ? Number(item.qty * item.rate) + Number(item.tax ?? 1 * Number(item.qty * item.rate) / 100) : 0} /></td>
                                                        <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            {index > 0 && (<button
                                                                type="button"
                                                                className="p-2 text-sm font-normal text-white rounded-md bg-danger font-poppins"
                                                                onClick={() => arrayHelpers.remove(index)}>-</button>)}
                                                        </td>
                                                        <td className="p-2 text-xs font-normal border border-gray-200 text-graylight-900 font-inter">
                                                            <button
                                                                type="button"
                                                                className="p-2 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins"
                                                                onClick={() => arrayHelpers.push(index, {})}>+</button>
                                                        </td>
                                                    </tr>)
                                                )}
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
                                                        <p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{values.items ? calcTotal(values.items, 'total') : '0'}</span></p>
                                                    </div>
                                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Tax</p>
                                                        <p className="font-light font-inter text-xs1 text-black-100">{values.items[0] ? values.items[0].tax : '0'}%</p>
                                                    </div>
                                                    <div className="flex items-center justify-between py-3">
                                                        <p className="font-normal font-inter text-xs1 text-graylight-800">Total</p>
                                                        <p className="font-light font-inter text-xs1 text-black-100">USD <span className="font-medium ">{values.items ? calcTotal(values.items) : '0'}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    )}
                                />


                            </div>

                            <div className="col-span-1">
                                {/* <Field name="proSignature">
                                {({ field, form, meta }: any) => {
                                    return <>
                                        <p className="font-medium font-inter text-2xs text-graylight-800">Generate signature</p>
                                        <div className='px-3 py-2 rounded-lg border-gray-200 md:text-sm text-xs1 shadow-[0px_5px_10px_1px_#F2F6FB] my-5'>
                                            <div className="flex items-center justify-center">
                                                <AiOutlineRise size="25" className="text-green" />
                                                <SignatureBox setSignature={(value: any) => {
                                                    field.onChange('proSignature')(value)
                                                }} />
                                            </div>
                                        </div>
                                        <p className="mb-3 font-medium font-inter text-2xs text-graylight-800">Upload signature</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={async (e: any) => {
                                                if (e.target.files[0]) {
                                                    const base64String = await readFileAsDataURL(e.target.files[0]);
                                                    field.onChange('proSignature')(base64String);
                                                }
                                            }}
                                        />
                                        <div className="flex items-center justify-center py-2 border-2 border-indigo-800 border-dashed">
                                            <AiOutlineCloudUpload size="25" className="text-indigo-800" />
                                            <button onClick={() => fileInputRef.current.click()} className="ml-4 font-normal text-indigo-800 font-poppins text-2xs">Upload signature</button>
                                        </div>
                                        {form?.errors['proSignature'] && form?.touched['proSignature'] && (
                                            <div className="mt-1 text-xs-1 text-meta-1">{form.errors['proSignature']}</div>
                                        )}
                                    </>
                                }}
                            </Field> */}

                                <div className="shadow-[0px_0px_10px_4px_#F2F6FB] mt-0 p-3">
                                    <p className="text-sm font-medium font-inter text-graylight-800">Client Details</p>
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
                                    <div className="flex items-start justify-between py-3">
                                        <p className="w-1/2 text-sm font-normal text-gray-700">Address</p>
                                        <p className="font-semibold text-sm1 text-deep-black">{lead?.address?.firstName} {lead?.address?.lastName}, {lead?.address?.city},  {lead?.address?.postalCode}</p>
                                    </div>
                                </div>
                                <Buttons className="w-full p-2 my-5 text-sm font-normal text-white bg-indigo-800 rounded-md font-poppins" value={"Send it to customer"} loading={loading} onClick={handleSubmit} />
                                <button onClick={handlePrint} type="submit" className="w-full p-2 text-sm font-normal text-indigo-800 border border-indigo-800 rounded-md font-poppins">
                                    Downloaded
                                </button>
                            </div>
                        </div>
                    </div>
                }}
            </Formik>}</>
    );
}