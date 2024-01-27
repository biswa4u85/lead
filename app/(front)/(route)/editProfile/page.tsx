"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function Page() {
    const router = useRouter();
    const { data } = useFetch({ url: "projects", query: JSON.stringify({}) });
    return (
        <>
            <div className="container mx-auto md:px-10">
                <p className="my-5 text-lg font-bold text-black">Information About My Company</p>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 font-semibold text-gray-600 text-title-xsm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="mt-5 text-lg font-bold text-black">My Contact Information</p>
                <div className="my-4 border-t-2 border-gray-500"></div>



                {/* start form section */}

                <div className='grid grid-cols-1 mb-8 font-inter gap-7 md:grid-cols-4'>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Company name</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="DOBAD" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Civility</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Choose- Name" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Email</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Name" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">lace</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Nom" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Number of SIRET</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="DUBOIS" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Phone</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="+33 Phone" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Year of creation</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="First name" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">First name</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="First name" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Portable</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="+33 0780907492" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Address</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Address" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Function</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Choose" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Site internet</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Site internet" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Ville</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="PARIS 7TH DISTRICT" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Job</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Tiler" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Email:</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Company Name" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">Change my password</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Company Name" />
                    </div>

                </div>





                {/* <div className="flex flex-wrap gap-4">
                    <div className="p-4 bg-gray-200 w-70">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-xs font-medium text-black ">First Name</label>
                            <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-200 w-70">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-xs font-medium text-black ">First Name</label>
                            <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-200 w-70">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-xs font-medium text-black ">First Name</label>
                            <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-200 w-70">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-xs font-medium text-black ">First Name</label>
                            <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-200 w-60"><div className="flex flex-col">
                        <label htmlFor="price" className="text-xs font-medium text-black ">First Name</label>
                        <input type="text" className="px-3 py-2 m-0 text-xs placeholder-gray-500 border border-gray-500 rounded-xs backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                    </div></div>
                    <div className="p-4 bg-gray-200 w-60">Column 6</div>
                </div> */}
                {/* End form section */}

                <p className="mt-5 text-lg font-bold text-black">Your Profile Photo</p>
                <div className="my-4 border-t-2 border-gray-500"></div>

                <div className="flex items-center justify-between w-full p-2 border border-gray-600 border-dashed md:w-100">
                    <p className="text-xs">Upload your profile picture</p>
                    <p className="text-indigo-800 text-xs1">No file chosen</p>
                </div>
                <p className="py-5 text-indigo-800 text-xs1">Only images in jpg, jpeg and png format are accepted with a minimum size of 112 pixels by 112 pixels.</p>
                <div className="flex justify-end mt-5 mb-20 md:mb-40">
                    <button className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md">
                        Save
                    </button>
                </div>
            </div >






            {/* start last page */}
            <div className="container mx-auto md:px-10">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-black md:text-lg">DESCRIPTION OF MY BUSINESS</p>
                    <button className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                        Edit Details
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 font-semibold text-gray-600 text-title-xsm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="flex justify-between mt-5 items-cente">
                    <p className="text-sm font-bold text-black md:text-lg">MY OFFICIAL DOCUMENTS</p>
                    <button className="p-2 font-medium text-indigo-800 border border-indigo-800 rounded-md text-xs1 md:text-sm ">
                        Edit Details
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 text-gray-600">You must have certain insurance and documents to certify the legality of your business and its skills. Individuals are sensitive to it.</p>

                <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB]">
                    <div className="text-xs font-semibold">KBIS</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold"> Missing document</p>
                        <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                    </div>
                </div>
                <div className="flex my-3 justify-between p-2 shadow-[0px_0px_10px_1px_#F2F6FB]">
                    <div className="text-xs font-semibold">Assurance</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold"> Missing document</p>
                        <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                    </div>
                </div>
                <div className="flex justify-between my-3 p-2 shadow-[0px_0px_10px_1px_#F2F6FB]">
                    <div className="text-xs font-semibold">Ten-year guarantee</div>
                    <div className="flex items-center">
                        <p className="text-xs font-semibold"> Missing document</p>
                        <AiOutlinePlusCircle size="20" className="ml-10 text-indigo-800" />
                    </div>
                </div>
                <p className="mt-5 text-sm font-bold text-black md:text-lg">MY QUALITY LABELS</p>
                <div className="my-4 border-t-2 border-gray-500"></div>

                <div className="flex justify-end mt-5 mb-20 md:mb-40">
                    <button className="px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-800 border border-indigo-800 rounded-md">
                        Add
                    </button>
                </div>
            </div >
            {/* End last page */}


        </>
    );
}