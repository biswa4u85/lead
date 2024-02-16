"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { MultiSelectBox, InputBox, PasswordBox, FileBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import Loader from "@/components/common/Loader";
import language from "@/contexts/language";


const initialData = {
    firstName: "",
    lastName: "",
    company: "",
    postalCode: "",
    sponsorCode: "",
    status: "",
    image: "",
}

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [value, setValue] = useState<any>(null)
    const [catagory, setCatagory] = useState<any>(null)

    const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({ showAll: true }) });
    const { data: servicesNew } = useFetch({ url: "depannageCategorys", query: JSON.stringify({ showAll: true }) });

    const { data } = useFetch({ url: "users", query: JSON.stringify({ id: params.id }) });
    useEffect(() => {
        if (data.data) {
            setValue(data.data[0])
            setCatagory(data.data[0])
        }
    }, [data.data])

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        company: Yup.string().required("Company is required"),
        // postalCode: Yup.string().required("Postal Code is required"),
        sponsorCode: Yup.string().required("Sponsor Code is required"),
        // status: Yup.string().required("Status is required"),
        image: Yup.string().required("Image is required"),
    });

    const validationSchema1 = Yup.object().shape({
        category: Yup.array().min(1, 'Category must have at least one item'),
        category_new: Yup.array().min(1, 'Category must have at least one item'),
    });

    const validationSchema2 = Yup.object().shape({
        newPassword: Yup.string().required("Password is required"),
        conPassword: Yup.string().required("Password is required"),
    });

    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (values: any) => {
        edit("users", { ...values, id: params.id })
    }

    useEffect(() => {
        if (respond) {
            toast.success(`User update successfully`);
            router.push(`/pro/profile`)
        }
    }, [respond])

    return (
        <>
            {!value ? <Loader /> :
                <Formik
                    initialValues={value}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (<div className="container mt-10 mx-auto md:px-10">
                        {/* <p className="my-5 text-lg font-bold text-black">{language.company_details}</p> */}
                        {/* <div className="my-4 border-t-2 border-gray-500"></div> */}
                        {/* <p className="py-2 font-semibold text-gray-600 text-title-xsm mx-5 md:mx-0">{language.company_paragraph}</p> */}
                        <p className="mt-5 text-lg font-bold text-black mx-5 md:mx-0">{language.information}</p>
                        <div className="my-4 border-t-2 border-gray-500"></div>

                        {/* start form section */}

                        <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="company"
                                    label={language.company_name}
                                    placeholder={language.company_placeholder}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="firstName"
                                    label={language.firstName_label}
                                    placeholder={language.first_placeholder}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="lastName"
                                    label={language.lastName_label}
                                    placeholder={language.last_placeholder}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="postalCode"
                                    label={language.postal_label}
                                    placeholder={language.postalcode_placeholder}
                                />
                            </div>
                            {/* <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="sponsorCode"
                                    label={language.sponsor_code}
                                    placeholder={language.Sponsor_placeholder}
                                />
                            </div> */}
                        </div>

                        <p className="mt-5 text-lg font-bold text-black mx-5 md:mx-0">{language.profile_photo}</p>
                        <div className="my-4 border-t-2 border-gray-500 mx-5 md:mx-0">
                            <FileBox
                                required={true}
                                name="image"
                                label="Profile"
                                placeholder="Upload Profile"
                            /></div>
                        <p className="py-5 text-indigo-800 text-xs1 mx-5 md:mx-0">{language.format_text}</p>
                        <div className="flex justify-end mt-5 mb-10 md:mb-10">
                            <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                        </div>
                    </div>)}
                </Formik>}

            {!catagory ? <Loader /> :
                <Formik
                    initialValues={catagory}
                    validationSchema={validationSchema1}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                        return <div className="container mx-auto md:px-10">
                            <p className="text-lg font-bold text-black md:mx-0">{language.catagorys}</p>
                            <div className="my-4 border-t-2 border-gray-500"></div>

                            {/* start form section */}
                            <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                                <div className="flex flex-col">
                                    <MultiSelectBox
                                        required={true}
                                        tree={true}
                                        name="category"
                                        label={language.catagorys_label}
                                        placeholder={language.catagorys_placeholder}
                                        options={categorys?.data ?? []}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <MultiSelectBox
                                        required={true}
                                        tree={true}
                                        name="category_new"
                                        label={language.Depannage_label}
                                        placeholder={language.catagorys_placeholder}
                                        options={servicesNew?.data ?? []}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-5 mb-10 md:mb-10">
                                <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                            </div>
                        </div>
                    }}
                </Formik>}

            <Formik
                initialValues={catagory}
                validationSchema={validationSchema2}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return <div className="container mx-auto md:px-10">
                        <p className="text-lg font-bold text-black md:mx-0">Change my password</p>
                        <div className="my-4 border-t-2 border-gray-500"></div>

                        {/* start form section */}
                        <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                            <div className="flex flex-col">
                                <PasswordBox
                                    required={true}
                                    name="newPassword"
                                    label={language.password}
                                    placeholder={language.password_placeholder}
                                />
                            </div>
                            <div className="flex flex-col">
                                <PasswordBox
                                    required={true}
                                    name="conPassword"
                                    label={language.confirm_password}
                                    placeholder={language.confirm_password_placeholder}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-5 mb-20 md:mb-40">
                            <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                        </div>
                    </div>
                }}
            </Formik>

            {/* start last page */}
            {/* <div className="container mx-auto md:px-10">
                <div className="flex items-center justify-between mx-5 md:mx-0">
                    <p className="text-sm font-bold text-black md:text-lg">{language.description}</p>
                    <button className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                        {language.edit_details}
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 font-semibold text-gray-600 text-title-xsm mx-5 md:mx-0">{language.company_paragraph}</p>
                <div className="flex justify-between mt-5 items-cente mx-5 md:mx-0">
                    <p className="text-sm font-bold text-black md:text-lg">{language.document}</p>
                    <button className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                        {language.edit_details}
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 text-gray-600 mx-5 md:mx-0">{language.insurance_text}</p>

                <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                    <div className="text-xs font-semibold">{language.kbis}</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold">{language.missing_doc}</p>
                        <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                    </div>
                </div>
                <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                    <div className="text-xs font-semibold">{language.assurance}</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold">{language.missing_doc}</p>
                        <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                    </div>
                </div>
                <div className="flex justify-between my-3 p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                    <div className="text-xs font-semibold">{language.guarantee}</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold"> {language.missing_doc}</p>
                        <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                    </div>
                </div>
                <p className="mt-5 text-sm font-bold text-black md:text-lg mx-5 md:mx-0">{language.quality}</p>
                <div className="my-4 border-t-2 border-gray-500"></div>

                <div className="flex justify-end mt-5 mb-20 md:mb-40 mx-5 md:mx-0">
                    <button className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md">
                        {language.add}
                    </button>
                </div>
            </div > */}
            {/* End last page */}


        </>
    );
}