"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFetch } from "@/contexts/useFetch";
import { usePost } from "@/contexts/usePost";
import { InputBox, TextareaBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { AiOutlineCheckCircle, } from "react-icons/ai";


export default function Page() {
    const [step, setStep] = useState<any>(-1);
    const [progress, setProgress] = useState<any>(0);
    const [values, setValues] = useState<any>({});
    const { data: zipcodes } = useFetch({ url: "zipcode", query: JSON.stringify({}) });
    const zipcodeOptions = zipcodes?.data ? zipcodes.data.map((item: any) => {
        return { label: item?.name, value: item?.id }
    }) : []

    const { data: categorys } = useFetch({ url: "depannageCategorys", query: JSON.stringify({}) });
    const { data: services } = useFetch({ url: "depannageTypes", query: JSON.stringify({}) });
    const { create, data: respond, loading } = usePost();

    const validationSchemaInfo = Yup.object().shape({
        title: Yup.string().required("What do you need is required"),
        postalCode: Yup.string().required("Zip Code is required"),
    });

    const validationSchemaService = Yup.object().shape({
        service: Yup.string().required("Service is required"),
    });

    const validationSchemaPrice = Yup.object().shape({
        // price: Yup.string().required("Price is required"),
    });

    const validationSchemaDescription = Yup.object().shape({
        description: Yup.string().required("Description is required"),
    });

    const validationSchemaContact = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
    });


    const handleUpdate = (value: any) => {
        let val = 100 / (categorys?.data?.length + 4)
        setProgress(progress == 0 ? val : progress + val)
        if (step == 102) {
            create("depannages", { ...values, ...value })
        } else {
            if (value.service) {
                let service = values.service ? [...values.service, value.service] : [value.service]
                setValues({ ...values, service })
            } else {
                setValues({ ...values, ...value })
            }
            if (step == categorys?.data?.length - 1) {
                setStep(100)
            } else {
                setStep(step + 1)
            }
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

                {(step == -1 && zipcodes) && (<Formik
                    initialValues={{ title: '', postalCode: '' }}
                    validationSchema={validationSchemaInfo}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Troubleshooting or small jobs, we have the solution!</p>
                        </div>
                            <div className="grid grid-cols-2 gap-4 px-5 py-5">
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="title"
                                        label="What do you need"
                                        placeholder="Enter What do you need"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <SelectBox
                                        required={true}
                                        options={zipcodeOptions}
                                        name="postalCode"
                                        label="Your Postal Code"
                                        placeholder="Select Postal Code"
                                    />
                                </div>
                            </div>

                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Let’s Go"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {categorys?.data && categorys?.data.map((category: any, index: any) => <div key={index}>
                    {(step == index) && (<Formik
                        initialValues={{ service: '' }}
                        validationSchema={validationSchemaService}
                        onSubmit={(values: any) => handleUpdate(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                            <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">{category.name}</p>
                            </div>
                                <Field name={'service'}>
                                    {({ field, form, meta }: any) => {
                                        return <><div className="flex flex-wrap justify-normal">
                                            {services?.data && services.data.map((item: any, key: any) => {
                                                if (item?.depannageCategoryId == category?.id) {
                                                    return <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 cursor-pointer ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                                        onClick={() => {
                                                            field.onChange('service')(
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
                                                {form?.errors['service'] && form?.touched['service'] && (
                                                    <div className="mt-1 text-xs-1 text-meta-1">{form.errors['service']}</div>
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
                </div>)}

                {(step == 100) && (<Formik
                    initialValues={{ price: "" }}
                    validationSchema={validationSchemaPrice}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-inter font-Normal text-deep-black md:max-w-2xl">Where does the problem come from ?</p>
                        </div>

                            <Field name={'price'}>
                                {({ field, form, meta }: any) => {
                                    return <>
                                        <div className="grid mx-3 md:grid-cols-2 gap-11 ">
                                            <div className="p-2 border border-gray-500 rounded-md md:col-span-1">
                                                <p className="pl-2 font-inter font-semibold text-[23px] text-graylight-900">Electric water heater breakdown diagnosis + 1 hour of labor</p>
                                                <p className="pl-2 font-inter font-bold py-3 text-[31px] text-graylight-900">€139</p>
                                                <div className="flex justify-between gap-8">
                                                    <div className="flex">
                                                        <div> <AiOutlineCheckCircle size="20" className="mt-1 mr-3 text-indigo-800" /></div>
                                                        <p className="text-sm font-normal font-inter text-graylight-900">Electric water heater breakdown diagnosis + 1 hour of labor</p>
                                                    </div>
                                                    <div><p className="py-3 pl-2 text-sm font-semibold font-inter text-graylight-900">€59.00</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between pt-2">
                                                    <div className="flex">
                                                        <div><AiOutlineCheckCircle size="20" className="mt-1 mr-3 text-indigo-800" /></div>
                                                        <p className="text-sm font-normal font-inter text-graylight-900">Up to 60 min labor</p>
                                                    </div>
                                                    <div><p className="py-3 pl-2 text-sm font-semibold font-inter text-graylight-900">€59.00</p>
                                                    </div>
                                                </div>
                                                <p className="pb-5 text-sm font-normal text-indigo-800 font-inter">Pay in 3 or 4 installments without fees</p>
                                                <InputBox
                                                    required={true}
                                                    name="title"
                                                    readOnly={true}
                                                    label="Your Postal Code *"
                                                    placeholder={values.postalCode}
                                                />
                                                <button onClick={() => field.onChange('price')(100)}
                                                    className="w-full px-4 py-2 my-5 text-sm font-normal text-indigo-800 bg-blue-500 border border-indigo-800 rounded-md font-inter">
                                                    I Order
                                                </button>
                                            </div>

                                        </div>

                                        <div>
                                            {form?.errors['price'] && form?.touched['price'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['price']}</div>
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

                {step == 101 && (<Formik
                    initialValues={{ description: "" }}
                    validationSchema={validationSchemaDescription}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Describe your project to us</p>
                            </div>
                            <div className="px-5">
                                <TextareaBox
                                    required={true}
                                    name="description"
                                    className="w-full p-2 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Detail your project, for example: I would like to remove 50 m2 of tiles with plinths in
                            order to install a parquet floor already in my possession"
                                />
                            </div>
                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Next"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 102 && (<Formik
                    initialValues={{
                        title: "",
                        firstName: "",
                        lastName: "",
                        city: "",
                        email: "",
                        phone: "",
                        postalCode: ""
                    }}
                    validationSchema={validationSchemaContact}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Complete your contact details</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 px-5 py-5">
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="title"
                                        label="Title"
                                        placeholder="Enter the Title"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="firstName"
                                        label="First Name"
                                        placeholder="Enter your First Name"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Enter your Last Name"

                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="city"
                                        label="City"
                                        placeholder="Enter City"

                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="email"
                                        label="Email"
                                        placeholder="Enter your Email"

                                    />
                                </div>
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="phone"
                                        label="Phone"
                                        placeholder="Enter your Phone"
                                    />
                                </div>
                            </div>
                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons loading={loading} className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Submitted"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 103 && (<>
                    <div className="mb-3 border-b-2 border-indigo-800">
                        <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Thank you for submitting a proposal!</p>
                    </div>
                    <p className="text-sm leading-10 md:text-md font-Normal text-deep-black md:max-w-2xl">Thank you for submitting your proposal. A confirmation email will be sent. We will review your proposal and will get back to you within the next few days.</p>
                </>)}
            </div>
        </>
    );
}