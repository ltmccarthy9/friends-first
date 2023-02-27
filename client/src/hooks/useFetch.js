import { useState, useEffect } from "react";
import axios from 'axios';

export default function useFetch(url, refetch) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get(url)
                setUserData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url, refetch]);

    return { userData, loading, error };
}