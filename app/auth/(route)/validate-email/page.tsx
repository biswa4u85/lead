"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePost } from "@/contexts/usePost";
import logo from "../../../images/logo.png"
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify';
import language from "@/contexts/language";

const Page: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams()
  const email = params.get('email')
  const token = params.get('token')
  const { create, data, loading } = usePost();

  useEffect(() => {
    if (email && token) {
      create('auth/password/validate-email', { email, token })
    }
  }, [email])

  return (
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
            <h3>{(data as any)?.data?.message ?? 'Wait...'}</h3>
            <div className="mt-6 text-center">
              <p>
                <Link href="/auth" className="text-primary">
                  {language.back}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
