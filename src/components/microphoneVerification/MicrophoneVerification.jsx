import { useEffect, useRef } from "react";
import useAudioCapture from "./useAudioCapture";
import useAudioAnalizer from "./useAudioAnalizer";
import SoundVisualizer from "./SoundVisualizer";
import useAudioPipeML from "./useAudioPipeML";

const MicrophoneVerification = ()=> {
    const [isAudioSuppoerted, audioSrc] = useAudioCapture();
    const audioRef = useRef(null);
    const [timeDomain, setAudioSrc] = useAudioAnalizer();
    const [, audioClassifier] = useAudioPipeML(audioSrc);
    useEffect(
        ()=>{
            if(audioRef.current && audioSrc) {
                audioRef.current.srcObject = audioSrc;
                audioRef.current.muted = true;
                audioRef.current.play();
                setAudioSrc(audioSrc);
            }
        }
        , [audioSrc, audioRef]
    );
    return (
        <>
        <h1>Verificación de Micrófono</h1>
        {audioSrc &&
            <>
                <audio ref={audioRef}></audio>
                <br/>
                {timeDomain && <SoundVisualizer timeDomainArray={timeDomain} width={512} height={260}/>}
                <br/>
                {audioClassifier && JSON.stringify(audioClassifier[0].classifications[0].categories.filter(o=>o.score>0.1), null, 2)}
            </>
        }
        </>
    )
}

export default MicrophoneVerification;