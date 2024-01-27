"use client"
import { useState } from "react";
import Image from "next/image";
import abtar from "../../../images/abtar.png"
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";

export default function Page() {
    const router = useRouter();
    const { data } = useFetch({ url: "projects", query: JSON.stringify({}) });
    
    return (
        <>
            <div className="container px-10 mx-auto ">
                <div className="flex items-center justify-between my-8">
                    <p className="text-lg font-bold text-black">Profile Picture</p>
                    <button type="submit" className="px-6 py-2 text-indigo-800 border border-indigo-800 rounded text-title-xsm">
                        Add
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 font-semibold text-gray-600 text-title-xsm">Include a photo of your face, an image in a professional situation, or your logo to build trust, both with individuals and for the image of your brand.</p>

                <div className="flex items-center justify-center my-8">
                    <Image
                        alt=""
                        width="670"
                        height="150"
                        src={abtar}
                    />
                </div>
                <p className="text-lg font-bold text-black">Profile Picture</p>
                <div className="my-4 border-t-2 border-gray-500"></div>


                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-normal w-90">
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">Phone</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="0780907492" />
                        </div>
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">Mobile</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="+1234-5678912" />
                        </div>
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">Address:</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="Scotland" />
                        </div>
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">City</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="75007 PARIS 7TH DISTRICT" />
                        </div>
                    </div>

                    <div className="flex flex-col items-normal w-90">
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Date of creation:</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="12 may 2023" />
                        </div>
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">SIRET N°:</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="243 233 543 02322" />
                        </div>
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Email:</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="youremail@gmail.com" />
                        </div>
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Website:</label>
                            <input type="text" className="w-2/3 p-2 ml-4 font-thin text-black texl-title-sm" placeholder="www.xyz.com" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10 mb-20">
                    <button onClick={() => router.push(`/editProfile`)} type="submit" className="px-6 py-2 mx-2 font-thin text-indigo-800 border border-indigo-800 rounded text-title-xsm">
                        Change my password
                    </button>
                    <button onClick={() => router.push(`/editProfile`)} type="submit" className="px-6 py-2 mx-2 font-thin text-white bg-indigo-800 border rounded text-title-xsm">
                        Change my contact details
                    </button>
                </div>

            </div>
        </>
    );
}