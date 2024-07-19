import { useRef, useEffect, useState } from 'react';
import useVerifyVideo, { captureImageFromVideo, getImageAnalysis } from './useMediaCapture';
import { useMediaPipeML } from './useMediaPipeML';
import { BoundingBox } from './BoundingBox';
import ImageStatsBox from './ImageStatsBox';

const VerifyVideo = () => {
    const [supported, videoSrc] = useVerifyVideo();
    const [imageStats, setImageStats] = useState(null);
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
                setImageStats(stats);
            }, 1000);
            return () => {
                clearInterval(timerIdRef.current);
                console.log("Clearing interval");
                //videoRef.current.stop();
            }
        }
    }, [supported, videoSrc, videoRef, timerIdRef, setImageStats]);
    return (
        <section className="verifier">
            <h1>Verificando Video</h1>
            {supported && (
                <>
                    <section style={{ position: 'relative'}}>
                        {detections.map((detectedItem, index) => (
                            <BoundingBox key={index} detectedItem={detectedItem} />
                        ))}
                        <video ref={videoRef}/>
                    </section>
                    {imageStats && <ImageStatsBox stats={imageStats} facesDetected={detections.length} />}
                </>
            )
            }
        </section>
    )
}

export default VerifyVideo;