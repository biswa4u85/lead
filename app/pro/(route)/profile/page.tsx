"use client"
import Image from "next/image";
import abtar from "../../../images/abtar.png"
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { useSession } from 'next-auth/react'

export default function Page() {
    const router = useRouter();
    const { data } = useSession()
    const { data: users } = useFetch({ url: "users", query: JSON.stringify({ id: (data?.user as any)?.id }) });
    let user = users?.data ? users.data[0] : {}
    return (
        <>
            <div className="container px-10 mx-auto ">
                <div className="flex items-center justify-between my-8">
                    <p className="text-lg font-bold text-black">Profile Picture</p>
                    <button onClick={() => router.push(`/pro/profile/${(data?.user as any)?.id}`)} type="submit" className="px-6 py-2 text-indigo-800 border border-indigo-800 rounded text-title-xsm">
                        Add
                    </button>
                </div>
                <div className="my-4 border-t-2 border-gray-500"></div>
                <p className="py-2 font-semibold text-gray-600 text-title-xsm">Include a photo of your face, an image in a professional situation, or your logo to build trust, both with individuals and for the image of your brand.</p>

                <div className="flex items-center justify-center my-8">
                    <Image
                        alt=""
                        width="150"
                        height="100"
                        src={user.image ? user.image : abtar}
                    />
                </div>
                <p className="text-lg font-bold text-black">Profile Picture</p>
                <div className="my-4 border-t-2 border-gray-500"></div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-normal w-90">
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">First Name</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{user.firstName}</div>
                        </div>
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">Last Name</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{user.lastName}</div>
                        </div>
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">Phone</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{user.phone}</div>
                        </div>
                        <div className="flex items-center">
                            <label className="w-1/3 font-thin texl-title-sm text-gray">Email</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{user.email}</div>
                        </div>
                    </div>

                    <div className="flex flex-col items-normal w-90">
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Date of creation</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{new Date(user.createdAt).toDateString()}</div>
                        </div>
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Postal Code</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{user.postalCode}</div>
                        </div>
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Wallet</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">${user.wallet}</div>
                        </div>
                        <div className="flex items-center">
                            <label className="w-2/3 font-thin texl-title-sm text-gray">Company</label>
                            <div className="w-2/3 p-2 font-thin text-black texl-title-sm">{user.company}</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10 mb-20">
                    <button onClick={() => router.push(`/pro/profile/${(data?.user as any)?.id}`)} type="submit" className="px-6 py-2 mx-2 font-thin text-indigo-800 border border-indigo-800 rounded text-title-xsm">
                        Change my password
                    </button>
                    <button onClick={() => router.push(`/pro/profile/${(data?.user as any)?.id}`)} type="submit" className="px-6 py-2 mx-2 font-thin text-white bg-indigo-800 border rounded text-title-xsm">
                        Change my contact details
                    </button>
                </div>
            </div>
        </>
    );
}