"use client"
import { useEffect } from "react";
import { usePatch } from "@/contexts/usePatch";
import { PasswordBox, Buttons } from "@/components/RenderFroms";
import { Modal } from 'antd';
import { Formik } from "formik";
import language from "@/contexts/language";
import * as Yup from "yup";

export default function Password({ value, setOpen, handleOk }: any) {

    const { edit, data: respond, loading } = usePatch();

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string().required("Password is required"),
        conPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleUpdate = (values: any) => {
        edit("users", { ...values, id: value.id })

    }

    useEffect(() => {
        if ((respond as any)?.data) {
            handleOk()
        }
    }, [respond])

    return (
        <Modal width="70%" title="Change my password" open={true} footer={null} onCancel={() => setOpen(false)}>
            <Formik
                initialValues={{ newPassword: "", conPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleSubmit }) => {
                    return <div className="container">
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
                        <div className="flex justify-end mt-5">
                            <Buttons loading={loading} className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" onClick={handleSubmit} />
                        </div>
                    </div>
                }}
            </Formik>
        </Modal>
    );
}