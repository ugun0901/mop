import{ useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `http://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            query: 'Python developer in Texas, USA',
            page: '1',
            num_pages: '1'

        },
        headers: {
            'X-RapidAPI-key': `67e80072cbmsh318792d457cc138p125857jsnf186aa3a8f0e`,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query},
    }
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = ()=> {
        setIsLoading(true);
        fetchData();
    };
    return ( data, isLoading, error, refetch);
}

export default useFetch;