"use client"
import { useState } from "react";
import { AiOutlineSearch, AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import services from "../images/services.png"
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { toast } from 'react-toastify';
import language from "@/contexts/language";
import demoimg from "../images/demo_img.png"
import demoimg2 from "../images/demo_img2.png"
import demoimg3 from "../images/demo_img3.png"
import demoimg4 from "../images/demo_img4.png"
import plomber from "../images/plomber.png"
import electrician from "../images/electrician.png"
import chauffage from "../images/chauffage.png"
import peinture from "../images/peinture.png"
import renovation from "../images/renovation.png"
import salle from "../images/salle.png"
import maconnerie from "../images/newMaconnerie.png"
import Carrelage from "../images/Carrelage.png"

export default function Page() {
    const router = useRouter();
    const { data } = useFetch({ url: "home", query: JSON.stringify({}) });
    const [tab, setTab] = useState<any>('depannage');
    const [quote, setQuote] = useState<any>(null);
    const onQuote = (val: any) => {
        if (val) {
            router.push(`/depannage?name=${val}`);
        } else {
            toast.error("Please add a Area Code")
        }
    }

    console.log(tab)

    return (
        <>
            {/* new start */}
            <div className="bg-custom-blue">
                <div className="container mx-auto">
                <div className="flex flex-col  md:flex-row md:justify-between md:items-center md:gap-20 gap-10 mx-10">
                    <div className="w-2/3">

                        <p className="md:text-[44px] text-[16px] text-indigo-800 font-medium mx-5 xl:mx-0 font-felix">{language.banner_title}</p>
                        <p className="md:text-[44px] text-[18px] text-indigo-800 font-bold mx-5 xl:mx-0 font-felix">{language.banner_sub_title}</p>
                        <p className="text-sm font-semibold md:text-lg text-black-light mx-5 xl:mx-0 myCustomFont">{`Plateforme de rénovation et dépannage`}</p>

                        <div className="flex flex-col items-start md:flex-row  mx-5 xl:mx-0 mb-10">

                            <button onClick={() => router.push(`/depannage`)} className="flex flex-row items-center justify-center px-8 py-4 mt-5 text-xs font-normal text-white bg-indigo-800 rounded-full font-poppins hover:bg-blue-700 mr-10">
                                {language.trouble_btn} <AiOutlineRight className="ml-2" />
                            </button>
                            <button onClick={() => router.push(`/batiment`)} className="flex flex-row items-center justify-center px-8 py-4 mt-5 text-xs font-normal text-white bg-indigo-800 rounded-full font-poppins hover:bg-blue-700">
                                {language.build_btn} <AiOutlineRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-5 md:pt-6 w-1/3" >
                        <Image
                            alt=""
                            width="522"
                            height="484"
                            src={services}
                            className="bannerImg"
                        />
                    </div>
                </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="flex mx-auto flex-col max-w-[950px] justify-start items-center my-15">
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:xl">{language.how_works} </h2>


                    <div className="grid grid-col grid-cols-1 justify-center items-center md:grid-row md:grid-cols-4 gap-10">
                        <div className="h-45 py-8 px-6 bg-[#E7EBFE] shadow-[0px_8px_0px_0px_#80A6FF]  text-center rounded-[30px] flex flex-col items-center justify-center">
                            <div className="pb-5 text-lg font-medium text-black font-poppins">
                                <Image
                                    width={70}
                                    height={60}
                                    alt=""
                                    src={demoimg}
                                />
                            </div>
                            <p className="text-sm2 font-normal text-black text-center">{`Tarifs fixes, devis gratuit`}</p>
                        </div>
                        <div className="h-45 py-8 px-6 bg-[#E7EBFE] shadow-[0px_8px_0px_0px_#80A6FF]  text-center rounded-[30px] flex flex-col items-center justify-center">
                            <div className="pb-5 text-lg font-medium text-black font-poppins">
                                <Image
                                    width={70}
                                    height={60}
                                    alt=""
                                    src={demoimg2}
                                />
                            </div>
                            <p className="text-sm2 font-normal text-black text-center">{`Prix connus à l'avance`}</p>
                        </div>
                        <div className="h-45 py-8 px-6 bg-[#E7EBFE] shadow-[0px_8px_0px_0px_#80A6FF]  text-center rounded-[30px] flex flex-col items-center justify-center">
                            <div className="pb-5 text-lg font-medium text-black font-poppins">
                                <Image
                                    width={70}
                                    height={60}
                                    alt=""
                                    src={demoimg3}
                                />
                            </div>
                            <p className="text-sm2 font-normal text-black text-center">{`Professionnels qualifiés`}</p>
                        </div>
                        <div className="h-45 py-8 px-6 bg-[#E7EBFE] shadow-[0px_8px_0px_0px_#80A6FF]  text-center rounded-[30px] flex flex-col items-center justify-center">
                            <div className="pb-5 text-lg font-medium text-black font-poppins">
                                <Image
                                    width={70}
                                    height={60}
                                    alt=""
                                    src={demoimg4}
                                />
                            </div>
                            <p className="text-sm2 font-normal text-black text-center">{`Service continu 24h/7j`}</p>
                        </div>


                    </div>
                    <h2 className="mt-14 mb-6 text-lg font-semibold text-center text-black md:xl">{`Comment ça marche avec Dépannage - Travaux ?`}</h2>
                    <div className="flex justify-center items-center space-x-10">
                        <p onClick={() => setTab('depannage')} className={tab == "depannage" ? "font-bold text-sm1 text-indigo-800" : "font-bold text-sm1 text-black cursor-pointer"}>{`Dépannage`}</p>
                        <p onClick={() => setTab('travaux')} className={tab == "travaux" ? "font-bold text-sm1 text-indigo-800" : "font-bold text-sm1 text-black cursor-pointer"}>{`Travaux`}</p>
                    </div>

                    {tab == "depannage" &&(<div className="grid grid-col grid-cols-1 justify-center items-center md:grid-row md:grid-cols-3 gap-10 mt-7">
                        <div className="h-60 overflow-y-auto pt-4 pb-8 px-6 bg-gray-4 text-center rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-indigo-200">
                                <span className="text-lg font-semibold text-indigo-800">1</span>
                            </div>
                            <p className="text-sm font-normal text-black pt-5">{language.step1_txt}</p>
                        </div>
                        <div className="h-60 overflow-y-auto pt-4 pb-8 px-6 bg-gray-4 text-center rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-indigo-200">
                                <span className="text-lg font-semibold text-indigo-800">2</span>
                            </div>
                            <p className="text-sm font-normal text-black pt-5">{language.step2_txt}</p>
                        </div>
                        <div className="h-60 overflow-y-auto pt-4 pb-8 px-6 bg-gray-4 text-center rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-indigo-200">
                                <span className="text-lg font-semibold text-indigo-800">3</span>
                            </div>
                            <p className="text-sm font-normal text-black pt-5">{language.step3_txt}</p>
                        </div>
                    </div>)}

                    {tab == "travaux" &&(<div className="grid grid-col grid-cols-1 justify-center items-center md:grid-row md:grid-cols-3 gap-10 mt-7">
                        <div className="h-60 overflow-y-auto pt-4 pb-8 px-6 bg-gray-4 text-center rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-indigo-200">
                                <span className="text-lg font-semibold text-indigo-800">1</span>
                            </div>
                            <p className="text-sm font-normal text-black pt-5">{language.step1_txt_travaux}</p>
                        </div>
                        <div className="h-60 overflow-y-auto pt-4 pb-8 px-6 bg-gray-4 text-center rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-indigo-200">
                                <span className="text-lg font-semibold text-indigo-800">2</span>
                            </div>
                            <p className="text-sm font-normal text-black pt-5">{language.step2_txt_travaux}</p>
                        </div>
                        <div className="h-60 overflow-y-auto pt-4 pb-8 px-6 bg-gray-4 text-center rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-12 h-12 bg-indigo-200">
                                <span className="text-lg font-semibold text-indigo-800">3</span>
                            </div>
                            <p className="text-sm font-normal text-black pt-5">{language.step3_txt_travaux}</p>
                        </div>
                    </div>)}

                </div>
            </div>

            <div className="py-10 bg-indigo-200 w-full">
                <p className="text-lg text-center whitespace-normal text-black-light md:whitespace-normal mx-10 font-normal">{`Trouver le bon professionnel pour vos travaux n'a jamais été aussi simple. Avec Dépannage - Travaux, simplifiez votre recherche de dépanneurs pour des projets de qualité.`}</p>
                <div className="flex flex-wrap justify-center items-center pt-6 mx-5 lg:flex-wrap-4 sm:flex-wrap-1 gap-x-4 gap-y-8 ">
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={plomber}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Plombier`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={electrician}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Électricien`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={chauffage}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Chauffage`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={peinture}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Peinture`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={renovation}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Rénovation Complète`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={salle}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Salle de bain & WC`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={maconnerie}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Maçonnerie`}</div>
                    </div>
                    <div className="bg-white p-4 text-center rounded-[16px]">
                        <Image
                            alt=""
                            width="242"
                            height="200"
                            src={Carrelage}
                            className="rounded-[16px]"
                        />
                        <div className="text-lg font-normal text-center text-black-light pt-2">{`Carrelage, Dallage`}</div>
                    </div>

                </div>
            </div>

            <div className="container mx-auto">
                <div className="flex flex-col justify-between items-start md:flex-row">
                    <div className="py-8 px-4 text-center flex flex-col items-center justify-center w-1/4">
                        <div className="flex items-center justify-center text-white rounded-full w-28 h-28 bg-custom-blue">
                            <span className="font-bold text-indigo-800 text-title-xl2">5000</span>
                        </div>

                        <p className="py-5 font-semibold text-black text-title-md">{language.expert}</p>
                        <p className="text-sm font-normal text-black-light">{language.expert_txt}</p>
                    </div>
                    <div className="py-8 px-4 text-center flex flex-col items-center justify-center w-1/4">
                        <div className="flex items-center justify-center text-white rounded-full w-28 h-28 bg-custom-blue">
                            <span className="font-bold text-indigo-800 text-title-xl2">30k</span>
                        </div>

                        <p className="py-5 font-semibold text-black text-title-md">{language.customer_feedback}</p>
                        <p className="text-sm font-normal text-black-light">{language.customer_feedback_txt}</p>
                    </div>
                    <div className="py-8 px-4 text-center flex flex-col items-center justify-center w-1/4">
                        <div className="flex items-center justify-center text-white rounded-full w-28 h-28 bg-custom-blue">
                            <span className="font-bold text-indigo-800 text-title-xl2">17</span>
                        </div>

                        <p className="py-5 font-semibold text-black text-title-md">{language.years_exp}</p>
                        <p className="text-sm font-normal text-black-light">{language.years_exp_txt}</p>
                    </div>

                </div>
            </div>
        </>
    );
}