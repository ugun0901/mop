import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `http://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query, // query를 확장하여 사용
        },
        headers: {
            'X-RapidAPI-key': `67e80072cbmsh318792d457cc138p125857jsnf186aa3a8f0e`,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
        } catch (error) {
            setError(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint, query]); // 의존성 배열 추가

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch }; // 객체 형식으로 반환
}

export default useFetch;
