import { InputBox, PasswordBox, Buttons, FileBox } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaUser, FaPhoneAlt, FaCreativeCommonsSa } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbMapNorth } from "react-icons/tb";
import { RiCoupon2Fill, RiLockPasswordFill } from "react-icons/ri";

const initialData = {
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    company: "",
    newPassword: "",
    sponsorCode: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Profile is required"),
        firstName: Yup.string().required("Champ requis"),
        lastName: Yup.string().required("Champ requis"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Champ requis"),
        phone: Yup.string().required("Champ requis"),
        postalCode: Yup.string().required("Champ requis"),
        company: Yup.string().required("Company name required"),
    });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues, newPassword: "" } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, role: "user" })}
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
                        <InputBox
                            required={true}
                            name="postalCode"
                            label="Postal Code"
                            placeholder="Enter Postal Code"
                            icon={<TbMapNorth />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="company"
                            label="Company"
                            placeholder="Enter Company Name"
                            icon={<FaCreativeCommonsSa />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            name="sponsorCode"
                            label="Sponsor Code"
                            placeholder="Enter Sponsor Code"
                            icon={<RiCoupon2Fill />}
                        />
                    </div>
                    <div className="mb-4">
                        <PasswordBox
                            name="newPassword"
                            label="Password"
                            placeholder="Enter Password"
                            icon={<RiLockPasswordFill />}
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