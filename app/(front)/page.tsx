"use client"
import { useState } from "react";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import services from "../images/services.png"
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { toast } from 'react-toastify';
import language from "@/contexts/language";

export default function Page() {
    const router = useRouter();
    const { data } = useFetch({ url: "home", query: JSON.stringify({}) });
    const [quote, setQuote] = useState<any>(null);
    const onQuote = (val: any) => {
        if (val) {
            router.push(`/depannage?name=${val}`);
        } else {
            toast.error("Please add a Area Code")
        }
    }
    return (
        <>
            <div className="bg-custom-blue">
                <div className="container flex flex-col mx-auto md:flex-row md:justify-between md:items-center">
                    <div>
                        <p className="md:text-6xl text-[31px] py-5 text-indigo-800 font-medium mx-5 xl:mx-0">{language.banner_title}
                        </p>
                        <p className="text-sm font-semibold md:text-lg text-black-light mx-5 xl:mx-0">{language.banner_sub_title}</p>
                        <div className="flex flex-col items-center md:flex-row md:justify-center  mx-5 xl:mx-0">
                            <div className="flex items-center p-1 mx-auto mt-5 bg-white border border-gray-300 rounded-full">
                                <div className="mx-2">
                                    <AiOutlineSearch size="20" className="text-gray" />
                                </div>
                                <input type="text" value={quote} onChange={(obj) => setQuote(obj.target.value)} className="flex-grow text-sm font-semibold text-gray-600 border-none focus:outline-none" placeholder={language.area_code} />
                                <button onClick={() => onQuote(quote)} className="flex flex-row items-center justify-center px-4 py-4 text-xs2 xl:text-xs font-normal text-white bg-indigo-800 rounded-full font-poppins hover:bg-blue-700 -ml-24 xl:-ml-0">
                                {language.trouble_btn}  <AiOutlineRight className="ml-2" />
                                </button>
                            </div>
                            <button onClick={() => router.push(`/batiment`)} className="flex flex-row items-center justify-center px-4 py-4 mt-5 text-xs font-normal text-white bg-indigo-800 rounded-full font-poppins hover:bg-blue-700">
                            {language.build_btn} <AiOutlineRight className="ml-2" />
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
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:xl">{language.how_works} </h2>
                    <div className="flex flex-col items-center md:flex-row md:justify-center">
                        <div className="py-8 px-6 bg-white shadow-[0px_0px_10px_4px_#F2F6FB]  text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-semibold text-indigo-800">1</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black font-poppins">{language.step1}</p>
                            <p className="text-sm font-normal text-gray">{language.step1_txt}</p>
                        </div>
                        <div className="py-8 px-6 mx-4 my-8 md:my-0 shadow-[0px_0px_10px_4px_#F2F6FB] bg-white text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-semibold text-indigo-800">2</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black font-poppins">{language.step2}</p>
                            <p className="text-sm font-normal text-gray">{language.step2_txt}</p>
                        </div>
                        <div className="py-8 px-6 shadow-[0px_0px_10px_4px_#F2F6FB] text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-semibold text-indigo-800">3</span>
                            </div>

                            <p className="py-5 text-lg font-medium text-black font-poppins">{language.step3}</p>
                            <p className="text-sm font-normal text-gray line-clamp-4">{language.step3_txt}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 bg-custom-blue">
                <div className="container mx-auto">
                    <div className="flex mx-auto flex-col max-w-[950px] justify-start items-center">
                        <h2 className="mb-6 text-lg font-semibold text-center text-black md:text-xl">{language.finding_txt} </h2>
                        <p className="text-sm text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">{language.has_never}</p>
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
                                            <div onClick={() => router.push(`/batiment?name=${item?.id}`)} className="text-indigo-800 underline cursor-pointer">{language.start}</div>
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

                    <p className="py-5 font-semibold text-black-light text-title-sm">{language.expert}</p>
                    <p className="text-xs font-semibold text-black-light">{language.expert_txt}</p>
                </div>
                <div className="py-8 px-4 text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">30k</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">{language.customer_feedback}</p>
                    <p className="text-xs font-semibold text-black-light">{language.customer_feedback_txt}</p>
                </div>
                <div className="py-8 px-4 text-center w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">17</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">{language.years_exp}</p>
                    <p className="text-xs font-semibold text-black-light">{language.years_exp_txt}</p>
                </div>

            </div>
        </>
    );
}