import useFetch from './useFetch';
const InternetVerification = ()=>{
    const [isSuccess, isFetching, error, data, reload] = useFetch('https://netconnect-api.p.rapidapi.com/network-speed-test');
    const [isPingSuccess, isPingFetching, PingError, PingData, PingReload] = useFetch('https://netconnect-api.p.rapidapi.com/ping?host=google.com');
    return (
        <>
            <h1>Internet Verification</h1>
            <p>Internet Speed: {isSuccess && data && (<>{`${data?.download_speed} ${data?.unit}`}</>)}</p>
            <p>Host Reachable (Ping): {isPingSuccess && PingData && (<>{`${PingData?.result}`}</>)}</p>
            {(error || PingError) && (<p>Error: {error || PingError}</p>) }
        </>
    );
}

export default InternetVerification;