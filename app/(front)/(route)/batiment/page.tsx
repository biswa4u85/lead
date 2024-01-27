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

export default function Page() {
    const params = useSearchParams()
    const name = params.get('name')
    const [step, setStep] = useState<any>(1);
    const [project, setProject] = useState<any>(null);
    const [values, setValues] = useState<any>({});
    const { data: projects } = useFetch({ url: "projects", query: JSON.stringify({}) });
    const { data: services } = useFetch({ url: "services", query: JSON.stringify({}) });
    const { create, data: respond, loading } = usePost();

    useEffect(() => {
        if (name) {
            let project = projects?.data && projects?.data.find((item: any) => item.name == name)
            if (project) setProject(project.id)
        }
    }, [projects])

    const validationSchema1 = Yup.object().shape({
        projectId: Yup.string().required("Project is required"),
    });

    const handleUpdate1 = (value: any) => {
        setValues(value)
        setStep(step + 1)
    }

    const validationSchema2 = Yup.object().shape({
        serviceId: Yup.string().required("Service is required"),
    });

    const handleUpdate2 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema3 = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
    });

    const handleUpdate3 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema4 = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        postalCode: Yup.string().required("Postal Code is required"),
    });

    const handleUpdate4 = (value: any) => {
        create("leads", { ...values, ...value })
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
                <div className="relative flex items-center justify-between my-10 mx-15" >

                    <div className="absolute z-0 mx-3 bg-gray-300 top-4 left-4.5 h-0.5 w-180"></div>

                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8 border border-blue-500 rounded-full " + (step == 1 ? "bg-indigo-600 text-white" : 'bg-white')}>1</div>
                        <div className="mt-2 text-center">Your project</div>
                    </div>


                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8  border border-blue-500 rounded-full " + (step == 2 ? "bg-indigo-600 text-white" : 'bg-white')}>2</div>
                        <div className="mt-2 text-center">Supply and Installation</div>
                    </div>


                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8  border border-blue-500 rounded-full " + (step == 3 ? "bg-indigo-600 text-white" : 'bg-white')}>3</div>
                        <div className="mt-2 text-center">Project Detail</div>
                    </div>


                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8  border border-blue-500 rounded-full " + (step == 4 ? "bg-indigo-600 text-white" : 'bg-white')}>4</div>
                        <div className="mt-2 text-center">Your contact details</div>
                    </div>
                </div>
                {/* stepers end */}

                {(step == 1 && projects) && (<Formik
                    initialValues={{ projectId: project }}
                    validationSchema={validationSchema1}
                    onSubmit={(values: any) => handleUpdate1(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Select the type of work you want to carry out</p>
                        </div>

                            <Field name={'projectId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {projects?.data && projects.data.map((item: any, key: any) => <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                            onClick={() => {
                                                field.onChange('projectId')(
                                                    item.id
                                                );
                                            }} >
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
                                            {form?.errors['projectId'] && form?.touched['projectId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['projectId']}</div>
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

                {(step == 2 && services) && (<Formik
                    initialValues={{ serviceId: "" }}
                    validationSchema={validationSchema2}
                    onSubmit={(values: any) => handleUpdate2(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Select the type of work you want to carry out</p>
                        </div>

                            <Field name={'serviceId'}>
                                {({ field, form, meta }: any) => {
                                    return <><div className="flex flex-wrap justify-normal">
                                        {services?.data && services.data.map((item: any, key: any) => <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 ${field.value == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                            onClick={() => {
                                                field.onChange('serviceId')(
                                                    item.id
                                                );
                                            }} >
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
                                            {form?.errors['serviceId'] && form?.touched['serviceId'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['serviceId']}</div>
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

                {step == 3 && (<Formik
                    initialValues={{ title: "", description: "" }}
                    validationSchema={validationSchema3}
                    onSubmit={(values: any) => handleUpdate3(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>
                            <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Describe your project to us</p>
                            </div>
                            <div className="px-5 mb-2">
                                <InputBox
                                    required={true}
                                    name="title"
                                    label="First Name"
                                    placeholder="Enter the Title"
                                />
                            </div>
                            <div className="px-5">
                                <TextareaBox
                                    required={true}
                                    name="description"
                                    label="Description"
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

                {step == 4 && (<Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        city: "",
                        email: "",
                        phone: "",
                        postalCode: ""
                    }}
                    validationSchema={validationSchema4}
                    onSubmit={(values: any) => handleUpdate4(values)}
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
                                <div className="flex flex-col">
                                    <InputBox
                                        required={true}
                                        name="postalCode"
                                        label="Postal Code"
                                        placeholder="Enter Postal Code"
                                    />
                                </div>
                            </div>
                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons loading={loading} className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Submitted"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 5 && (<>
                    <div className="mb-3 border-b-2 border-indigo-800">
                        <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Thank you for submitting a proposal!</p>
                    </div>
                    <p className="text-sm leading-10 md:text-md font-Normal text-deep-black md:max-w-2xl">Thank you for submitting your proposal. A confirmation email will be sent. We will review your proposal and will get back to you within the next few days.</p>
                </>)}
            </div>
        </>
    );
}