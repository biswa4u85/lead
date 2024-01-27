"use client"
import { useState, useEffect } from "react";
import { usePost } from "@/contexts/usePost";
import { AiOutlineSearch } from "react-icons/ai";
import { InputBox, PasswordBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';

export default function Page() {
    const [step, setStep] = useState<any>(1);
    const [values, setValues] = useState<any>({});
    const { create, data: respond, loading } = usePost();

    const validationSchema1 = Yup.object().shape({
        postalCode: Yup.string().required("Postal Code is required"),
        company: Yup.string().required("Company is required"),
    });

    const handleUpdate1 = (value: any) => {
        setValues(value)
        setStep(step + 1)
    }
    const validationSchema2 = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phone: Yup.string().required("Phone is required"),
    });

    const handleUpdate2 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema3 = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        cPassword: Yup.string().required("Conform Password is required"),
    });

    const handleUpdate3 = (value: any) => {
        setValues({ ...values, ...value })
        setStep(step + 1)
    }

    const validationSchema4 = Yup.object().shape({
        terms: Yup.boolean().oneOf([true], "You must agree to the Terms and Conditions")
    });

    const handleUpdate4 = (value: any) => {
        create("auth/signup", { ...values, ...value })
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
                                    <p className="text-lg font-bold text-center text-black">Your Job</p>
                                    <p className="my-4 font-semibold text-center text-black text-title-sm">Your Main Activity</p>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="postalCode"
                                            label="Your Postal Code"
                                            placeholder="Enter Your Postal Code"
                                        />
                                    </div>
                                    <InputBox
                                        required={true}
                                        name="company"
                                        label="Name of your Company"
                                        placeholder="Enter Your Company"
                                    />
                                    <Buttons className="w-full p-2 mt-5 text-white bg-indigo-800 rounded" value={"Next"} onClick={handleSubmit} />
                                </>)}
                        </Formik>)}

                        {step == 2 && (<Formik
                            initialValues={{ firstName: '', lastName: '', phone: '' }}
                            validationSchema={validationSchema2}
                            onSubmit={(values: any) => handleUpdate2(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <>
                                    <p className="mb-5 text-lg font-bold text-center text-black">Your contact details</p>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="firstName"
                                            label="First name"
                                            placeholder="Enter Your First name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="lastName"
                                            label="Last name"
                                            placeholder="Enter Your Last name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="phone"
                                            label="Phone number"
                                            placeholder="Enter Your Phone number"
                                        />
                                    </div>
                                    <Buttons className="w-full p-2 mt-5 text-white bg-indigo-800 rounded" value={"Next"} onClick={handleSubmit} />
                                </>)}
                        </Formik>)}

                        {step == 3 && (<Formik
                            initialValues={{ email: '', password: '', cPassword: '' }}
                            validationSchema={validationSchema3}
                            onSubmit={(values: any) => handleUpdate3(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <>
                                    <p className="mb-5 text-lg font-bold text-center text-black">Your account</p>
                                    <div className="mb-3">
                                        <InputBox
                                            required={true}
                                            name="email"
                                            label="Email"
                                            placeholder="Enter Your Email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <PasswordBox
                                            required={true}
                                            name="password"
                                            label="Password"
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <PasswordBox
                                            required={true}
                                            name="cPassword"
                                            label="Confirm Password"
                                            placeholder="Enter Confirm Password"
                                        />
                                    </div>
                                    <p className="text-black">At least six numeric character</p>
                                    <p className="text-black">At least one special character</p>
                                    <Buttons className="w-full p-2 mt-5 text-white bg-indigo-800 rounded" value={"Next"} onClick={handleSubmit} />
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
                                            <p className="my-5 text-lg font-bold text-center text-black ">Sponsorship</p>
                                            <p className="text-sm text-black">Sponsor code</p>
                                            <div className="flex items-center mx-auto mt-5 bg-white border border-gray-300 rounded-full ">
                                                <div className="mx-2">
                                                    <AiOutlineSearch size="20" className="text-gray" />
                                                </div>
                                                <input type="text" className="flex-grow text-sm font-semibold text-black border-none focus:outline-none" placeholder="Sponsor code" />
                                                <button className="flex flex-row items-center justify-center px-20 py-3 text-xs font-semibold text-white bg-indigo-800 rounded-full hover:bg-blue-700">
                                                    APPLY
                                                </button>
                                            </div>
                                            <p className="py-5 text-sm font-bold text-deep-black">Terms and Conditions</p>
                                            <ul className="text-sm list-disc list-inside text-gray">
                                                <li className="py-1">I acknowledge having read the General Conditions of Use</li>
                                                <li className="py-1">I agree to receive communications electronically about product or service offers from Habitatpresto</li>
                                                <li className="py-1">I agree to receive communications electronically about product or service offers from Partners</li>
                                            </ul>
                                            <p className="py-5 text-sm font-bold text-deep-black">Additional Information</p>
                                            <p className="py-1">The information collected on this form is intended for HabitatPresto for the purposes of processing your orders, managing your customer account, monitoring the quality of our services and commercial prospecting. They are subject to computer processing intended for customer service and the marketing department of HabitatPresto.</p>
                                            <p className="py-1">To know and exercise your rights relating to the use of your data, please consult our Charter on the protection of personal data or contact us at the following address: DPO@habitatpresto.com To validate</p>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="terms"
                                                    className="mr-1"
                                                    checked={values.terms}
                                                    onChange={handleChange}
                                                />
                                                I agree to the Terms and Conditions
                                            </label>
                                            {/* {errors.terms ? (
                                                <div style={{ color: 'red' }}>{errors.terms}</div>
                                            ) : null} */}
                                        </div>
                                        <Buttons className="w-full p-2 mt-5 text-white bg-indigo-800 rounded" value={"Submitted"} onClick={handleSubmit} />
                                    </>)}
                            </Formik>)}

                        {step == 5 && (<>
                            <div className="mb-3 border-b-2 border-indigo-800">
                                <p className="text-sm leading-10 md:text-lg font-Normal text-deep-black md:max-w-2xl">Sign up Successfully!</p>
                            </div>
                            <p className="text-sm leading-10 md:text-md font-Normal text-deep-black md:max-w-2xl">You are Sign up Successfully. We will contact you very soon!</p>
                        </>)}

                    </div>
                </div>

            </div>
        </>
    );
}