"use client"
import { useState, useEffect } from "react";
import { usePost } from "@/contexts/usePost";
import { AiOutlineSearch } from "react-icons/ai";
import { InputBox, PasswordBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import language from "@/contexts/language";


export default function Page() {
    const [step, setStep] = useState<any>(1);
    const [values, setValues] = useState<any>({});
    const { create, data: respond, loading } = usePost();

    const validationSchema1 = Yup.object().shape({
        postalCode: Yup.string().required("Champ requis"),
        company: Yup.string().required("La société est requise"),
    });

    const handleUpdate1 = (value: any) => {
        setValues(value)
        setStep(step + 1)
    }
    const validationSchema2 = Yup.object().shape({
        firstName: Yup.string().required("Champ requis"),
        lastName: Yup.string().required("Champ requis"),
        phone: Yup.string().required("Champ requis"),
    });

    const handleUpdate2 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema3 = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Champ requis"),
        password: Yup.string().required("Mot de passe requis"),
        cPassword: Yup.string().required("Conform Mot de passe requis"),
    });

    const handleUpdate3 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema4 = Yup.object().shape({
        terms: Yup.boolean().oneOf([true], "You must agree to the Terms and Conditions")
    });

    const handleUpdate4 = (value: any) => {
        create("auth/signup", { ...values, ...value, role: "user" })
    }

    const handlePrevious = () => {
        setStep(step - 1)
    }

    useEffect(() => {
        if (respond) {
            toast.success(`Espace Pro Sign Up successfully`);
            setValues({})
            setStep(step + 1)
        }
    }, [respond])

    return (
        <>
            <div className="container mx-auto mb-10 md:mb-10">
                {/* stepers start */}
                <div className="relative flex items-center justify-between my-10 mx-50" >

                    <div className="absolute z-0 mx-3 bg-gray-300 top-4 h-0.5 w-full"></div>

                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8 border border-blue-500 rounded-full " + (step == 1 ? "bg-indigo-600 text-white" : 'bg-white')}>1</div>
                    </div>

                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8  border border-blue-500 rounded-full " + (step == 2 ? "bg-indigo-600 text-white" : 'bg-white')}>2</div>
                    </div>

                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8  border border-blue-500 rounded-full " + (step == 3 ? "bg-indigo-600 text-white" : 'bg-white')}>3</div>
                    </div>


                    <div className="relative flex flex-col items-center">
                        <div className={"flex items-center justify-center flex-shrink-0 w-8 h-8  border border-blue-500 rounded-full " + (step == 4 ? "bg-indigo-600 text-white" : 'bg-white')}>4</div>
                    </div>
                </div>
                {/* stepers end */}

                <div className="flex items-center justify-center">
                    <div className="w-full p-8 bg-white rounded md:w-1/2">

                        {step == 1 && (<Formik
                            initialValues={{ postalCode: '', company: '' }}
                            validationSchema={validationSchema1}
                            onSubmit={(values: any) => handleUpdate1(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <>
                                    <p className="text-lg font-bold text-center text-black">{language.job}</p>
                                    <p className="my-4 font-semibold text-center text-black text-title-sm">{language.activity}</p>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="postalCode"
                                            label={language.postalcode_label}
                                            placeholder={language.postal_placeholder}
                                        />
                                    </div>
                                    <InputBox
                                        required={true}
                                        name="company"
                                        label={language.company_label}
                                        placeholder={language.company_place}
                                    />
                                    <Buttons className="w-full p-2 mt-5 text-white bg-indigo-800 rounded" value={"Suivant"} onClick={handleSubmit} />
                                </>)}
                        </Formik>)}

                        {step == 2 && (<Formik
                            initialValues={{ firstName: '', lastName: '', phone: '' }}
                            validationSchema={validationSchema2}
                            onSubmit={(values: any) => handleUpdate2(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <>
                                    <p className="mb-5 text-lg font-bold text-center text-black">{language.contact_details}</p>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="firstName"
                                            label={language.firstName_label}
                                            placeholder={language.firstName_placeholder}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="lastName"
                                            label={language.lastName_label}
                                            placeholder={language.lastName_placeholder}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="phone"
                                            label={language.phonenum_label}
                                            placeholder={language.phonenum_placeholder}
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <Buttons className="p-2 mt-5 text-white bg-indigo-800 rounded mr-5" value={"Précédente"} onClick={handlePrevious} />
                                        <Buttons className="p-2 mt-5 text-white bg-indigo-800 rounded" value={"Suivant"} onClick={handleSubmit} />
                                    </div>
                                </>)}
                        </Formik>)}

                        {step == 3 && (<Formik
                            initialValues={{ email: '', password: '', cPassword: '' }}
                            validationSchema={validationSchema3}
                            onSubmit={(values: any) => handleUpdate3(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <>
                                    <p className="mb-5 text-lg font-bold text-center text-black">Votre compte</p>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="email"
                                            label={language.email_label}
                                            placeholder={language.email_placeholder}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <PasswordBox
                                            required={true}
                                            name="password"
                                            label={language.password}
                                            placeholder={language.password_placeholder}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <PasswordBox
                                            required={true}
                                            name="cPassword"
                                            label={language.confirm_password}
                                            placeholder={language.confirm_password_placeholder}
                                        />
                                    </div>
                                    <p className="text-black">{language.numeric_character}</p>
                                    <p className="text-black">{language.special_character}</p>
                                    <div className="flex justify-center">
                                        <Buttons className="p-2 mt-5 text-white bg-indigo-800 rounded mr-5" value={"Précédente"} onClick={handlePrevious} />
                                        <Buttons className="p-2 mt-5 text-white bg-indigo-800 rounded" value={"Suivant"} onClick={handleSubmit} />
                                    </div>                                
                                    </>)}
                        </Formik>)}

                        {step == 4 && (
                            <Formik
                                initialValues={{ terms: false }}
                                validationSchema={validationSchema4}
                                onSubmit={(values: any) => handleUpdate4(values)}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                    <>
                                        <div className="w-full mx-auto">
                                            {/* <p className="mb-5 text-lg font-bold text-center text-black">cette partie est à supprimer</p> */}
                                            <p className="py-5 text-sm font-bold text-deep-black">{language.terms}</p>
                                            <ul className="text-sm list-disc list-inside text-gray">
                                                <li className="py-1">{language.conditions_1}</li>
                                                <li className="py-1">{language.conditions_2}</li>
                                                <li className="py-1">{language.conditions_3}</li>
                                            </ul>
                                            <p className="py-5 text-sm font-bold text-deep-black">{language.additional}</p>
                                            <p className="py-1">{language.additional_1}</p>
                                            <p className="py-1">{language.additional_2}</p>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="terms"
                                                    className="mr-1"
                                                    checked={values.terms}
                                                    onChange={handleChange}
                                                />
                                                {language.agree_terms}
                                            </label>
                                            {errors.terms ? (
                                                <div style={{ color: 'red' }}>{'Vous devez accepter les termes et conditions'}</div>
                                            ) : null}
                                        </div>
                                        <div className="flex justify-center">
                                            <Buttons className="p-2 mt-5 text-white bg-indigo-800 rounded mr-5" value={"Précédente"} onClick={handlePrevious} />
                                            <Buttons className="p-2 mt-5 text-white bg-indigo-800 rounded" value={"Suivant"} onClick={handleSubmit} />
                                        </div></>)}
                            </Formik>)}

                        {step == 5 && (<>
                            <div className="mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">{language.successfully}</p>
                            </div>
                            <p className="text-sm leading-10 md:text-md font-Normal text-deep-black md:max-w-2xl">{language.sign_up}</p>
                        </>)}

                    </div>
                </div>

            </div>
        </>
    );
}