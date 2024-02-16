"use client"
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { Input, DatePicker } from "antd";
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react'
import Loader from "@/components/common/Loader";
import language from "@/contexts/language";


export default function Page() {
    const router = useRouter();
    const { data } = useSession()
    const [search, setSearch] = useState('')
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [query, setQuery] = useState({ userId: (data?.user as any)?.id, search, from, to })
    const { data: invoices, loading } = useFetch({ url: "invoices", query: JSON.stringify(query) });

    useEffect(() => {
        const performAction = () => {
            setQuery({ userId: (data?.user as any)?.id, search, from, to })
        };
        const debounceTimer = setTimeout(() => {
            performAction();
        }, 500);
        return () => clearTimeout(debounceTimer);

    }, [search, from, to]);

    const totalPrice = () => {

    }

    const calcTotal = (items: any) => {
        let total = 0
        for (let item of items) {
            total += (item.qty && item.rate) ? Number(item.qty * item.rate) + Number(item.tax ?? 1 * Number(item.qty * item.rate) / 100) : 0

        }
        return total
    }

    return (
        <>
            <div className="container pt-5 pb-10 mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 mb-5 mt-[50px]">
                    <p className='text-lg font-bold text-indigo-800 mx-5 md:mx-0'>{language.invoice_history}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4">

                        <div className="flex items-center p-1">
                            <div className="mx-2">
                                <AiOutlineSearch size="20" className="text-gray" />
                            </div>
                            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>

                        <div className="flex items-center">
                            <div className="mx-2">
                                {language.from}
                            </div>
                            <DatePicker onChange={(data, dateString: any) => setFrom(dateString)} />
                        </div>

                        <div className="flex items-center">
                            <div className="mx-2">
                                {language.to}
                            </div>
                            <DatePicker onChange={(data, dateString: any) => setTo(dateString)} />
                        </div>

                        <div className="flex items-center cursor-pointer" onClick={() => {
                            setSearch('')
                            setFrom(null)
                            setTo(null)
                        }}>
                            <div className="mx-2">
                                <IoIosCloseCircleOutline />
                            </div>
                            {language.clear}
                        </div>

                    </div>
                </div>

                {loading ? <Loader /> :
                    <div className="horiZontScroll"><table className="min-w-full bg-white border-separate border-spacing-y-3">
                        <thead className="bg-indigo-300 rounded-full shadow-[0px_0px_10px_1px_#F2F6FB] font-inter font-semibold text-deep-black text-sm1">
                            <tr>
                                <th className="px-4 py-2">{language.invoice_num}</th>
                                <th className="px-4 py-2">{language.start_at}</th>
                                <th className="px-4 py-2">{language.end_at}</th>
                                <th className="px-4 py-2">{language.total_price}</th>
                                <th className="px-4 py-2">{language.action}</th>
                            </tr>
                        </thead>
                        <tbody className="mt-5">
                            {invoices.data && (invoices.data.map((item: any, key: any) => <tr key={key} className="rounded-md shadow-[0px_0px_5px_1px_#F2F2F2] my-2 text-center font-inter font-normal text-sm1 text-deepblack-100">
                                <td className="px-4 py-2">#000{key + 1}</td>
                                <td className="px-4 py-2">{new Date(item.contractStart).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(item.contractEnd).toLocaleDateString()}</td>
                                <td className="px-4 py-2">${calcTotal(item.items)}</td>
                                <td className="px-4 py-2"><button onClick={() => router.push(`/pro/invoice/${item.id}`)} className="px-2 pb-1 text-sm font-normal text-white bg-indigo-800 rounded-xl font-inter"><p>{language.details}</p></button></td>
                            </tr>))}
                        </tbody>
                    </table></div>
                    }
            </div>
        </>
    );
}