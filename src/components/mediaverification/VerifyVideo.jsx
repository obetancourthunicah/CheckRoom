import { useState, useRef, useEffect } from 'react';
import useVerifyVideo, { captureImageFromVideo, getImageAnalysis } from './useMediaCapture';
import { useMediaPipeML } from './useMediaPipeML';
import { BoundingBox } from './BoundingBox';

const VerifyVideo = () => {
    const [supported, videoSrc] = useVerifyVideo();
    const timerIdRef = useRef(0);
    const videoRef = useRef(null);
    const { detections, initialized } = useMediaPipeML(videoRef);
    useEffect(() => {
        if (supported && videoRef.current && videoSrc) {
            videoRef.current.srcObject = videoSrc;
            videoRef.current.play();
            timerIdRef.current = setInterval(async () => {
                const image = captureImageFromVideo(videoRef.current);
                const stats = getImageAnalysis(image);
                //console.log(stats);
            }, 1000);
            return () => {
                clearInterval(timerIdRef.current);
                console.log("Clearing interval");
                //videoRef.current.stop();
            }
        }
    }, [supported, videoSrc, videoRef, timerIdRef]);
    return (
        <section className="verifier">
            <strong>Verificando Video</strong>
            {supported && (
                <>
                    <span>OK</span>
                    <section style={{ position: 'relative' }}>
                        {detections.map((detectedItem, index) => (
                            <BoundingBox key={index} detectedItem={detectedItem} />
                        ))}
                        <video ref={videoRef} />
                    </section>
                </>
            )
            }
        </section>
    )
}

export default VerifyVideo;