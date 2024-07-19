import { useState, useEffect, useCallback } from 'react';

const useAudioAnalizer = () => {
    const [timeDomain, setTimeDomain] = useState(null);
    const [audioRef, setAudioRef] = useState(null);
    const setAudioReference = useCallback((audioRef) => {
        setAudioRef(audioRef);
    }, [setAudioRef]);
    useEffect(
        () => {
            if (audioRef) {
                const audioCtx = new AudioContext();
                const source = audioCtx.createMediaStreamSource(audioRef);
                const analyser = audioCtx.createAnalyser();
                // analyser.minDecibels = -90;
                // analyser.maxDecibels = -10;
                analyser.smoothingTimeConstant = 1;
                source.connect(analyser);
                analyser.connect(audioCtx.destination);
                //let frequencyArray = new Uint8Array(bufferLength);
                const getData = () => {
                    analyser.fftSize = 2048;
                    const bufferLength = analyser.frequencyBinCount;
                    let dataArray = new Uint8Array(bufferLength);
                    analyser.getByteTimeDomainData(dataArray);
                    //analyser.getByteFrequencyData(frequencyArray);
                    setTimeDomain(dataArray);
                    //setFrecuencyData(frequencyArray);
                    window.requestAnimationFrame(getData);
                }
                getData();
            }
        }
        , [setTimeDomain, audioRef]
    );

    return [timeDomain, setAudioReference];
}

export default useAudioAnalizer;

