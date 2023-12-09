import Image from "next/image";
import icon1 from "../../../images/icon1.png"
import icon2 from "../../../images/icon2.png"
import icon3 from "../../../images/icon3.png"
import icon4 from "../../../images/icon4.png"
import icon5 from "../../../images/icon5.png"
import icon6 from "../../../images/icon6.png"
import icon8 from "../../../images/icon8.png"


// "use client"
const page = async () => {


    return (
        <>
            <div className="mx-5 md:mx-64 md:mb-20 mb-10">
                {/* stepers start */}
                <div className="flex items-center justify-center my-7" >
                    <div className="relative flex flex-col items-center">

                        <div className="flex-shrink-0 w-8 h-8 border rounded-full border-blue-500 flex items-center justify-center">
                            1
                        </div>

                        <div className="text-center mt-2">Your project</div>
                    </div>

                    <div className="border-l h-8 mx-4 border-gray-500"></div>

                    <div className="relative flex flex-col items-center">

                        <div className="flex-shrink-0 w-8 h-8 border rounded-full border-blue-500 flex items-center justify-center">
                            2
                        </div>
                        <div className="text-center mt-2">Supply and Installation</div>
                    </div>


                    <div className="border-l h-8 mx-4 border-gray-500"></div>

                    <div className="relative flex flex-col items-center">

                        <div className="flex-shrink-0 w-8 h-8 border rounded-full border-blue-500 flex items-center justify-center">
                            3
                        </div>

                        <div className="text-center mt-2">Project Detail</div>
                    </div>

                    <div className="border-l h-8 mx-4 border-gray-500"></div>

                    <div className="relative flex flex-col items-center">

                        <div className="flex-shrink-0 w-8 h-8 border rounded-full border-blue-500 flex items-center justify-center">
                            4
                        </div>

                        <div className="text-center mt-2">Your contact details</div>
                    </div>
                </div>

                {/* stepers end */}

                <div className="border-b-2 border-indigo-800 mx-3 mb-3">
                    <p className="md:text-lg text-sm font-Normal text-deep-black md:max-w-2xl leading-10">Select the type of work you want to carry out</p>
                </div>
                <div className="flex flex-wrap justify-normal">
                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 ml-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon1}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Construction - Rénovation</p>
                    </div>

                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon2}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Renewabe Energies</p>
                    </div>

                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon3}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Exterior - Gardens</p>
                    </div>
                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon4}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Interiors</p>
                    </div>

                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon5}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Isolation</p>
                    </div>

                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon6}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Masonry</p>
                    </div>
                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon8}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Menuiseries</p>
                    </div>
                    <div className="flex items-center w-73 md:my-6 my-2 mx-2 rounded-[5px] border border-gray-500 p-2" >
                        <div className="flex items-center justify-center rounded-md w-14 h-14 bg-gray-400">
                            <Image
                                alt=""
                                width="44"
                                height="44"
                                src={icon8}
                            />
                        </div>
                        <p className="pl-2 text-deep-black text-sm font-normal">Plumbing - Heating</p>
                    </div>
                </div>

                <div className="border-t-2 border-gray-500 my-4"></div>


                <div className="flex justify-center">
                    <button className="border border-indigo-800 text-indigo-800 text-sm font-medium rounded-md mt-3 p-2">
                        Click me
                    </button>
                </div>
            </div >

            {/* form Section start*/}
    
            <div className='container m-auto '>
                <div className="flex justify-center items-center h-screen">
                    <div className="w-230">
                        <div className="border-b-2 border-indigo-800 mb-5">
                            <p className="md:text-lg text-sm font-Normal text-deep-black md:max-w-2xl leading-10">Complete your contact details</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black text-xs font-medium ">First Name</label>
                                <input type="text" className="border border-gray-500 rounded-xs placeholder-gray-500 text-xs px-3 py-2 m-0 backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter First Name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black text-xs font-medium">Last Name</label>
                                <input type="text" className=" border  border-gray-500 rounded-xs placeholder-gray-500 text-xs px-3 py-2 m-0 backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter Last Name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black text-xs font-medium">Post Code</label>
                                <input type="text" className=" border  border-gray-500 rounded-xs placeholder-gray-500 text-xs px-3 py-2 m-0 backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter Post Code" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black text-xs font-medium">Phone Number</label>
                                <input type="text" className="border  border-gray-500 rounded-xs placeholder-gray-500 text-xs px-3 py-2 m-0 backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter Phone Number" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black text-xs font-medium">City Name</label>
                                <input type="text" className="border  border-gray-500 rounded-xs placeholder-gray-500 text-xs px-3 py-2 m-0 backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter City Name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="text-black text-xs font-medium">Email</label>
                                <input type="text" className="border  border-gray-500 rounded-xs placeholder-gray-500 text-xs px-3 py-2 m-0 backdrop:rounded focus:outline-none focus:border-blue-500" placeholder="Enter Email" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
   {/* form Section start*/}


        </>
    );
}

export default page