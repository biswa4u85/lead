"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFetchByLoad } from "@/contexts/useFetchByLoad";
import { usePost } from "@/contexts/usePost";
import { InputBox, TextareaBox, Buttons } from "@/components/RenderFroms";
import { Formik, Field } from "formik";
import { useSearchParams } from 'next/navigation'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import language from "@/contexts/language";

const defaultValue = {
    depannageCategoryId: "",
    title: "",
    description: "",
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    accept: "",
    postalCode: ""
}

export default function Page() {
    const params = useSearchParams()
    const name = params.get('name')
    const [step, setStep] = useState<any>(1);
    const [progress, setProgress] = useState<any>(0);
    const [categoryId, setCategoryId] = useState<any>("0");
    const [depannageCategorys, setDepannageCategorys] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [values, setValues] = useState<any>(null);
    let val = 100 / 5
    const { fetch, data: categorys } = useFetchByLoad({ url: "depannageCategorys", query: JSON.stringify({ parentId: categoryId }) });

    useEffect(() => {
        fetch()
    }, [categoryId])

    useEffect(() => {
        if (name) {
            setValues({ ...defaultValue, postalCode: name })
        } else {
            setValues({ ...defaultValue })
        }
    }, [name])


    const { create, data: respond, loading } = usePost();

    const validationSchemaPrice = Yup.object().shape({
        // accept: Yup.string().required("Accept Terms"),
    });

    const validationSchemaDescription = Yup.object().shape({
        // title: Yup.string().required("What do you need is required"),
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
        if (step == 1) {
            setDepannageCategorys(null)
            setCategoryId("0")
            setStep(1)
            setProgress(val)
        } else {
            setStep(step - 1)
            setProgress(val)
        }
    }

    const handleNext = () => {
        if (depannageCategorys) {
            setProgress(progress + val)
            setError(null)
            if (depannageCategorys?.price) {
                setStep(2)
            } else {
                setCategoryId(depannageCategorys?.id)
                setDepannageCategorys(null)
            }
        } else {
            setError('La catégorie est obligatoire')
        }
    }

    const handleUpdate = (value: any) => {
        setProgress(progress == 0 ? val : progress + val)
        if (step == 4) {
            create("depannages", { ...values, ...value, depannageCategoryId: depannageCategorys?.id })
        } else {
            setValues({ ...values, ...value })
            setStep(step + 1)
        }
    }

    useEffect(() => {
        if (respond) {
            setProgress(100)
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

                {step == 1 && (<>
                    <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                        <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black">{"Quel est votre problème ? "}</p>
                    </div>
                    <div className="flex flex-wrap justify-normal">
                        {categorys?.data && categorys.data.map((item: any, key: any) => {
                            return <div key={key} className={`flex items-center w-73 md:my-2 my-2 mx-2 ml-2 rounded-[5px] border p-2 cursor-pointer ${depannageCategorys?.id == item.id ? "bg-gray-500" : "border-gray-500"}`}
                                onClick={() => {
                                    setDepannageCategorys(item);
                                }}>
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
                        {error && (
                            <div className="mt-1 text-xs-1 text-meta-1">{error}</div>
                        )}
                    </div>
                    <div className="my-4 border-t-2 border-gray-500"></div>
                    <div className="flex justify-center">
                        <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Précédent"} onClick={handlePrevious} />
                        <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Suivant"} onClick={handleNext} />
                    </div>
                </>)}

                {(step == 2) && (<Formik
                    initialValues={values}
                    validationSchema={validationSchemaPrice}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit }) => (
                        <><div className="mx-3 mb-3 border-b-2 border-indigo-800">
                            <p className="text-sm leading-10 md:text-lg font-inter font-Normal text-deep-black md:max-w-2xl">{language.problem}</p>
                        </div>

                            <Field name={'accept'}>
                                {({ field, form, meta }: any) => {
                                    return <>
                                        <div className="grid mx-3 md:grid-cols-2 gap-11 ">
                                            <div className="p-4 border border-gray-500 rounded-md md:col-span-1">
                                                <p className="pl-2 font-inter font-semibold text-[23px] text-graylight-900">{depannageCategorys?.description}</p>
                                                <p className="pl-2 font-inter font-bold pt-3 text-[31px] text-graylight-900">€{depannageCategorys?.price}</p>
                                                <p className="pl-2 font-inter text-[12px] text-danger">{`Le prix indiqué est une estimation`}</p>
                                                <input
                                                    name="accept"
                                                    style={{ display: "none" }}
                                                    readOnly={true}
                                                />
                                                {/* <button onClick={() => field.onChange('accept')(depannageCategorys?.price)}
                                                    className="w-full px-4 py-2 my-5 text-sm font-normal text-indigo-800 bg-blue-500 border border-indigo-800 rounded-md font-inter">
                                                    {language.order}
                                                </button> */}
                                            </div>
                                        </div>

                                        <div>
                                            {form?.errors['accept'] && form?.touched['accept'] && (
                                                <div className="mt-1 text-xs-1 text-meta-1">{form.errors['accept']}</div>
                                            )}
                                        </div>
                                    </>
                                }}
                            </Field>

                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Précédent"} onClick={handlePrevious} />
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Demander une intervention"} onClick={handleSubmit} />
                            </div>
                        </>)}
                </Formik>)}

                {step == 3 && (<Formik
                    initialValues={values}
                    validationSchema={validationSchemaDescription}
                    onSubmit={(values: any) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <>

                            <div className="mx-3 mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">{language.describe}</p>
                            </div>
                            {/* <div className="px-5">
                                <InputBox
                                    required={true}
                                    name="title"
                                    label={language.title_label}
                                    placeholder={language.title_placeholder}
                                />
                            </div> */}
                            <div className="px-5 mt-4">
                                <TextareaBox
                                    required={true}
                                    name="description"
                                    className="w-full p-2 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500"
                                    // label={language.postalcode_label}
                                    placeholder={language.project_detail}
                                />
                            </div>
                            <div className="my-4 border-t-2 border-gray-500"></div>
                            <div className="flex justify-center">
                                <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Précédent"} onClick={handlePrevious} />
                                <Buttons className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Suivant"} onClick={handleSubmit} />
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
                                <Buttons className="p-2 mt-3 mr-2 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Précédent"} onClick={handlePrevious} />
                                <Buttons loading={loading} className="p-2 mt-3 text-sm font-medium text-indigo-800 border border-indigo-800 rounded-md" value={"Demander le devis"} onClick={handleSubmit} />
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