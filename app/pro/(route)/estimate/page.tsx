"use client"
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useFetch } from "@/contexts/useFetch";
import { useSession } from 'next-auth/react'
import Loader from "@/components/common/Loader";
import language from "@/contexts/language";


export default function Page() {
    const router = useRouter();
    const { data } = useSession()
    const [tab, setTab] = useState('active')
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState<any>({ search, assignStatus: tab, profeionalId: (data?.user as any)?.id })
    const { data: lead, loading } = useFetch({ url: "findProjects", query: JSON.stringify(query) });

    useEffect(() => {
        const performAction = () => {
            if (tab == 'active') {
                setQuery({ search, assignStatus: tab, profeionalId: (data?.user as any)?.id })
            } else {
                setQuery({
                    search, assignStatus: "assigned", status: tab, assignTo: (data?.user as any)?.id
                })
            }
        };

        const debounceTimer = setTimeout(() => {
            performAction();
        }, 500);
        return () => clearTimeout(debounceTimer);

    }, [search, tab]);

    return (
        <>
            <div className="container pt-5 pb-10 mx-auto">
                <div className="grid mb-3 md:grid-cols-3 mt-[50px]">
                    <div>
                        <p className='text-xl font-bold text-indigo-800 '>{language.estimate}</p>
                    </div>
                    <div></div>
                    <div className="flex items-center p-1 mt-5 mr-5 bg-white border border-gray-300 rounded-md md:mr-0 ">
                        <div className="mx-2">
                            <AiOutlineSearch size="20" className="text-gray" />
                        </div>
                        <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} className="flex-grow text-xs font-normal border-none font-inter text-gray focus:outline-none" placeholder="Search…" />
                    </div>
                </div>
                <div className="grid mx-5 my-5 md:grid-cols-3 md:mx-0">
                    <div>
                        <p onClick={() => setTab('active')} className={'pb-2 text-sm font-bold text-center  border-b-2 ' + (tab == "active" ? 'text-indigo-800 border-indigo-800' : ' text-black cursor-pointer ')}>{language.active}</p>
                    </div>
                    <div>
                        <p onClick={() => setTab('pending')} className={'pb-2 text-sm font-bold text-center border-b-2 ' + (tab == "pending" ? 'text-indigo-800  border-indigo-800' : ' text-black cursor-pointer ')}>{language.pending}</p>
                    </div>
                    <div>
                        <p onClick={() => setTab('refused')} className={'pb-2 text-sm font-bold text-center border-b-2 ' + (tab == "refused" ? 'text-indigo-800  border-indigo-800' : ' text-black cursor-pointer ')}>{language.refused}</p>
                    </div>
                </div>
                {loading ? <Loader /> : <>{lead?.data && lead.data.map((item: any, key: any) => <div key={key} className="my-5 p-4 shadow-[0px_0px_10px_4px_#F2F6FB] rounded-md cursor-pointer" onClick={() => router.push(`/pro/estimate/${item.id}?type=${item?.batimentCategoryId ? "batiment" : "depannage"}`)}>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <p className='font-semibold text-indigo-800 text-sm1'>{item.title}</p>
                        <div className='flex flex-col justify-start w-auto font-normal md:flex-row md:items-center md:gap-13 '>
                            <p className='text-xs gray-600'>{language.city_label}: <span className='text-black'>{item.address.city}</span> </p>
                            <p className='text-xs gray-600'>{language.appointments}: <span className='text-black'>{new Date(item.assignedDate).toLocaleString()}</span> </p>
                        </div>
                    </div>
                    <p className='pt-4 font-normal leading-7 text-deep-black text-title-xsm'>{item.description}</p>
                </div>)}</>}
            </div>
        </>
    );
}