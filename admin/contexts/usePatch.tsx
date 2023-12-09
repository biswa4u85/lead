import { useState } from 'react';
import SiteApis from "./SiteApis";

export function usePatch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const edit = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await SiteApis.editDataApi(url, body);
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { edit, data, loading };
}