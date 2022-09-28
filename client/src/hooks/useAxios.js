import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        getData();
    }, [url]);

    const reAxios = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reAxios }
};

export default useAxios
