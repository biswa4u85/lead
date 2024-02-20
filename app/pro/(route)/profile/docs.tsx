"use client"
import { useEffect } from "react";
import { usePatch } from "@/contexts/usePatch";
import { FileBox, Buttons } from "@/components/RenderFroms";
import { Modal } from 'antd';
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import language from "@/contexts/language";

const myDocs = [{ name: language.kbis, file: '' }, { name: language.assurance, file: '' }, { name: language.guarantee, file: '' }]

export default function Docs({ value, setOpen, handleOk }: any) {

    const { edit, data: respond, loading } = usePatch();

    const validationSchema = Yup.object().shape({

    });

    const handleUpdate = (values: any) => {
        let docs = []
        for (let key in myDocs) {
            docs.push({ name: myDocs[key].name, file: values.docs[key]?.file ?? '' })
        }
        edit("users", { docs, id: value.id })
    }

    useEffect(() => {
        if ((respond as any)?.data) {
            handleOk()
        }
    }, [respond])

    return (
        <Modal width="70%" title="MY OFFICIAL DOCUMENT" open={true} footer={null} onCancel={() => setOpen(false)}>
            <Formik
                initialValues={value}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return <div className="container">
                        <FieldArray name="docs">
                            {({ push, remove }) => (
                                <div>
                                    {myDocs.map((user: any, index: any) => (
                                        <div key={index} className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                                            <div className="text-xs font-semibold">{user.name}</div>
                                            <div className="flex items-center cursor-pointer">
                                                <FileBox
                                                    required={true}
                                                    name={`docs.${index}.file`}
                                                    placeholder="Upload Profile"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>
                        <div className="flex justify-end mt-5">
                            <Buttons loading={loading} className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" onClick={handleSubmit} />
                        </div>
                    </div>

                }}
            </Formik>
        </Modal>
    );
}