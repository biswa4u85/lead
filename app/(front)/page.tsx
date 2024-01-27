"use client"
import { useState } from "react";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import services from "../images/services.png"
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { toast } from 'react-toastify';

export default function Page() {
    const router = useRouter();
    const { data } = useFetch({ url: "projects", query: JSON.stringify({}) });
    const [quote, setQuote] = useState<any>(null);
    const onQuote = (val: any) => {
        if (val) {
            router.push(`/batiment?name=${val}`);
        } else {
            toast.error("Please add a Projet Batiment")
        }
    }
    return (
        <>
            <div className="pb-10 bg-custom-blue">
                <div className="container flex flex-col mx-auto md:flex-row md:justify-between md:items-center">
                    <div>
                        <p className="md:text-6xl text-[31px] py-5 text-indigo-800 font-medium">Renovate with confidence <br />with
                            <span className="font-bold">Travaux Renovo.</span>
                        </p>
                        <p className="text-sm font-semibold md:text-lg text-black-light">Connecting building experts and demanding clients.</p>
                        <div className="flex flex-col items-center md:flex-row md:justify-center">
                            <div className="flex items-center p-1 mx-auto mt-5 bg-white border border-gray-300 rounded-full ">
                                <div className="mx-2">
                                    <AiOutlineSearch size="20" className="text-gray" />
                                </div>
                                <input type="text" value={quote} onChange={(obj) => setQuote(obj.target.value)} className="flex-grow text-sm font-semibold text-gray-600 border-none focus:outline-none" placeholder="what is your project" />
                                <button onClick={() => onQuote(quote)} className="flex flex-row items-center justify-center px-4 py-4 text-xs font-normal text-white bg-indigo-800 rounded-full font-poppins hover:bg-blue-700">
                                    Projet Batiment <AiOutlineRight className="ml-2" />
                                </button>
                            </div>
                            <button onClick={() => router.push(`/depannage`)} className="flex flex-row items-center justify-center px-4 py-4 mt-5 text-xs font-normal text-white bg-indigo-800 rounded-full font-poppins hover:bg-blue-700">
                                Projet Dépannage <AiOutlineRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-5 md:pt-6" >
                        <Image
                            alt=""
                            width="522"
                            height="484"
                            src={services}
                            className="w-[244px] h-[226px] md:w-auto md:h-auto "
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="my-15">
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:xl">How it <span className="font-bold text-indigo-800 underline">works</span> </h2>
                    <div className="flex flex-col items-center md:flex-row md:justify-center">
                        <div className="py-8 px-6 bg-white shadow-[0px_0px_10px_4px_#F2F6FB]  text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-semibold text-indigo-800">1</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black font-poppins">Step 1</p>
                            <p className="text-sm font-normal text-gray">Describe your project in a few simple steps: Nothing could be easier, let yourself be guided by our simplified route.</p>
                        </div>
                        <div className="py-8 px-6 mx-4 my-8 md:my-0 shadow-[0px_0px_10px_4px_#F2F6FB] bg-white text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-semibold text-indigo-800">2</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black font-poppins">Step 2</p>
                            <p className="text-sm font-normal text-gray">Discover artisans competent for your project: We offer you the best profiles in your region, without cost or commitment.</p>
                        </div>
                        <div className="py-8 px-6 shadow-[0px_0px_10px_4px_#F2F6FB] text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-semibold text-indigo-800">3</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black font-poppins">Step 3</p>
                            <p className="text-sm font-normal text-gray line-clamp-4">{`Receive multiple quotes and choose your craftsman: We let's forward your request to 4 artisans according Read more    to their availability. These professionals will contact you again to offer you a personalized quote.`}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 bg-custom-blue">
                <div className="container mx-auto">
                    <div className="flex mx-auto flex-col max-w-[950px] justify-start items-center">
                        <h2 className="mb-6 text-lg font-semibold text-center text-black md:text-xl">Finding the right craftsman <span className="font-bold text-indigo-800 underline">craftsman</span> </h2>
                        <p className="text-sm text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">{`Has never been easier Avec Travaux Renove, simplifiez votre recherche d'artisans pour des projets de qualité."`}</p>
                        <div className="flex flex-wrap items-center pt-6 ml-5 lg:flex-wrap-4 sm:flex-wrap-1">
                            {data?.data && data.data.map((item: any, key: any) => {
                                if (key < 8) {
                                    return <div key={key} className="lg:basis-1/5 sm:basis-1/1 bg-white m-2 p-4 shadow-custom text-center w-80 rounded-[16px]">
                                        <Image
                                            alt=""
                                            width="273"
                                            height="277"
                                            src={item.icon}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between pt-2">
                                            <div>{item?.name}</div>
                                            <div onClick={() => onQuote(item?.name)} className="text-indigo-800 underline cursor-pointer">Start</div>
                                        </div>
                                    </div>
                                }
                            })}
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