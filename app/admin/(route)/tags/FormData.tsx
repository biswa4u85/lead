import { InputBox,  Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineHomeRepairService } from "react-icons/md";

const initialData = {
    name: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
    });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="name"
                            label="Name"
                            placeholder="Enter Name"
                            icon={<MdOutlineHomeRepairService />}
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