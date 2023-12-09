import { useState } from 'react';
import SiteApis from "./SiteApis";

export function useDelete() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const remove = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await SiteApis.deleteDataApi(url, body);
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { remove, data, loading };
}