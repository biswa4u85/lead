"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFetch } from "@/contexts/useFetch";
import { usePost } from "@/contexts/usePost";
import { useSearchParams } from 'next/navigation'
import { InputBox, TextareaBox, Buttons } from "@/components/RenderFroms";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import language from "@/contexts/language";


const defaultValue = {
    batimentCategoryId: "",
    batimentTypeId: "",
    title: "",
    description: "",
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    postalCode: ""
}

export default function Page() {
    const params = useSearchParams()
    const name = params.get('name')
    const [step, setStep] = useState<any>(1);
    const [progress, setProgress] = useState<any>(0);
    const [values, setValues] = useState<any>(null);

    useEffect(() => {
        if (name) {
            setValues({ ...defaultValue, batimentCategoryId: name })
        } else {
            setValues({ ...defaultValue })
        }
    }, [name])

    const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({}) });
    const { data: services } = useFetch({ url: "batimentTypes", query: JSON.stringify({}) });
    const { create, data: respond, loading } = usePost();

    const validationSchemaService1 = Yup.object().shape({
        batimentCategoryId: Yup.string().required("Category is required"),
    });

    const validationSchemaService2 = Yup.object().shape({
        batimentTypeId: Yup.string().required("Type is required"),
    });

    const validationSchemaInfo = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
    });

    const validationSchemaContact = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        postalCode: Yup.string().required("Postal Code is required"),
    });

    const handlePrevious = () => {
        setStep(step - 1)
    }

    const handleUpdate = (value: any) => {
        let val = 100 / 4
        setProgress(progress == 0 ? val : progress + val)
        if (step == 4) {
            create("batiments", { ...values, ...value })
        } else {
            setValues({ ...values, ...value })
            setStep(step + 1)
        }
    }

    useEffect(() => {
        if (respond) {
            toast.success(`Your request added successfully`);
            setValues({})
            setStep(step + 1)
        }
    }, [respond])

    return (
        <>
            <div className="mx-5 mb-10 md:mx-64 md:mb-20">
                {/* stepers start */}
                <div className="relative w-full h-6 my-10 overflow-hidden bg-gray-200 rounded-md">
                    <div className="absolute top-0 left-0 items-center h-full text-sm text-center text-white bg-indigo-600" style={{ width: `${Number(progress).toFixed(0)}%` }}>{`${Number(progress).toFixed(0)}%`}</div>
                </div>
                {/* stepers end */}

                {(step == 1 && values) && (<Formik
                    initialValues={values}
                    validationSchema={validationSchemaService1}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black">{"Select the type of work you wish to carry out"}</p>
                        </div>
                            <Field name={'batimentCategoryId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {categorys?.data && categorys.data.map((item: any, key: any) => {
                                            return <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 cursor-pointer ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                                onClick={() => {
                                                    field.onChange('batimentCategoryId')(
                                                        item.id
                                                    );
                                                }} >
                                                {item.icon && (<div className={`flex items-center justify-center rounded-md w-14 h-14 bg-gray-400`}>
                                                    <Image
                                                        alt=""
                                                        width="44"
                                                        height="44"
                                                        src={item.icon}
                                                    />
                                                </div>)}
                                                <p className="pl-2 text-sm font-normal text-deep-black">{item.name}</p>
                                            </div>
                                        })}
                                    </div>
                                        <div>
                                            {form?.errors['batimentCategoryId'] && form?.touched['batimentCategoryId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['batimentCategoryId']}</div>
                                            )}
                                        </div>
                                    </>
                                }}
                            </Field>

                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Next"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {(step == 2) && (<Formik
                    initialValues={values}
                    validationSchema={validationSchemaService2}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black">{"Sélectionnez la nature de travaux que vous souhaitez réaliser"}</p>
                        </div>
                            <Field name={'batimentTypeId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {services?.data && services.data.map((item: any, key: any) => {
                                            if (item.batimentCategoryId == values?.batimentCategoryId) {
                                                return <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 cursor-pointer ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                                    onClick={() => {
                                                        field.onChange('batimentTypeId')(
                                                            item.id
                                                        );
                                                    }} >
                                                    {item.icon && (<div className={`flex items-center justify-center rounded-md w-14 h-14 bg-gray-400`}>
                                                        <Image
                                                            alt=""
                                                            width="44"
                                                            height="44"
                                                            src={item.icon}
                                                        />
                                                    </div>)}
                                                    <p className="pl-2 text-sm font-normal text-deep-black">{item.name}</p>
                                                </div>
                                            }
                                        })}
                                    </div>
                                        <div>
                                            {form?.errors['batimentTypeId'] && form?.touched['batimentTypeId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['batimentTypeId']}</div>
                                            )}
                                        </div>
                                    </>
                                }}
                            </Field>

                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Previous"} onClick={handlePrevious} />
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Next"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 3 && (<Formik
                    initialValues={values}
                    validationSchema={validationSchemaInfo}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">{language.describe}</p>
                            </div>
                            <div className="px-5 mb-2">
                                <InputBox
                                    required={true}
                                    name="title"
                                    label={language.title_label}
                                    placeholder={language.title_placeholder}
                                />
                            </div>
                            <div className="px-5">
                                <TextareaBox
                                    required={true}
                                    name="description"
                                    label={language.description_label}
                                    className="w-full p-2 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500"
                                    placeholder={language.description_placeholder}
                                />
                            </div>
                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Previous"} onClick={handlePrevious} />
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Next"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 4 && (<Formik
                    initialValues={values}
                    validationSchema={validationSchemaContact}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">{language.complete_details}</p>
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 px-5 py-5">
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="firstName"
                                        label={language.firstName_label}
                                        placeholder={language.firstName_placeholder}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="lastName"
                                        label={language.lastName_label}
                                        placeholder={language.lastName_placeholder}
                                        

                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="city"
                                        label={language.city_label}
                                        placeholder={language.city_placeholder}
                                        
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="email"
                                        label={language.email_label}
                                        placeholder={language.email_placeholder}

                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="phone"
                                        label={language.phone_label}
                                        placeholder={language.phone_placeholder}
                                        
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="postalCode"
                                        label={language.postal_label}
                                        placeholder={language.postal_placeholder}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Previous"} onClick={handlePrevious} />
                                <Buttons loading={loading} className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Submitted"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 5 && (<>
                    <div className="mb-3 border-b-2 border-indigo-800">
                        <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">{language.thank_proposal}</p>
                    </div>
                    <p className="text-sm leading-10 md:text-md font-Normal text-deep-black md:max-w-2xl">{language.confirmation_email}</p>
                </>)}
            </div>
        </>
    );
}