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
                const gain = audioCtx.createGain();
                gain.gain.setValueAtTime(0, audioCtx.currentTime);
                //analyser.smoothingTimeConstant = 1;
                //compressor.connect(audioCtx.destination)
                analyser.connect(gain);
                gain.connect(audioCtx.destination);

                source.connect(analyser);
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
                return () => {
                    source.disconnect(analyser);
                    gain.disconnect(audioCtx.destination);
                }
            }
        }
        , [setTimeDomain, audioRef]
    );

    return [timeDomain, setAudioReference];
}

export default useAudioAnalizer;

