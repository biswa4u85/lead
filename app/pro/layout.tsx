"use client";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineInstagram, AiOutlineTwitter, AiFillYoutube, AiOutlineDribbble } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logowhite from "../images/logo_white.svg"
import { useSession } from 'next-auth/react'
import Header from "./header"
import Loader from "@/components/common/Loader";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useSession()

  useLayoutEffect(() => {
    if (data && data?.user) {
      if ((data?.user as any)?.role == "admin") {
        router.push("/admin");
      }else if ((data?.user as any)?.role == "approval") {
        router.push("/approval");
      } else {
        setLoading(false)
      }
    }
  }, [data])

  return (
    <>
      <Header />
      {loading ? <Loader /> : <div style={{ minHeight: "73vh" }}>{children}</div>}
      <footer className="bg-indigo-800 ">
        <div className="container flex flex-col items-center py-4 mx-auto md:flex-row md:justify-between md:items-center md:px-20 md:py-0">
          <div className='text-xs font-normal text-white'>© 2024 PRO POS. All rights reserved</div>
          <Link href={"/"}><Image className='hidden md:block'
            width={256}
            height={80}
            alt=""
            src={logowhite}
          /></Link>
          <div className='flex items-center pt-4 md:justify-between md:pt-0'>
            <div className='flex items-center justify-center mr-3 text-white rounded-full cursor-pointer w-7 h-7 bg-light-white'>
              <Link href={"https://www.instagram.com"}><AiOutlineInstagram size="18" className="mx-1 text-white" /></Link>
            </div>
            <div className='flex items-center justify-center mr-3 text-white rounded-full cursor-pointer w-7 h-7 bg-light-white'>
              <Link href={"https://www.dribbble.com"}><AiOutlineDribbble size="18" className="mx-1 text-white" /></Link>
            </div>
            <div className='flex items-center justify-center mr-3 text-white rounded-full cursor-pointer w-7 h-7 bg-light-white'>
              <Link href={"https://www.twitter.com"}><AiOutlineTwitter size="18" className="mx-1 text-white" /></Link>
            </div>
            <div className='flex items-center justify-center text-white rounded-full cursor-pointer w-7 h-7 bg-light-white'>
              <Link href={"https://www.youtube.com"}><AiFillYoutube size="18" className="mx-1 text-white" /></Link>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}