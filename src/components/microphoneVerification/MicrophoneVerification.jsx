import { useEffect, useRef } from "react";
import useAudioCapture from "./useAudioCapture";
import useAudioAnalizer from "./useAudioAnalizer";
import SoundVisualizer from "./SoundVisualizer";

const MicrophoneVerification = ()=> {
    const [isAudioSuppoerted, audioSrc] = useAudioCapture();
    const audioRef = useRef(null);
    const [timeDomain, setAudioSrc] = useAudioAnalizer();
    useEffect(
        ()=>{
            if(audioRef.current && audioSrc) {
                audioRef.current.srcObject = audioSrc;
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
            </>
        }
        </>
    )
}

export default MicrophoneVerification;