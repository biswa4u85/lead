import { InputBox, FileBox, PasswordBox, Buttons } from "@/components/RenderFroms";
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
    newPassword: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Profile required"),
        firstName: Yup.string().required("Champ requis"),
        lastName: Yup.string().required("Champ requis"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Champ requis"),
        phone: Yup.string().required("Champ requis")
    });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues, newPassword: "" } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, role: "admin" })}
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
                            readOnly={initialValues?.edit}
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
                        <PasswordBox
                            label="Password"
                            placeholder="Enter your Password"
                            name="newPassword"
                        />
                    </div>
                    <div className="mb-4">
                        <Buttons value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}