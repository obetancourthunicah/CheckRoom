import {
    FaceDetector,
    FilesetResolver
} from "@mediapipe/tasks-vision";
import { useEffect, useState } from "react";

let faceDetector;
let runningMode = "VIDEO";

const initializefaceDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU"
        },
        runningMode: runningMode
    });
};

let lastVideoTime = -1;
async function predictWebcam(handler, video) {
    // if image mode is initialized, create a new classifier with video runningMode
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await faceDetector.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();

    // Detect faces using detectForVideo
    if (video?.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const detections = faceDetector.detectForVideo(video, startTimeMs)
            .detections;
        handler(detections);
    }

    window.requestAnimationFrame(() => predictWebcam(handler, video));
}

export const useMediaPipeML = (videoRef) => {
    const [initialized, setInitialized] = useState(false);
    const [detections, setDetections] = useState([]);
    useEffect(() => {
        if (!initialized && videoRef?.current) {
            console.log("Initializing MediaPipe");
            initializefaceDetector().then(() => {
                setInitialized(true);
                console.log("MediaPipe initialized");

                predictWebcam((detections) => {
                    setDetections(detections);
                }, videoRef.current);

            });
        }
    }, [initialized, videoRef?.current, setInitialized, setDetections]);
    return { initialized, detections };
}

