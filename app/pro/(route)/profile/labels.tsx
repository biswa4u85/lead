"use client"
import { useEffect } from "react";
import { usePatch } from "@/contexts/usePatch";
import { useFetch } from "@/contexts/useFetch";
import { FileBox, DateBox, SelectBox, MultiSelectBox, Buttons } from "@/components/RenderFroms";
import { Modal } from 'antd';
import { Formik } from "formik";
import language from "@/contexts/language";
import * as Yup from "yup";

export default function Labels({ value, setOpen, handleOk }: any) {

    const { data: tags } = useFetch({ url: "tags", query: JSON.stringify({ showAll: true }) });
    const tagOptions = tags?.data ? tags.data.map((item: any) => {
        return { label: `${item?.name}`, value: item?.id }
    }) : []

    const { edit, data: respond, loading } = usePatch();

    const validationSchema = Yup.object().shape({
        label: Yup.string().required("Label is required"),
        file: Yup.string().required("File is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
    });

    const handleUpdate = (values: any) => {
        let tags = value.tags ?? []
        tags.push(values)
        edit("users", { tags, id: value.id })
    }

    useEffect(() => {
        if ((respond as any)?.data) {
            handleOk()
        }
    }, [respond])

    return (
        <Modal width="70%" title={language.quality} open={true} footer={null} onCancel={() => setOpen(false)}>
            <Formik
                initialValues={{ label: "", file: "", startDate: "", endDate: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleSubmit }) => {
                    return <div className="container">
                        <div className="my-3 p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                            <SelectBox
                                required={true}
                                name="label"
                                label={`Étiquettes`}
                                options={tagOptions}
                            />
                        </div>
                        <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                            <FileBox
                                required={true}
                                label={`Fichier`}
                                name="file"
                                placeholder={'Tags'}
                            />
                        </div>
                        <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                            <div className="flex flex-col">
                                <DateBox
                                    required={true}
                                    name="startDate"
                                    placeholder={`Sélectionner la date`}
                                    label={`Date de validation du`}
                                />
                            </div>
                            <div className="flex flex-col">
                                <DateBox
                                    required={true}
                                    placeholder={`Sélectionner la date`}
                                    name="endDate"
                                    label={`Date de fin`}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-5">
                            <Buttons loading={loading} className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value={`Ajouter un label`} onClick={handleSubmit} />
                        </div>
                    </div>
                }}
            </Formik>
        </Modal>
    );
}