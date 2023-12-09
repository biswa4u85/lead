import { useState } from 'react';
import SiteApis from "./SiteApis";

export function usePost() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const create = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await SiteApis.addDataApi(url, body);
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { create, data, loading };
}