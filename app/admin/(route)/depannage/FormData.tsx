import { InputBox, TextareaBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "@/contexts/useFetch";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { TbMapNorth } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";

const initialData = {
    zipcodeId: "",
    problemId: "",
    problemtypeId: "",
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
        zipcodeId: Yup.string().required("Project is required"),
        problemId: Yup.string().required("Problem is required"),
        problemtypeId: Yup.string().required("Problem Type is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
    });

    const { data: zipcodes } = useFetch({ url: "zipcode", query: JSON.stringify({}) });
    const zipcodeOptions = zipcodes?.data ? zipcodes.data.map((item: any) => {
        return { label: item?.name, value: item?.id }
    }) : []

    const { data: problems } = useFetch({ url: "problems", query: JSON.stringify({}) });
    const problemOptions = problems?.data ? problems.data.map((item: any) => {
        return { label: item?.name, value: item?.id }
    }) : []

    const { data: problemTypes } = useFetch({ url: "problemtype", query: JSON.stringify({}) });
    const problemTypeOptions = problemTypes?.data ? problemTypes.data.map((item: any) => {
        return { label: item?.name, value: item?.id }
    }) : []

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
                            options={zipcodeOptions}
                            name="zipcodeId"
                            label="Zipcode"
                            placeholder="Select Zipcode"
                        />
                    </div>
                    <div className="mb-4">
                        <SelectBox
                            required={true}
                            options={problemOptions}
                            name="problemId"
                            label="Problem"
                            placeholder="Select Problem"
                        />
                    </div>
                    <div className="mb-4">
                        <SelectBox
                            required={true}
                            options={problemTypeOptions}
                            name="problemtypeId"
                            label="Problem Type"
                            placeholder="Select Problem Type"
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
                    <div className="fixed bottom-3 right-5 z-999">
                        <Buttons value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}