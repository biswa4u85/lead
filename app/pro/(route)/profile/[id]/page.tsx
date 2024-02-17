"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { usePatch } from "@/contexts/usePatch";
import { useStorage } from "@/contexts/useStorage";
import { MultiSelectBox, InputBox, TextareaBox, PasswordBox, FileBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, message, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import Loader from "@/components/common/Loader";
import language from "@/contexts/language";
import Docs from './docs'

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [open, setOpen] = useState<any>(false);
    const [value, setValue] = useState<any>(null)
    const [catagory, setCatagory] = useState<any>(null)
    const [users, setUsers] = useStorage("users", null);

    const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({ showAll: true }) });
    const { data: servicesNew } = useFetch({ url: "depannageCategorys", query: JSON.stringify({ showAll: true }) });
    const { data: zipcodes } = useFetch({ url: "zipcode", query: JSON.stringify({ showAll: true }) });
    const zipcodeOptions = zipcodes?.data ? zipcodes.data.map((item: any) => {
        return { label: `${item?.name}-${item?.code}`, value: item?.id }
    }) : []
    const { data: tags } = useFetch({ url: "tags", query: JSON.stringify({ showAll: true }) });
    const tagOptions = tags?.data ? tags.data.map((item: any) => {
        return { label: `${item?.name}`, value: item?.id }
    }) : []

    const { data } = useFetch({ url: "users", query: JSON.stringify({ id: params.id }) });
    useEffect(() => {
        if (data.data) {
            setValue(data.data[0])
            setCatagory(data.data[0])
        }
    }, [data.data])

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        company: Yup.string().required("Company is required"),
        sponsorCode: Yup.string().required("Sponsor Code is required"),
        image: Yup.string().required("Image is required"),
    });

    const validationSchema1 = Yup.object().shape({
        citys: Yup.array().min(1, 'Citys must have at least one item'),
    });

    const validationSchema2 = Yup.object().shape({
        newPassword: Yup.string().required("Password is required"),
        conPassword: Yup.string().required("Password is required"),
    });

    const validationSchema3 = Yup.object().shape({
        tags: Yup.array().min(1, 'Tags must have at least one item'),
    });

    const validationSchema4 = Yup.object().shape({
        companyDel: Yup.string().required('Company Details required'),
    });

    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (values: any) => {
        edit("users", { ...values, id: params.id })
    }

    useEffect(() => {
        if (respond) {
            setUsers((respond as any)?.data)
            setTimeout(() => {
                toast.success(`User update successfully`);
                router.push(`/pro/profile`)
            }, 1000)
        }
    }, [respond])

    return (
        <>
            {!value ? <Loader /> :
                <Formik
                    initialValues={value}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (<div className="container mt-10 mx-auto md:px-10">
                        <p className="my-5 text-lg font-bold text-black">{language.company_details}</p>
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
                            <div className="flex flex-col">
                                <InputBox
                                    required={true}
                                    name="job"
                                    label={language.job}
                                    placeholder={language.job}
                                />
                            </div>
                        </div>

                        <p className="mt-5 text-lg font-bold text-black mx-5 md:mx-0">{language.profile_photo}</p>
                        <div className="my-4 border-t-2 border-gray-500 mx-5 md:mx-0">
                            <FileBox
                                required={true}
                                name="image"
                                label="Profile"
                                placeholder="Upload Profile"
                            /></div>
                        <p className="py-5 text-indigo-800 text-xs1 mx-5 md:mx-0">{language.format_text}</p>
                        <div className="flex justify-end mt-5 mb-10 md:mb-10">
                            <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                        </div>
                    </div>)}
                </Formik>}

            {!catagory ? <Loader /> :
                <Formik
                    initialValues={catagory}
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
                                <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                            </div>
                        </div>
                    }}
                </Formik>}

            <Formik
                initialValues={{ ...value, newPassword: "", conPassword: "" }}
                validationSchema={validationSchema2}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                    return <div className="container mx-auto md:px-10">
                        <p className="text-lg font-bold text-black md:mx-0">Change my password</p>
                        <div className="my-4 border-t-2 border-gray-500"></div>

                        {/* start form section */}
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

                        <div className="flex justify-end mt-5 mb-20 md:mb-40">
                            <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                        </div>
                    </div>
                }}
            </Formik>

            {!value ? <Loader /> :
                <Formik
                    initialValues={value}
                    validationSchema={validationSchema4}
                    onSubmit={(values) => handleUpdate(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                        return <div className="container mx-auto md:px-10">
                            <p className="text-lg font-bold text-black md:mx-0">{language.description}</p>
                            <div className="my-4 border-t-2 border-gray-500"></div>

                            {/* start form section */}
                            <div className=''>
                                <div className="flex flex-col w-full">
                                    <TextareaBox
                                        required={true}
                                        name="companyDel"
                                        style={{ width: '100%' }}
                                        placeholder={'Company Details'}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-5 mb-10 md:mb-10">
                                <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                            </div>
                        </div>
                    }}
                </Formik>}

            {/* start last page */}
            <div className="container mx-auto md:px-10">

                <div className="flex justify-between mt-5 items-cente mx-5 md:mx-0">
                    <p className="text-sm font-bold text-black md:text-lg">{language.document}</p>
                    <button onClick={() => setOpen({ name: "", file: "" })} className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                        Add New
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 text-gray-600 mx-5 md:mx-0">{language.insurance_text}</p>

                {value && value.docs && value.docs.map((item: any, key: any) => <div key={key} className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB] mx-5 md:mx-0">
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold"><img className="w-20" src={item.file} /></p>
                        <Popconfirm
                            title="Delete doc"
                            description="Are you sure to delete this doc?"
                            onConfirm={() => {
                                value.docs.splice(key, 1);
                                handleUpdate({ docs: value.docs })
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div className="cursor-pointer"><AiOutlineMinusCircle size="20" className="ml-10 text-danger" /></div>
                        </Popconfirm>
                    </div>
                </div>)}

                {!value ? <Loader /> :
                    <Formik
                        initialValues={value}
                        validationSchema={validationSchema3}
                        onSubmit={(values) => handleUpdate(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                            return <div className="container mx-auto mt-10">
                                <p className="text-lg font-bold text-black md:mx-0">{language.quality}</p>
                                <div className="my-4 border-t-2 border-gray-500"></div>

                                {/* start form section */}
                                <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4 mx-5 md:mx-0'>
                                    <div className="flex flex-col">
                                        <MultiSelectBox
                                            required={true}
                                            multiple={true}
                                            treeCheckable={true}
                                            name="tags"
                                            placeholder={'Tags'}
                                            options={tagOptions}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-5 mb-10 md:mb-10">
                                    <Buttons className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md mx-5 md:mx-0" value="Save" loading={loading} onClick={handleSubmit} />
                                </div>
                            </div>
                        }}
                    </Formik>}

            </div>
            {/* End last page */}
            {open && (<Docs value={open} setOpen={setOpen} handleOk={(docs: any) => {
                handleUpdate({ docs: [...value.docs, docs] })
                setOpen(false)
            }} />)}
        </>
    );
}