"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { AiOutlineDown } from "react-icons/ai";
import Image from "next/image";
import logo from "../images/logo.svg"
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="relative">
        <div className='float-left p-5 lg:hidden' onClick={toggleMobileMenu}><CgMenuLeft size={30} /></div>
        <div className={`absolute w-full top-0 bg-black opacity-80 lg:hidden p-4 text-white ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className="absolute right-15 top-2" onClick={toggleMobileMenu}><AiOutlineClose size={30} /></div>
          <nav className="flex flex-col" >
            <Link href={"/"} className="mx-2 my-1 text-white hover:text-blue-700">Home</Link>
            <Link href={"/batiment"} className="mx-2 my-1 text-white hover:text-blue-700">Projet Batiment</Link>
            <Link href={"/depannage"} className="mx-2 my-1 text-white hover:text-blue-700">Projet Dépannage</Link>
            <Link href={"/espace-pro"} className="mx-2 my-1 text-white hover:text-blue-700">Espace pro</Link>
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
              <Link href={"/"} className="mx-5 text-indigo-900 hover:text-blue-700">Home</Link>
              <Link href={"/batiment"} className="mx-1 text-indigo-900 hover:text-blue-700">Projet Batiment</Link>
              <Link href={"/depannage"} className="mx-1 text-indigo-900 hover:text-blue-700">Projet Dépannage</Link>
              <Link href={"/espace-pro"} className="mx-5 text-indigo-900 hover:text-blue-700">Espace pro</Link>
            </nav>
            <button className="px-4 font-bold text-indigo-600 border border-indigo-600 rounded-md">Login</button>
          </div>
        </div>
      </header>
    </>
  );
}