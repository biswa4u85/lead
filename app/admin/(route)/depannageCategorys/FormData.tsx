import { InputBox, SelectBox, FileBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaProjectDiagram } from "react-icons/fa";
import { useFetch } from "@/contexts/useFetch";

const initialData = {
    icon: "",
    name: "",
    description: "",
    parentId: "",
    price: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
    });

    const { data: categorys } = useFetch({ url: "depannageCategorys", query: JSON.stringify({ showAll: true }) });
    const categoryOptions = categorys?.data ? categorys.data.map((item: any) => {
        return { label: item?.name, value: item?.id }
    }) : []

    return (
        <Formik
            initialValues={initialValues?.edit ? { ...initialValues } : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                        <SelectBox
                            options={categoryOptions}
                            name="parentId"
                            label="Category"
                            placeholder="Select Category"
                        />
                    </div>
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
                        <InputBox
                            // required={true}
                            name="price"
                            label="Price"
                            type="number"
                            placeholder="Enter Price"
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