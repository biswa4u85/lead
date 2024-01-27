import Image from "next/image";
import paypal from "../../../images/paypal.png"
import card from "../../../images/card.png"
import stripe from "../../../images/stripe.png"
import success from "../../../images/success.png"

import { AiOutlineDoubleRight, AiFillHome, AiOutlineDown, AiOutlineCloudUpload } from "react-icons/ai";


// "use client"
const page = async () => {


    return (
        <>

            <div className=" container mx-auto md:mb-10 mb-10 p-10">
                <div className="flex items-center pb-2">
                    <AiFillHome size="20" className="text-indigo-900" />
                    <AiOutlineDoubleRight size="12" className="text-indigo-900 mx-3" />
                    <p className="font-roboto font-normal text-2xs text-indigo-900">Project Detail</p>
                    <AiOutlineDoubleRight size="12" className="text-indigo-900 mx-3" />
                    <p className="font-roboto font-normal text-2xs text-indigo-900">Submit proposal </p>

                </div>
                <div className="grid md:grid-cols-3 gap-9">
                    <div className="md:col-span-2 sm:col-span-1 text-black">
                        <p className="text-sm2 font-semibold font-inter text-deep-black pb-2 border-gray-700 border-b">Select Payment Method</p>

                        <div className="grid md:grid-cols-4 gap-4 pt-6">
                            <div className="md:col-span-1 flex flex-col justify-around items-center shadow-[0px_0px_10px_1px_#F2F6FB] rounded-sm py-6 ">
                                <Image
                                    alt=""
                                    width="50"
                                    height="29"
                                    src={card}
                                />
                                <p>Credit/Debit Card</p>
                            </div>
                            <div className="flex flex-col justify-around items-center shadow-[0px_0px_10px_1px_#F2F6FB] rounded-sm py-6">
                                <Image
                                    alt=""
                                    width="41"
                                    height="50"
                                    src={paypal}
                                />
                                <p>Paypal</p>
                            </div>
                            <div className="flex flex-col justify-around items-center shadow-[0px_0px_10px_1px_#F2F6FB] rounded-sm py-6">
                                <Image
                                    alt=""
                                    width="50"
                                    height="20"
                                    src={stripe}
                                />
                                <p>stripe</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-6">
                            <div>
                                <p className="text-sm1 font-inter font-semibold text-indigo-900">Add your cards Details</p>
                                <label className="block mb-4 font-inter font-medium text-xs text-deep-black my-3">
                                    Card Number
                                    <input type="Code" className="border border-gray-700 rounded-md w-full p-2 mt-1 font-inter font-normal text-deep-black" placeholder="Enter 12 digit card number" />
                                </label>
                                <div className="grid md:grid-cols-6 gap-4">
                                    <div className="col-span-2 text-black">
                                        <label className="block mb-4 font-inter font-medium text-xs text-deep-black my-3">
                                            Expiry Date
                                            <div className="flex items-center justify-center border border-gray-700 py-2 rounded-md mt-2">
                                                <a href="#" className="ml-4 font-inter font-normal text-2xs text-gray-700 mr-1">Month</a>
                                                <AiOutlineDown size="18" className="text-deep-black" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="col-span-1 text-black">
                                        <div className="flex items-center justify-center border border-gray-700 py-2 rounded-md mt-2">
                                            <a href="#" className="ml-4 font-inter font-normal text-2xs text-gray-700 mr-1">year</a>
                                            <AiOutlineDown size="18" className="text-deep-black" />
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-black">
                                        <label className="block mb-4 font-inter font-medium text-xs text-deep-black my-3">
                                            Expiry Date
                                            <div className="flex items-center justify-center border border-gray-700 py-2 rounded-md mt-2">
                                                <a href="#" className="ml-4 font-inter font-normal text-2xs text-gray-700 mr-1">Month</a>
                                                <AiOutlineDown size="18" className="text-deep-black" />
                                            </div>
                                        </label>
                                    </div>

                                </div>

                                <div className=" flex flex-row">
                                    <div className="text-black">
                                        <p>Expiry Date</p>
                                        <div className="flex items-center justify-center border border-gray-700 py-2 rounded-md mt-2">
                                            <a href="#" className="ml-4 font-inter font-normal text-2xs text-gray-700 mr-1">Month</a>
                                            <AiOutlineDown size="18" className="text-deep-black" />
                                        </div>
                                    </div>
                                    <div className="flex items-center border border-gray-700 rounded-md">
                                        <p className="ml-4 font-inter font-normal text-2xs text-gray-700 mr-1">Month</p>
                                        <AiOutlineDown size="18" className="text-deep-black" />
                                    </div>
                                    <div className="text-black">
                                        <p>CVV</p>
                                        <div className="flex items-center justify-center border border-gray-700 py-2 rounded-md mt-2">
                                            <a href="#" className="ml-4 font-inter font-normal text-2xs text-gray-700 mr-1">Month</a>
                                            <AiOutlineDown size="18" className="text-deep-black" />
                                        </div>
                                    </div>

                                </div>
                                <label className="block mb-4 font-inter font-medium text-xs text-deep-black my-3">
                                    Card Holder Name
                                    <input type="Code" className="border border-gray-700 rounded-md w-full p-2 mt-1 font-inter font-normal text-deep-black" placeholder="Name on card" />
                                </label>
                                <button type="submit" className="bg-indigo-800 text-white p-2 rounded-md w-full my-5 font-poppins font-normal text-sm">
                                    Pay
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-1">
                        <div className="shadow-[0px_0px_10px_4px_#F2F6FB] p-3">
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


            <div className="bg-white p-8 rounded-md w-1/3 mx-auto shadow-[0px_0px_10px_1px_#F2F6FB]">
                <div className="flex flex-col items-center">
                    <Image
                        alt=""
                        src={success}
                        className=" rounded-full"
                    /></div>
                <p className="text-sm2 font-inter font-semibold text-center text-indigo-900 pt-5">Add your cards Details</p>
                <p className="font-inter font-normal text-deepblack-100 text-center font-xs pb-5 border-b border-gray-700">Transaction Number:980053812090</p>

                <div className="flex justify-between items-center pt-5">
                    <p className="text-sm font-inter font-semibold  text-deepblack-100">Amount Paid :</p>
                    <p className="text-sm1 font-semibold text-deepblack-100">$250</p>
                </div>
                <div className="flex justify-between items-center pb-5">
                    <p className="text-sm font-inter font-semibold  text-deepblack-100">Bank :</p>
                    <p className="text-sm1 font-semibold text-deepblack-100">Visa Bank</p>
                </div>
                <div className="flex items-center justify-center gap-7">
                    <button type="submit" className="bg-indigo-500 text-white py-2 px-5 rounded-md my-5 font-inter font-medium text-sm">
                    Download
                    </button>
                    <button type="submit" className=" border border-indigo-500 py-2 px-5 text-graylight-900 p-2 rounded-md my-5 font-inter font-medium text-sm">
                    Cancel
                    </button>
                </div>
            </div>



        </>
    );
}

export default page