"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { useFetchByLoad } from "@/contexts/useFetchByLoad";
import { usePatch } from "@/contexts/usePatch";
import { MultiSelectBox, InputBox, FileBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Popconfirm } from 'antd';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import Loader from "@/components/common/Loader";
import language from "@/contexts/language";
import { useSession } from 'next-auth/react'
import Description from '../description'
import Docs from '../docs'
import Labels from '../labels'

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { data: userData, update: sessionUpdate } = useSession();
    const [open, setOpen] = useState<any>(false);
    const [openDescription, setOpenDescription] = useState<any>(false);
    const [openLabels, setOpenLabels] = useState<any>(false);
    const [value, setValue] = useState<any>(null)
    const [tagIds, setTagIds] = useState([]);
    const [tags, setTags] = useState([]);

    const { fetch, data } = useFetchByLoad({ url: "users", query: JSON.stringify({ id: params.id }) });

    const { data: allTags } = useFetch({ url: "tags", query: JSON.stringify({ ids: tagIds }) });
    const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({ showAll: true }) });
    const { data: servicesNew } = useFetch({ url: "depannageCategorys", query: JSON.stringify({ showAll: true }) });
    const { data: zipcodes } = useFetch({ url: "zipcode", query: JSON.stringify({ showAll: true }) });
    const zipcodeOptions = zipcodes?.data ? zipcodes.data.map((item: any) => {
        return { label: `${item?.name}-${item?.code}`, value: item?.id }
    }) : []

    useEffect(() => {
        if (params.id) {
            fetch()
        }
    }, [params])

    useEffect(() => {
        if (data?.data) {
            let tags = data.data[0]?.tags ? data.data[0].tags.map((item: any) => item.label) : []
            setValue(data.data[0])
            setTagIds(tags)
        }
    }, [data])

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Champ requis"),
        lastName: Yup.string().required("Champ requis"),
        company: Yup.string().required("La société est requise"),
        sponsorCode: Yup.string().required("Sponsor Code is required"),
        image: Yup.string().required("Image is required"),
    });

    const validationSchema1 = Yup.object().shape({
        citys: Yup.array().min(1, 'Citys must have at least one item'),
    });

    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (values: any) => {
        edit("users", { ...values, id: params.id })
    }

    useEffect(() => {
        if (respond) {
            sessionUpdate({
                info: { name: `${(respond as any)?.data?.firstName} ${(respond as any)?.data?.lastName}`, image: `${(respond as any)?.data?.image}` }
            })
            setTimeout(() => {
                toast.success(`User update successfully`);
                router.push(`/pro/profile`)
            }, 1000)
        }
    }, [respond])

    useEffect(() => {
        if (allTags?.data && value?.tags) {
            let tags: any = []
            for (let item of value?.tags) {
                let tag = allTags.data.find((it: any) => it.id == item.label)
                item['name'] = tag?.name ?? ''
                tags.push(item)
            }
            setTags(tags)
        }
    }, [allTags])

    return (
        <>
            {!value ? <Loader /> :
                <Formik
                    initialValues={value}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (<div className="container mt-10 mx-auto md:px-10">
                        <div className="flex justify-between mt-5 items-cente mx-5 md:mx-0">
                            <p className="text-sm font-bold text-black md:text-lg">{language.company_details}</p>
                            <button onClick={() => setOpenDescription(value)} className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                            Modifier la description de mon entreprise
                            </button>
                        </div>
                        <div className="my-4 border-t-2 border-gray-500"></div>
                        <p className="py-2 font-semibold text-gray-600 text-title-xsm mx-5 md:mx-0 mb-10">{value?.companyDel}</p>
                        <p className="text-lg font-bold text-black mx-5 md:mx-0">{language.information}</p>
                        <div className="my-4 border-t-2 border-gray-500"></div>

                        {/* start form section */}

                        <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="company"
                                    label={language.company_name}
                                    placeholder={language.company_name}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="civility"
                                    label={language.civility}
                                    placeholder={language.civility}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    readOnly={true}
                                    name="email"
                                    label={language.email}
                                    placeholder={language.email}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="lace"
                                    label={language.lace}
                                    placeholder={language.lace}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="siret"
                                    label={language.siret}
                                    placeholder={language.siret}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="phone"
                                    label={language.phone}
                                    placeholder={language.phone}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="creation"
                                    label={language.creation}
                                    placeholder={language.creation}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="firstName"
                                    label={language.firstName_label}
                                    placeholder={language.firstName_label}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="mobile"
                                    label={language.mobile}
                                    placeholder={language.mobile}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="address"
                                    label={language.address}
                                    placeholder={language.address}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="function"
                                    label={language.function}
                                    placeholder={language.function}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="internet"
                                    label={language.internet}
                                    placeholder={language.internet}
                                />
                            </div>
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="city"
                                    label={language.city}
                                    placeholder={language.city}
                                />
                            </div>
                            {/* <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="job"
                                    label={language.job}
                                    placeholder={language.job}
                                />
                            </div> */}
                        </div>

                        <p className="mt-5 text-lg font-bold text-black mx-5 md:mx-0">{language.profile_photo}</p>
                        <div className="my-4 border-t-2 border-gray-500 mx-5 md:mx-0">
                            <FileBox
                                required={true}
                                name="image"
                                label={`Profil`}
                                placeholder={`Upload Profil`}
                            /></div>
                        <p className="py-5 text-indigo-800 text-xs1 mx-5 md:mx-0">{language.format_text}</p>
                        <div className="flex justify-end mt-5 mb-10 md:mb-10">
                            <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value={`Enregistré`} loading={loading} onClick={handleSubmit} />
                        </div>
                    </div>)}
                </Formik>}

            {!value ? <Loader /> :
                <Formik
                    initialValues={value}
                    validationSchema={validationSchema1}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                        return <div className="container mx-auto md:px-10">
                            <p className="text-lg font-bold text-black md:mx-0">{language.catagorys}</p>
                            <div className="my-4 border-t-2 border-gray-500"></div>

                            {/* start form section */}
                            <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                                <div className="flex flex-col">
                                    <MultiSelectBox
                                        // required={true}
                                        multiple={true}
                                        tree={true}
                                        treeCheckable={true}
                                        name="category"
                                        label={language.catagorys_label}
                                        placeholder={language.catagorys_placeholder}
                                        options={categorys?.data ?? []}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <MultiSelectBox
                                        // required={true}
                                        multiple={true}
                                        tree={true}
                                        treeCheckable={true}
                                        name="category_new"
                                        label={language.Depannage_label}
                                        placeholder={language.catagorys_placeholder}
                                        options={servicesNew?.data ?? []}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <MultiSelectBox
                                        required={true}
                                        multiple={true}
                                        treeCheckable={true}
                                        name="citys"
                                        label={language.postal_label}
                                        placeholder={language.postal_placeholder}
                                        options={zipcodeOptions}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-5 mb-10 md:mb-10">
                                <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value={`Enregistré`} loading={loading} onClick={handleSubmit} />
                            </div>
                        </div>
                    }}
                </Formik>}

            <div className="container mx-auto my-20 md:px-10">
                <div className="flex justify-between mt-5 items-cente mx-5 md:mx-0">
                    <p className="text-sm font-bold text-black md:text-lg">{language.description}</p>
                    <button onClick={() => setOpenDescription(value)} className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                    Modifier la description de mon entreprise
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <div className=''>
                    <div className="flex flex-col w-full">
                        {value?.companyDel}
                    </div>
                </div>
            </div>

            {/* start last page */}
            <div className="container mx-auto md:px-10">

                <div className="flex justify-between mt-5 items-cente mx-5 md:mx-0">
                    <p className="text-sm font-bold text-black md:text-lg">{language.document}</p>
                    <button onClick={() => setOpen(value)} className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                        {language.edit_details}
                    </button>
                </div>

                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 text-gray-600 mx-5 md:mx-0">{language.insurance_text}</p>

                {value && value.docs && value.docs.map((item: any, key: any) =>
                    <div key={key} className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                        <div className="text-xs font-semibold">{item.name}</div>
                        <div className="flex items-center cursor-pointer" onClick={() => setOpen(value)}>
                            {/* <p className="text-xs font-semibold">{item.file}</p> */}
                            <img src={item.file} width={30} />
                            <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                        </div>
                    </div>)}
            </div >
            {/* End last page */}


            {/* start last page */}
            <div className="container mx-auto mt-20 md:px-10">

                <div className="flex justify-between mt-5 items-cente mx-5 md:mx-0">
                    <p className="text-sm font-bold text-black md:text-lg">{language.quality}</p>
                    <button onClick={() => setOpenLabels(value)} className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0">
                        {language.add}
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                {tags.map((item: any, key: any) =>
                    <div key={key} className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                        <div className="text-xs font-semibold">{item.name}</div>
                        <div className="text-xs font-semibold">{item.startDate}</div>
                        <div className="text-xs font-semibold">{item.endDate}</div>
                        <div className="flex items-center cursor-pointer">
                            <img src={item.file} width={30} />
                            <Popconfirm
                                title="Delete the label"
                                description="Are you sure to delete this label?"
                                onConfirm={() => {
                                    let tags = value.tags ?? []
                                    tags.splice(key, 1);
                                    edit("users", { tags, id: value.id })
                                }}
                                okText="YES"
                                cancelText="NO"
                            >
                                <AiOutlineMinusCircle size="20" className="ml-10 text-danger" />
                            </Popconfirm>

                        </div>
                    </div>
                )}
            </div>

            {/* End last page */}
            {openDescription && (<Description value={openDescription} setOpen={setOpenDescription} handleOk={() => {
                fetch()
                setOpenDescription(false)
            }} />)}

            {open && (<Docs value={open} setOpen={setOpen} handleOk={() => {
                fetch()
                setOpen(false)
            }} />)}

            {openLabels && (<Labels value={openLabels} setOpen={setOpenLabels} handleOk={() => {
                fetch()
                setOpenLabels(false)
            }} />)}
        </>
    );
}