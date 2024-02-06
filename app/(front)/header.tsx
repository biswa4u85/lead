"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../images/logo.svg"
import { useRouter } from "next/navigation";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const pathname = usePathname();
  const router: any = useRouter();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldAddFixedClass = scrollTop > 80;
      setIsScrolled(shouldAddFixedClass);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="relative z-999">
        <div className='float-left p-5 lg:hidden md:hidden' onClick={toggleMobileMenu}><CgMenuLeft size={30} /></div>
        <div className={`absolute w-full top-0 bg-black opacity-80 lg:hidden p-4 text-white ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className="absolute top-2 right-2" onClick={toggleMobileMenu}><AiOutlineClose size={30} /></div>
          <nav className="flex flex-col" >
            <Link href={"/"} className="mx-2 my-1 text-white hover:text-blue-700">Home</Link>
            <Link href={"/batiment"} className={"mx-2 my-1  hover:text-blue-700 " + (pathname.includes("batiment") ? "text-primary" : "text-white")}>Projet Batiment</Link>
            <Link href={"/depannage"} className={"mx-2 my-1  hover:text-blue-700 " + (pathname.includes("depannage") ? "text-primary" : "text-white")}>Projet Dépannage</Link>
            <Link href={"/espace-pro"} className={"mx-2 my-1  hover:text-blue-700 " + (pathname.includes("espace-pro") ? "text-primary" : "text-white")}>Espace pro</Link>
            {data?.user?.name ? <button onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/auth");
              });
            }} className="inline-block p-2 font-bold text-indigo-600 border border-indigo-600 rounded-md">
              Log Out
            </button> : <Link href={"/auth"} className="inline-block p-2 font-bold text-indigo-600 border border-indigo-600 rounded-md">Login</Link>}
          </nav>
        </div>
      </div>
      <header className={`hidden py-6 bg-custom-blue md:block ${isScrolled ? 'shadow-lg fixed top-0 left-0 right-0 z-1 bg-white' : ''}`}>
        <div className="container flex justify-between px-10 mx-auto">
          <Link href={"/"}><Image
            alt=""
            src={logo}
          /></Link>
          <div className='flex'>
            <nav className="flex items-center justify-between" >
              <Link href={"/"} className={"mx-5 text-indigo-900 hover:text-blue-700 "}>Home</Link>
              <Link href={"/batiment"} className={"mx-1 mr-5 text-indigo-900 hover:text-blue-700 " + (pathname.includes("batiment") && ("text-primary"))}>Projet Batiment</Link>
              <Link href={"/depannage"} className={"mx-1 text-indigo-900 hover:text-blue-700 " + (pathname.includes("depannage") && ("text-primary"))}>Projet Dépannage</Link>
              <Link href={"/espace-pro"} className={"mx-5 text-indigo-900 hover:text-blue-700 " + (pathname.includes("espace-pro") && ("text-primary"))}>Espace pro</Link>
            </nav>
            {data?.user?.name ? <div className="relative">
              <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 px-2 text-indigo-600 border border-indigo-600 rounded-md"
                href="#"
              >
                <span className="w-10 h-10 rounded-full">
                  <Image
                    width={100}
                    height={100}
                    src={data?.user?.image ? data?.user?.image : "/images/user.png"}
                    alt="User"
                    className="mt-2 rounded-full"
                  />
                </span>
                <span className="text-indigo-900 hover:text-blue-700">
                  {data?.user?.name}
                </span>
                <svg
                  className="hidden fill-current sm:block"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                    fill=""
                  />
                </svg>
              </Link>
              <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
                  }`}
              >
                <button onClick={() => {
                  signOut({ redirect: false }).then(() => {
                    router.push("/auth");
                  });
                }} className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  Log Out
                </button>
              </div>
            </div> :
              <Link href={"/auth"} className="p-2 font-bold text-indigo-600 border border-indigo-600 rounded-md">Login</Link>}
          </div>
        </div>
      </header>
    </>
  );
}