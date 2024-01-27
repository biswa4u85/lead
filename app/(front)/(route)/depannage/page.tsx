"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFetch } from "@/contexts/useFetch";
import { usePost } from "@/contexts/usePost";
import { InputBox, TextareaBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';

export default function Page() {
    const [step, setStep] = useState<any>(1);
    const [values, setValues] = useState<any>({});
    const { data: zipcodes } = useFetch({ url: "zipcode", query: JSON.stringify({}) });
    const zipcodeOptions = zipcodes?.data ? zipcodes.data.map((item: any) => {
        return { label: item?.name, value: item?.id }
    }) : []

    const { data: problems } = useFetch({ url: "problems", query: JSON.stringify({}) });
    const { data: problemTypes } = useFetch({ url: "problemtype", query: JSON.stringify({}) });
    const { create, data: respond, loading } = usePost();

    const validationSchema1 = Yup.object().shape({
        title: Yup.string().required("What do you need is required"),
        zipcodeId: Yup.string().required("Zip Code is required"),
    });

    const handleUpdate1 = (value: any) => {
        setValues(value)
        setStep(step + 1)
    }

    const validationSchema2 = Yup.object().shape({
        problemId: Yup.string().required("Problem is required"),
    });

    const handleUpdate2 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema3 = Yup.object().shape({
        problemtypeId: Yup.string().required("Problem Type is required"),
    });

    const handleUpdate3 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema4 = Yup.object().shape({
        problemtypeId: Yup.string().required("Problem Type is required"),
    });

    const handleUpdate4 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema5 = Yup.object().shape({
        description: Yup.string().required("Description is required"),
    });

    const handleUpdate5 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema6 = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
    });

    const handleUpdate6 = (value: any) => {
        create("leadsnew", { ...values, ...value })
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
                    <div className="absolute top-0 left-0 items-center h-full text-sm text-center text-white bg-indigo-600" style={{ width: `${Number(16.6 * (step - 1)).toFixed(0)}%` }}>{`${Number(16.6 * (step - 1)).toFixed(0)}%`}</div>
                </div>
                {/* stepers end */}

                {(step == 1 && zipcodes) && (<Formik
                    initialValues={{ title: '', zipcodeId: '' }}
                    validationSchema={validationSchema1}
                    onSubmit={(values: any) => handleUpdate1(values)}
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
                                        name="zipcodeId"
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

                {(step == 2 && problems) && (<Formik
                    initialValues={{ problemId: "" }}
                    validationSchema={validationSchema2}
                    onSubmit={(values: any) => handleUpdate2(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">What is your problem ?</p>
                        </div>

                            <Field name={'problemId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {problems?.data && problems.data.map((item: any, key: any) => <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                            onClick={() => {
                                                field.onChange('problemId')(
                                                    item.id
                                                );
                                            }}>
                                            <p className="pl-2 text-sm font-normal text-deep-black">{item.name}</p>
                                        </div>)}
                                    </div>
                                        <div>
                                            {form?.errors['problemId'] && form?.touched['problemId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['problemId']}</div>
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

                {(step == 3 && problemTypes) && (<Formik
                    initialValues={{ problemtypeId: "" }}
                    validationSchema={validationSchema3}
                    onSubmit={(values: any) => handleUpdate3(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Where does the problem come from ?</p>
                        </div>

                            <Field name={'problemtypeId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {problemTypes?.data && problemTypes.data.map((item: any, key: any) => <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                            onClick={() => {
                                                field.onChange('problemtypeId')(
                                                    item.id
                                                );
                                            }}>
                                            <div className={`flex items-center justify-center rounded-md w-14 h-14 bg-gray-400`}>
                                                <Image
                                                    alt=""
                                                    width="44"
                                                    height="44"
                                                    src={item.icon}
                                                />
                                            </div>
                                            <p className="pl-2 text-sm font-normal text-deep-black">{item.name}</p>
                                        </div>)}
                                    </div>
                                        <div>
                                            {form?.errors['problemtypeId'] && form?.touched['problemtypeId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['problemtypeId']}</div>
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

                {(step == 4) && (<Formik
                    initialValues={{ problemtypeId: "" }}
                    validationSchema={validationSchema4}
                    onSubmit={(values: any) => handleUpdate4(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Where does the problem come from ?</p>
                        </div>

                            <Field name={'problemtypeId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {problemTypes?.data && problemTypes.data.map((item: any, key: any) => <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                            onClick={() => {
                                                field.onChange('problemtypeId')(
                                                    item.id
                                                );
                                            }}>
                                            <div className={`flex items-center justify-center rounded-md w-14 h-14 bg-gray-400`}>
                                                <Image
                                                    alt=""
                                                    width="44"
                                                    height="44"
                                                    src={item.icon}
                                                />
                                            </div>
                                            <p className="pl-2 text-sm font-normal text-deep-black">{item.name}</p>
                                        </div>)}
                                    </div>
                                        <div>
                                            {form?.errors['problemtypeId'] && form?.touched['problemtypeId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['problemtypeId']}</div>
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

                {step == 5 && (<Formik
                    initialValues={{ description: "" }}
                    validationSchema={validationSchema5}
                    onSubmit={(values: any) => handleUpdate5(values)}
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

                {step == 6 && (<Formik
                    initialValues={{
                        title: "",
                        firstName: "",
                        lastName: "",
                        city: "",
                        email: "",
                        phone: "",
                        postalCode: ""
                    }}
                    validationSchema={validationSchema6}
                    onSubmit={(values: any) => handleUpdate6(values)}
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

                {step == 7 && (<>
                    <div className="mb-3 border-b-2 border-indigo-800">
                        <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Thank you for submitting a proposal!</p>
                    </div>
                    <p className="text-sm leading-10 md:text-md font-Normal text-deep-black md:max-w-2xl">Thank you for submitting your proposal. A confirmation email will be sent. We will review your proposal and will get back to you within the next few days.</p>
                </>)}
            </div>
        </>
    );
}