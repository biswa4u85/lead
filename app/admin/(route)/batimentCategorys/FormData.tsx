import { InputBox, FileBox, Buttons, TogelBox } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaProjectDiagram } from "react-icons/fa";

const initialData = {
    icon: "",
    name: "",
    description: "",
    isParent: false,
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        // icon: Yup.string().required("Image is required"),
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
    });

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, parentId: initialValues?.parentId })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                        <FileBox
                            name="icon"
                            label="Image"
                            placeholder="Upload Image"
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="name"
                            label="Name"
                            placeholder="Enter Name"
                            icon={<FaProjectDiagram />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="description"
                            label="Description"
                            placeholder="Enter Description"
                            icon={<FaProjectDiagram />}
                        />
                    </div>
                    <div className="mb-4">
                        <TogelBox
                            name="isParent"
                            label="Is Parent"
                            placeholder="Is Parent"
                            icon={<FaProjectDiagram />}
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