"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { useStorage } from "@/contexts/useStorage";
import { MultiSelectBox, InputBox, TextareaBox, PasswordBox, FileBox, Buttons } from "@/components/RenderFroms";
import { Modal } from 'antd';
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Loader from "@/components/common/Loader";
import language from "@/contexts/language";

export default function Docs({ value, setOpen, handleOk }: any) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        file: Yup.string().required("Image is required"),
    });

    const handleUpdate = (values: any) => {
        handleOk(values)
    }

    return (
        <Modal width="70%" title="MY OFFICIAL DOCUMENT" open={true} footer={null} onCancel={() => setOpen(false)}>
            <Formik
                initialValues={value}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return <div className="container">
                        <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                            <div className="text-xs font-semibold"><InputBox placeholder="Name" required={true} name={`name`} /></div>
                            <div className="flex items-center">
                                <FileBox placeholder="File" required={true} name={`file`} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-5 mb-10 md:mb-10">
                            <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" onClick={handleSubmit} />
                        </div>
                    </div>
                }}
            </Formik>
        </Modal>
    );
}