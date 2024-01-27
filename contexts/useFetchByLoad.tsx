import { useState } from 'react';
import SiteApis from "./SiteApis";
import { useSession } from "next-auth/react";

export function useFetchByLoad(params: any) {
    const session: any = useSession()
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const fetch = async () => {
        try {
            setLoading(true);
            const response: any = await SiteApis.getDataApi(params.url, params.query ? JSON.parse(params.query) : {}, session?.data?.user?.token);
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { fetch, data, loading };
}