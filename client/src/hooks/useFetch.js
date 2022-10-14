import { useEffect, useState } from "react"
import axios from "axios";
// This is a custom hook that we will call when data needs to populate
// a page on page load.  

// 
const useFetch = (url) => {
    // use states for our data, loading, and errors
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState(false);

    // useEffect triggers on page load
    // axios fetches our database
    // for example, when we open dashboard, this will be called and 
    // then we will use the returned data to populate the page
    useEffect (() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url)
                setData(res.data);
            } catch(err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]); 


const reFetch = async () => {
    setLoading(true);
    try {
        const res = await axios.get(url)
        setData(res.data);
    } catch(err) {
        setError(err);
    }
    setLoading(false);
};

return {data, loading, error, reFetch};
};

export default useFetch;