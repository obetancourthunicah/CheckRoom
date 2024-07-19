import { useEffect, useState } from "react";
import { isMediaCaptureSupported } from "../navigatorService/isMediaCaptureSupported";
const useAudioCapture = ()=> {
    const [supported, setSupported] = useState(false);
    const [localMediaStream, setLocalMediaStream] = useState(null);
    useEffect( ()=>{
        if (isMediaCaptureSupported() && !localMediaStream) {
            setSupported(true);
            navigator.mediaDevices.getUserMedia({ video: false, audio: true })
                .then((localMediaStream)=> {
                    console.log("Media obtained");
                    setLocalMediaStream(localMediaStream);
                }).catch((error)=>{
                    console.log(error);
                    setSupported(false);
                    setLocalMediaStream(null);
                });
        }
    }, [setSupported, localMediaStream, setLocalMediaStream]
    );

    return [supported, localMediaStream];
}

export default useAudioCapture;