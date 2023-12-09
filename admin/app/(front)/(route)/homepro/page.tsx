import { getServerSession } from "next-auth/next";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";

import services from "../../../images/services.png"
import kitchenimg from "../../../images/kitchenimg.png"
import laburimg from "../../../images/laburimg.png"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home Page",
    description: "This is Home page",
};



const page = async () => {

    return (
        <>
            <div className="bg-custom-blue">
                <div className="container flex flex-col mx-auto md:flex-row md:justify-between md:items-center px-10">
                    <div className="grid grid-cols-9 gap-1  justify-between items-center">
                        <div className="col-span-5 flex flex-col justify-center">
                            <p className="md:text-6xl py-5 text-black font-medium leading-tight">Increase your business productivity and performance with our <span className="font-bold text-indigo-800 border-b" >services</span>
                            </p>
                            <button className="flex flex-initial w-60 items-center justify-between px-4 py-4 my-6 text-xs font-semibold text-white bg-indigo-800 rounded-md hover:bg-blue-700">
                                What do you need ?
                                <AiOutlineRight className="mt-1" />
                            </button>

                        </div>
                        <div className="pt-5 md:pt-6 col-span-4 flex justify-items-end">
                            <Image
                                alt=""
                                width="384"
                                height="514"
                                src={laburimg}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-custom-blue">
                <div className="container flex flex-col mx-auto md:flex-row md:justify-between md:items-center">
                    <div>
                        <p className="md:text-6xl text-[31px] py-5 text-indigo-800 font-medium">Renovate with confidence <br />with
                            <span className="font-bold"> Travaux Renovo.</span>
                        </p>
                        {/* <div className="flex items-center p-1 mx-auto mt-5 bg-white border border-gray-300 rounded-full ">
                            <div className="mx-2">
                                <AiOutlineSearch size="20" className="text-gray" />
                            </div>
                            <input type="text" className="flex-grow text-sm font-semibold text-gray-600 border-none focus:outline-none" placeholder="what is your project" />
                            <button className="flex flex-row items-center justify-center px-4 py-4 text-xs font-semibold text-white bg-indigo-800 rounded-full hover:bg-blue-700">
                                Get Your Quote
                                <AiOutlineRight className="mt-1" />
                            </button>
                        </div> */}
                        <button className="flex flex-initial w-60 items-center justify-between px-4 py-4 my-6 text-xs font-semibold text-white bg-indigo-800 rounded-md hover:bg-blue-700">
                            What do you need ?
                            <AiOutlineRight className="mt-1" />
                        </button>
                    </div>
                    <div className="pt-5 md:pt-6">
                        <Image
                            alt=""
                            width="384"
                            height="514"
                            src={laburimg}
                        />
                    </div>
                </div>
            </div>








            <div className="container mx-auto">
                <div className="my-10">
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:xl">How it <span className="font-bold text-indigo-800 underline">works</span> </h2>
                    <div className="flex flex-col items-center md:flex-row md:justify-center ">
                        <div className="py-8 px-4 shadow-custom text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-bold text-indigo-800">1</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black">Step 1</p>
                            <p className="text-sm text-gray">.Describe your project in a few simple steps: Nothing could be easier, let yourself be guided by our simplified route.</p>
                        </div>
                        <div className="py-8 px-4 mx-4 shadow-custom text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-bold text-indigo-800">2</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black">Step 2</p>
                            <p className="text-sm text-gray">Discover artisans competent for your project: We offer you the best profiles in your region, without cost or commitment.</p>
                        </div>
                        <div className="py-8 px-4 shadow-custom text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-bold text-indigo-800">1</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black">Step 3</p>
                            <p className="text-sm text-gray">Receive multiple quotes and choose your craftsman: We let's forward your request to 4 artisans according Read more .</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-custom-blue">
                <div className="container mx-auto">
                    <div className="py-10">
                        <h2 className="mb-6 text-lg font-semibold text-center text-black md:text-xl">Finding the right craftsman <span className="font-bold text-indigo-800 underline">craftsman</span> </h2>
                        <p className="text-sm text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">Has never been easier Avec Travaux Renove, simplifiez votre recherche d'artisans pour<br /> des projets de qualité."</p>
                        <div className="flex flex-col items-center pt-6 space-y-4 md:flex-row md:space-x-4">

                            <div className="basis-1/4 bg-white p-4 shadow-custom text-center w-80 rounded-[16px]">
                                <Image
                                    alt=""
                                    width="273"
                                    height="277"
                                    src={kitchenimg}
                                    // icon
                                    className="w-full"
                                />
                                <div className="flex justify-between pt-2">
                                    <div>hghjg</div>
                                    <div className="text-indigo-800 underline">Start</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center my-10 md:flex-row md:justify-center">
                <div className="py-8 px-4 text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">5000</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Expert</p>
                    <p className="text-xs font-semibold text-black-light">Choose them taking into account insurance and quality labels</p>
                </div>
                <div className="py-8 px-4 text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">30k</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Customers feedback</p>
                    <p className="text-xs font-semibold text-black-light">Choose them taking into account insurance and quality labels</p>
                </div>
                <div className="py-8 px-4 text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">17</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Years of experience</p>
                    <p className="text-xs font-semibold text-black-light">Choose them taking into account insurance and quality labels</p>
                </div>

            </div>




        </>
    );
}

export default page