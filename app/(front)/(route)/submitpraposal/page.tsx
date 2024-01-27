import Image from "next/image";
import map from "../../../images/map.png"
import lightimg from "../../../images/lightimg.png"

import { AiOutlineDoubleRight, AiFillHome, AiOutlineRise, AiOutlineCloudUpload } from "react-icons/ai";


// "use client"
const page = async () => {


    return (
        <>

            <div className=" container mx-auto md:mb-10 mb-10 p-10">
                <div className="flex items-center pb-8">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="text-indigo-900 mx-3" />
                    <p className="font-roboto font-normal text-2xs text-indigo-900">Project Detail</p>
                    <AiOutlineDoubleRight size="12" className="text-indigo-900 mx-3" />
                    <p className="font-roboto font-normal text-2xs text-indigo-900">Submit proposal </p>

                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div className="md:col-span-2 sm:col-span-1 text-black shadow-[0px_0px_10px_4px_#F2F6FB] p-8">
                        <h3 className="text-2xs font-medium font-inter text-graylight-900 pb-6">Description</h3>

                        <div className="grid md:grid-cols-2 gap-9">
                            <div className="col-span-1 border border-gray-300 rounded p-3">
                                <p className="text-xs text-deep-black font-inter font-medium">Client Details</p>
                                <div className="my-3 font-inter font-normal text-xs1 text-gray-800">
                                    <p>Ather Raza</p>
                                    <p>240 FF, Dha Phase 4, Lahore, 54792</p>
                                    <p>Pakistan</p>
                                </div>

                                <div className="font-inter font-normal text-xs1 text-gray-800">
                                    <p>ather.raza28@gmail.com</p>
                                    <p>03215399275</p>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="col-span-1 border border-gray-300 rounded p-3">
                                    <p className="text-xs text-deep-black font-inter font-medium">Professional</p>
                                    <div className="my-3 font-inter font-normal text-xs1 text-gray-800">
                                        <p>Ather Raza</p>
                                        <p>240 FF, Dha Phase 4, Lahore, 54792</p>
                                        <p>Pakistan</p>
                                    </div>

                                    <div className="font-inter font-normal text-xs1 text-gray-800">
                                        <p>ather.raza28@gmail.com</p>
                                        <p>03215399275</p>
                                        <p className=" text-right text-sm2 pr-10">Mr John</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs2 text-graylight-900 font-normal pt-4">Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</p>

                        <div className="flex flex-col py-4">
                            <div className="grid grid-cols-3 mb-4">
                                <div>
                                    <p className="font-inter font-normal text-gray-700 text-xs">Contract Start</p>
                                    <p className="font-semibold text-sm text-deep-black">12 Jan 2024</p>
                                </div>
                                <div>
                                    <p className="font-inter font-normal text-gray-700 text-xs">Contract End</p>
                                    <p className="font-semibold text-sm text-deep-black">12 Jan 2024</p>
                                </div>
                            </div>
                        </div>

                        <table className="border w-full">
                            <thead>
                                <tr className="text-left bg-indigo-800 text-white text-xs1 font-inter font-normal">
                                    <th className="p-2">Items</th>
                                    <th className="p-2">QTY/HRS</th>
                                    <th className="p-2">Rate</th>
                                    <th className="p-2">Tax</th>
                                    <th className="p-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">Home repair</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">23</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">$356</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">12%</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">$3564</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">Home repair</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">23</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">$356</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">12%</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">$3564</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">Home repair</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">23</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">$356</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">12%</td>
                                    <td className="border border-gray-200 p-2 text-graylight-900 font-inter font-normal text-xs">$3564</td>
                                </tr>


                            </tbody>
                        </table>

                        <div className="grid md:grid-cols-3">
                            <div></div>
                            <div></div>
                            <div className="mt-8 mb-15 border border-gray-200 rounded-sm">
                                <p className="text-white text-xs1 font-inter font-bold bg-indigo-800 py-2 rounded-t-sm text-center">Invoice Summary</p>
                                <div className="px-2">
                                    <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                        <p className="font-inter text-xs1 font-normal text-graylight-800">Subtotal</p>
                                        <p className="font-inter text-xs1 font-light text-black-100">USD <span className=" font-medium">100.00</span></p>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                        <p className="font-inter text-xs1 font-normal text-graylight-800">Tax</p>
                                        <p className="font-inter text-xs1 font-light text-black-100">--</p>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <p className="font-inter text-xs1 font-normal text-graylight-800">Total</p>
                                        <p className="font-inter text-xs1 font-light text-black-100">USD <span className=" font-medium">350.00</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-1">
                        <p className=" font-inter font-medium text-2xs text-graylight-800">Generate signature</p>
                        <div className='px-3 py-2 rounded-lg border-gray-200 md:text-sm text-xs1 shadow-[0px_5px_10px_1px_#F2F6FB] my-5'>
                            <div className="flex items-center justify-center">
                                <AiOutlineRise size="25" className="text-green" />
                                <a href="#" className="ml-4 font-poppins font-normal hover:text-blue-800 text-2xs text-gray-700">Create signature</a>
                            </div>
                        </div>
                        <p className=" font-inter font-medium text-2xs text-graylight-800 mb-3">Upload signature</p>

                        <div className="flex items-center justify-center border-2 border-dashed border-indigo-800 py-2">
                            <AiOutlineCloudUpload size="25" className="text-indigo-800" />
                            <a href="#" className="ml-4 font-poppins font-normal text-2xs text-indigo-800">Upload signature</a>
                        </div>

                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] mt-7 p-3">
                            <p className=" font-inter font-medium text-sm text-graylight-800">Profeional details details</p>
                            <div className="flex justify-between items-center py-3">
                                <p className="text-sm font-normal text-gray-700">Name</p>
                                <p className="text-sm1 font-semibold text-deep-black">Johen Markes</p>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <p className="text-sm font-normal text-gray-700">City</p>
                                <p className="text-sm1 font-semibold text-deep-black">Cambridge</p>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <p className="text-sm font-normal text-gray-700">Postal code</p>
                                <p className="text-sm1 font-semibold text-deep-black">CB1 0GA</p>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <p className="text-sm font-normal text-gray-700">Phone</p>
                                <p className="text-sm1 font-semibold text-deep-black">+1 232  232123</p>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <p className="text-sm font-normal text-gray-700">Postal code</p>
                                <p className="text-sm1 font-semibold text-deep-black">xya@gmail.com</p>
                            </div>
                            <div className="flex justify-between items-start py-3">
                                <p className="text-sm font-normal text-gray-700 w-1/2">Address</p>
                                <p className="text-sm1 font-semibold text-deep-black">ALTRINCHAM. WA14 2PU. PEEL HOUSE, 30 THE DOWNS.</p>
                            </div>
                        </div>
                        <button type="submit" className="bg-indigo-800 text-white p-2 rounded-md w-full my-5 font-poppins font-normal text-sm">
                            Pay
                        </button>
                        <button type="submit" className="border-indigo-800 border  text-indigo-800 p-2 rounded-md w-full font-poppins font-normal text-sm">
                            Downloaded
                        </button>




                    </div>
                </div>
            </div >





        </>
    );
}

export default page