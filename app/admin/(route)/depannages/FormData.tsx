import { InputBox, TextareaBox, SelectBox,MultiSelectBox,  Buttons } from "@/components/RenderFroms";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useFetch } from "@/contexts/useFetch";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { TbMapNorth } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import language from "@/contexts/language";

const initialData = {
    depannageCategoryId: "",
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
        depannageCategoryId: Yup.string().required("La catégorie est obligatoire"),
        title: Yup.string().required("Le titre est requis"),
        description: Yup.string().required("Une description est requise"),
        firstName: Yup.string().required("Champ requis"),
        lastName: Yup.string().required("Champ requis"),
        city: Yup.string().required("Champ requise"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Champ requis"),
        phone: Yup.string().required("Champ requis"),
        postalCode: Yup.string().required("Champ requis"),
    });

    const { data: categorys } = useFetch({ url: "depannageCategorys", query: JSON.stringify({showAll: true}) });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues?.address, ...initialValues } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, address: { ...values } })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                    <MultiSelectBox
                            required={true}
                            tree={true}
                            multiple={false}
                            name="depannageCategoryId"
                            label={language.catagorys_label}
                            placeholder={language.catagorys_placeholder}
                            options={categorys?.data ?? []}
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
                            placeholder="Saisissez votre ville"
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
                            placeholder="Saisissez votre numéro"
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