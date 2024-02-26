"use client";
import React, { useLayoutEffect, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePost } from "@/contexts/usePost";
import { InputBox, Buttons } from "@/components/RenderFroms";
import { Formik } from "formik";
import logo from "../../../images/logo.png"
import * as Yup from "yup";
import { MdOutlineMail } from "react-icons/md";
import { toast } from 'react-toastify';
import language from "@/contexts/language";

const Page: React.FC = () => {
  const router = useRouter();
  const { create, data, loading } = usePost();

  useEffect(() => {
    if (data) {
      toast.success((data as any).data.message)
      router.push(`/auth/reset-password?email=${(data as any).data.email}`);
    }
  }, [data])

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
  });

  const onPressHandle = async (values: any) => {
    create('auth/password/forget', values)
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => onPressHandle(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <div className="bg-white">
          <div className="flex items-center justify-center h-screen">
            <div className="w-1/1 xl:w-1/4 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="w-full p-4">
                <Link className="mb-5.5 flex justify-center items-center" href="/">
                  <Image
                    className="hidden dark:block"
                    src={logo}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                  <Image
                    className="dark:hidden"
                    src={logo}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                </Link>
                <div className="mb-4">
                  <InputBox
                    error={errors.email}
                    label={language.email_label}
                    placeholder={language.email_placeholder}
                    icon={<MdOutlineMail />}
                    name="email"
                  />
                </div>
                <div className="mb-4">
                  <Buttons value={"Reset Now"} loading={loading} onClick={handleSubmit} />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    <Link href="/auth" className="text-primary">
                      {language.back}                    </Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Page;
