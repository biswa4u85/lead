import {  AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import laburimg from "../../../images/laburimg.png"
import constuction from "../../../images/constuction.png"
import constuction2 from "../../../images/constuction2.png"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professionnel",
    description: "Create Professionnel",
};


export default function Page() {
    return (
        <>
            <div className="bg-custom-blue">
                <div className="container flex flex-col mx-auto md:flex-row md:justify-between md:items-center">
                    <div className="flex-none md:w-1/2">
                        <p className="py-5 font-medium leading-tight text-black whitespace-pre-wrap text-title-xl2 md:text-6xl mx-5 md:mx-0">Increase your business productivity and performance with our <span className="font-bold text-indigo-800 border-b" >services</span>
                        </p>
                        <button className="flex items-center justify-between flex-initial px-4 py-4 my-6 text-xs font-semibold text-white bg-indigo-800 rounded-md w-60 hover:bg-blue-700 ml-5 md:ml-0">
                            <Link href={"/espace-pro-detail"} className="flex items-center justify-between">
                                What do you need ?
                                <AiOutlineRight className="mt-1" />
                            </Link>
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
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:xl">Come and test our offers to boost your <p className="font-bold text-indigo-800 underline break-all">construction business.</p> </h2>
                    <div className="flex flex-col items-center md:items-start center md:flex-row md:justify-center ">
                        <div className="py-8 px-4 shadow-custom text-center w-80 h-full rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-bold text-indigo-800">1</span>
                            </div>
                            <p className="py-5 text-lg font-medium text-black">The Customer Portfolio</p>
                            <ul className="text-sm list-disc list-inside text-gray">
                                <li>Develop your turnover by obtaining new prospects quickly.</li>
                                <li>Establish connections with potential customers and industry partners</li>
                                <li> Maximize your calendar and get scheduled appointments and qualified contacts</li>
                            </ul>
                        </div>
                        <div className="py-8 px-4 shadow-custom text-center w-80 h-full rounded-[16px] flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-bold text-indigo-800">1</span>
                            </div>
                            <p className="py-5 text-lg font-medium text-black">Recruitment</p>
                            <ul className="text-sm list-disc list-inside text-gray">
                                <li>Successfully recruit by offering you HR solutions; put down an announcement with your Search Criteria</li>
                                <li>Profitez de notre réseau
                                    expert en recrutement dans le BTP; votre annonce sera diffusée
                                    sur tous nos canaux
                                    indépendants pour un résultat optimal</li>
                            </ul>
                        </div>
                        <div className="py-8 px-4 shadow-custom text-center w-80 h-full rounded-[16px] flex flex-col items-center">
                            <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                                <span className="text-lg font-bold text-indigo-800">1</span>
                            </div>
                            <p className="py-5 text-lg font-medium text-black">Training</p>
                            <ul className="text-sm list-disc list-inside text-gray">
                                <li>Develop skills of your employees; implement targeted training actions for your teams</li>
                                <li>Develop skills of your employees; implement targeted training actions for your teams</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-custom-blue">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 py-14">
                        <div className="md:col-span-2 mx-5 md:mx-0">
                            <p className="py-1 text-lg font-semibold text-black">How to find construction sites as a building tradesman with Travaux Renovo.</p>
                            <p className="py-1 text-xs leading-7 text-gray md:leading-normal">There are many reasons that push an independent craftsman to seek new projects from individuals or companies. Whether you are just starting out in your business or your company already has many years of experience and is looking to expand its customer base, finding new construction sites is a constant challenge for building tradesmen.</p>
                            <p className="py-1 text-xs leading-7 text-gray md:leading-normal">Travaux Renove is here to simplify the process. Our service company aims to connect construction companies with individuals or companies seeking to obtain a quote for a work project. Our platform offers an efficient and transparent way to find new construction sites.</p>
                            <button className="flex items-center justify-between flex-initial px-4 my-6 text-xs font-semibold text-indigo-800 rounded-md w-35 hover:bg-blue-700">
                                Learn more
                                <AiOutlineRight className="mt-1" />
                            </button>
                        </div>
                        <div className="...">
                            <Image
                                alt=""
                                width="510"
                                height="439"
                                src={constuction}
                            />


                        </div>
                    </div>
                </div>
            </div>


            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 py-14">
                    <div className="...">
                        <Image
                            alt=""
                            width="510"
                            height="439"
                            src={constuction2}
                        />
                    </div>
                    <div className="col-span-2 mx-5 md:mx-0">
                        <p className="py-1 text-lg font-semibold text-black">How to find construction sites as a building tradesman with Travaux Renovo.</p>
                        <p className="py-1 text-xs leading-7 text-gray md:leading-normal">There are many reasons that push an independent craftsman to seek new projects from individuals or companies. Whether you are just starting out in your business or your company already has many years of experience and is looking to expand its customer base, finding new construction sites is a constant challenge for building tradesmen.</p>
                        <p className="py-1 text-xs leading-7 text-gray md:leading-normal">Travaux Renove is here to simplify the process. Our service company aims to connect construction companies with individuals or companies seeking to obtain a quote for a work project. Our platform offers an efficient and transparent way to find new construction sites.</p>
                        <button className="flex items-center justify-between flex-initial px-4 my-6 text-xs font-semibold text-indigo-800 rounded-md w-35 hover:bg-blue-700">
                            Learn more
                            <AiOutlineRight className="mt-1" />
                        </button>
                    </div>

                </div>
            </div>


            <div className="flex items-center justify-center w-full text-center" style={{
                backgroundImage: 'url("/images/add-bg.png")',
                backgroundRepeat: "no-repeat",
                height: "644px",
                backgroundSize:'cover'
            }}>
                <div className="container mx-5 md:mx-auto">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="py-2 text-xl text-white"> In <span className="text-indigo-800 " >Addition</span> </h2>
                        <p className="py-4 text-xs text-white md:text-title-sm">we have set up a membership solution for construction companies, offering access to numerous services: qualified leads, appointments for quote pricing, the possibility of submitting an ad for the search for profiles to hire, as well as special offers in partnership with our training organizations.</p>
                        <p className="py-4 text-xs text-white md:text-title-sm">The concept is simple: a monthly membership for €199, giving you the right to a presentation web page and 12 points to spend each month. A qualified lead costs 2 points, a qualified meeting costs 4 points, and an ad for a sought-after profile requires 10 points. Points not used over the last 3 months can be accumulated and reused. If a member no longer has points and wishes to use a service, they can purchase additional points at a unit price of €15 or a pack of 10 points for €120.</p>
                        <p className="py-2 text-xs text-white md:text-title-sm">{`Avec Travaux Renove, vous avez l'opportunité de maximiser votre visibilité, d'accéder à des chantiers de qualité et de développer votre entreprise avec une efficacité inégalée.`}</p>
                    </div>
                </div>

            </div>


            <div className="container  mx-auto">
                <div className="py-10  mx-5 md:mx-0">
                    <h2 className="mb-6 text-lg font-semibold text-center text-black md:text-xl">Advantages of <span className="font-bold text-indigo-800 underline">Travaux Renove.</span> </h2>
                    <p className="py-5 text-sm font-semibold text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">The advantages of going through Travaux Renove to find construction sites</p>
                    <p className="text-sm font-normal text-center whitespace-normal text-black-light md:whitespace-normal">When you are a craftsman looking for new projects, Travaux Renove is there to simplify your process. Our platform offers an effective solution for quickly finding construction sites from individuals, with craftsman profiles that reflect the quality of their services, certified by customer reviews published on Travaux Renove. Thanks to accurate and verified information, your profile will present the best image of your company to individuals looking for reliable and competent professionals</p>
                    <p className="py-5 text-sm font-semibold text-center whitespace-normal text-black-light md:whitespace-normal md:text-title-sm">The advantages of going through Travaux Renove to find construction sites</p>
                </div>
            </div>


            <div className="flex flex-col items-start md:flex-row md:justify-center">
                <div className="py-8 px-4 text-center w-full  md:w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">5000</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Offers adapted to your expectations:</p>
                    <p className="text-xs font-semibold text-black-light">Unlike social networks or non-specialized sites, Travaux Renove sends you site offers specifically linked to your activity</p>
                </div>
                <div className="py-8 px-4 text-center w-full  md:w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">30k</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Simplified communication</p>
                    <p className="text-xs font-semibold text-black-light">With our platform, direct contact with individuals is facilitated, allowing you to interact more easily.</p>
                </div>
                <div className="py-8 px-4 text-center w-full  md:w-80 rounded-[16px] flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-custom-blue">
                        <span className="font-bold text-indigo-800">17</span>
                    </div>

                    <p className="py-5 font-semibold text-black-light text-title-sm">Many construction site offers</p>
                    <p className="text-xs font-semibold text-black-light">Our service being completely free for individuals, many of them are looking for craftsmen on Travaux Renove, thus offering you a wide range of opportunities.</p>
                </div>

            </div>
        </>
    );
}