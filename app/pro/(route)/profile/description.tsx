"use client"
import { useEffect } from "react";
import { usePatch } from "@/contexts/usePatch";
import { TextareaBox, Buttons } from "@/components/RenderFroms";
import { Modal } from 'antd';
import { Formik } from "formik";
import * as Yup from "yup";

export default function Description({ value, setOpen, handleOk }: any) {

    const { edit, data: respond, loading } = usePatch();

    const validationSchema = Yup.object().shape({
        companyDel: Yup.string().required('Company Details required'),
    });

    const handleUpdate = (values: any) => {
        edit("users", { ...values })

    }

    useEffect(() => {
        if ((respond as any)?.data) {
            handleOk()
        }
    }, [respond])

    return (
        <Modal width="70%" title="Company Details" open={true} footer={null} onCancel={() => setOpen(false)}>
            <Formik
                initialValues={value}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleSubmit }) => {
                    return <div className="container">
                        <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                            <TextareaBox
                                required={true}
                                name="companyDel"
                                style={{ width: '100%' }}
                                placeholder={'Company Details'}
                            />
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