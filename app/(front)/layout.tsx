import type { Metadata } from 'next'
import Link from "next/link";
import { AiOutlineInstagram, AiOutlineTwitter, AiFillYoutube, AiOutlineDribbble } from "react-icons/ai";
import Image from "next/image";
import logowhite from "../images/logo_white.svg"
import Header from "./header"
import language from "@/contexts/language";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is Home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div style={{ minHeight: "73vh" }}>{children}</div>
      {/* <footer className="bg-indigo-800 ">
        <div className="container flex flex-col items-center py-4 mx-auto md:flex-row md:justify-between md:items-center md:px-20 md:py-0">
          <div className='text-xs font-normal text-white'>{language.copy_write}</div>
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
      </footer> */}

      <footer className="bg-indigo-800 py-10 ">
        <div className="container mx-auto">
        <Link href={"/"}><Image className='hidden md:block'
            width={256}
            height={80}
            alt=""
            src={logowhite}
          /></Link>
          <div className=' flex justify-between px-10 pt-10'>
            <div>
              <p className='text-sm font-semibold text-white pb-5'>Dépannagetravaux.fr</p>
              <p className='text-xs font-normal text-white pb-3'>Qui sommes-nous ?</p>
              <p className='text-xs font-normal text-white pb-3'>Contact</p>
              <p className='text-xs font-normal text-white pb-3'>Nos avis  clients</p>
            </div>
            <div>
              <p className='text-sm font-semibold text-white pb-5'>Nos services</p>
              <p className='text-xs font-normal text-white pb-3'>Dépannage d’urgence</p>
              <p className='text-xs font-normal text-white pb-3'>Projet travaux</p>
            </div>
            <div>
              <p className='text-sm font-semibold text-white pb-5'>Nos services</p>
              <p className='text-xs font-normal text-white pb-3'>Mentions légales</p>
              <p className='text-xs font-normal text-white pb-3'>CGUs</p>
              <p className='text-xs font-normal text-white pb-3'>Politique d’utilisation de cookies</p>
              <p className='text-xs font-normal text-white pb-3'>FAQ Pro <span className='ml-2'>FAQ Particulier</span></p>
            </div>
          </div>
          <div className='flex justify-center items-center space-x-30'>
          <div className='text-sm font-normal text-white'>{language.copy_write}</div>

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
        </div>

      </footer>
    </>
  )
}