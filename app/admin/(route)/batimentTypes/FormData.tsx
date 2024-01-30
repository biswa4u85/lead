import { InputBox, FileBox, SelectBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "@/contexts/useFetch";
import { MdOutlineHomeRepairService } from "react-icons/md";

const initialData = {
    icon: "",
    name: "",
    batimentCategoryId: "",
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        // icon: Yup.string().required("Image is required"),
        name: Yup.string().required("Name is required"),
        batimentCategoryId: Yup.string().required("Category is required"),
    });

    const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({}) });
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
                            name="batimentCategoryId"
                            label="Category"
                            placeholder="Select Category"
                        />
                    </div>
                    <div className="mb-4">
                        <FileBox
                            required={true}
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