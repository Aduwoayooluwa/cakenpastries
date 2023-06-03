import { useState, useEffect } from 'react';

const useGetData = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(url);
            const responseData = await response.json();
            setData(responseData.data);
            setLoading(false);
        } catch (err: any) {
            setError(err);
            setLoading(false);
        }
        };

        fetchData();
    }, [url]);

    return { data: data || [], loading, error };
};

export default useGetData;
