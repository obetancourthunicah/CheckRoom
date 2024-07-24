import {useCallback, useEffect, useState} from 'react';

const cancelToken = new AbortController();
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '1ead6b9fb3msh90d4404a2b71121p1b963bjsncf4dad082546',
        'x-rapidapi-host': 'netconnect-api.p.rapidapi.com'
    },
    signal: cancelToken.signal
};
const useFetch = (url) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const reload = useCallback(() => {
        if (isFetching) {
            //cancelToken.abort();
        }
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    setError('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                setError(null);
                setIsSuccess(true);
                setData(data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, [url]);

    useEffect(() => {
        setIsFetching(true);
        reload();
        return ()=>{
            //cancelToken.abort();
        }
    }, [url, reload]);

    return [isSuccess, isFetching, error, data, reload];
}

export default useFetch;