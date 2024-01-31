import { InputBox, TextareaBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "@/contexts/useFetch";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { TbMapNorth } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";

const initialData = {
    batimentCategoryId: "",
    batimentTypeId: "",
    title: "",
    description: "",
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    postalCode: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        batimentCategoryId: Yup.string().required("Category is required"),
        batimentTypeId: Yup.string().required("Type is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        postalCode: Yup.string().required("Postal Code is required"),
    });


    const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({}) });
    const categoryOptions = categorys?.data ? categorys.data.map((item: any) => {
        return { label: `${item?.name}`, value: item?.id }
    }) : []
    const { data: typess } = useFetch({ url: "batimentTypes", query: JSON.stringify({}) });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues?.address, ...initialValues } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, address: { ...values } })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                        <SelectBox
                            required={true}
                            options={categoryOptions}
                            name="batimentCategoryId"
                            label="Category"
                            placeholder="Enter Category"
                            icon={<TbMapNorth />}
                        />
                    </div>
                    <div className="mb-4">
                        <SelectBox
                            required={true}
                            options={typess?.data ? typess.data.map((item: any) => {
                                if (item.batimentCategoryId == values.batimentCategoryId) {
                                    return { label: `${item?.name}`, value: item?.id }
                                }
                            }) : []}
                            name="batimentTypeId"
                            label="Type"
                            placeholder="Enter Type"
                            icon={<TbMapNorth />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="title"
                            label="Title"
                            placeholder="Enter Title"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <TextareaBox
                            required={true}
                            name="description"
                            label="Description"
                            placeholder="Enter Description"
                        />
                    </div>
                    <h1 className="mt-10 mb-5 text-sm">Address</h1>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="firstName"
                            label="First Name"
                            placeholder="Enter your First Name"
                            icon={<FaUser />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter your Last Name"
                            icon={<FaUser />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="city"
                            label="City"
                            placeholder="Enter City"
                            icon={<FaLocationDot />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="email"
                            label="Email"
                            placeholder="Enter your Email"
                            icon={<MdEmail />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="phone"
                            label="Phone"
                            placeholder="Enter your Phone"
                            icon={<FaPhoneAlt />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="postalCode"
                            type="number"
                            label="Postal Code"
                            placeholder="Enter Postal Code"
                            icon={<TbMapNorth />}
                        />
                    </div>
                    <div className="fixed bottom-3 right-5 z-999">
                        <Buttons value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}