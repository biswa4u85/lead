import { InputBox, FileBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const initialData = {
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Profile required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
    });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues, firstName: initialValues?.name ?? "", lastName: initialValues?.name ?? "", } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, role: "admin", name:`${values?.firstName} ${values?.lastName}` })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                        <FileBox
                            required={true}
                            name="image"
                            label="Profile"
                            placeholder="Upload Profile"
                        />
                    </div>
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
                        <Buttons value={initialValues?.edit ? "Update" : "Add new"} isLoading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}