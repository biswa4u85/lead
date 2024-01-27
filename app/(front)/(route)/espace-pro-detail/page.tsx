import Link from "next/link";
import Image from "next/image";
import constuction3 from "../../../images/constuction3.png"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professionnel",
    description: "Create Professionnel",
};

export default function Page() {
    return (
        <div className="container flex flex-col mx-auto my-10 md:my-30 md:flex-row md:justify-between md:items-center">
            <div className="flex-none md:w-1/2">
                <p className="text-sm font-medium md:text-title-sm text-gray">STEP1</p>
                <p className="py-5 font-semibold leading-tight text-black whitespace-pre-wrap text-title-xl2 md:text-xl">Discover new construction site opportunities
                </p>
                <p className="text-black text-title-sm">If you are a construction professional looking for new projects, simply enter your postal code to access projects offered by individuals in your region.</p>
                <button className="py-4 my-6 text-xs font-semibold text-white bg-indigo-800 rounded-md w-30 hover:bg-blue-700">
                    <Link href={"/signup-espace"}>Fill out Form</Link>
                </button>
            </div>
            <div className="pt-5 md:pt-6">
                <Image
                    alt=""
                    width="585"
                    height="439"
                    src={constuction3}
                />
            </div>
        </div>
    );
}