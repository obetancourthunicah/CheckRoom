import { useEffect, useState } from "react";
import {
    AudioClassifier, FilesetResolver
} from "@mediapipe/tasks-audio";

let audioClassifier;

const initializeAudioClassifier = async () => {
    const audio = await FilesetResolver.forAudioTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-audio@0.10.0/wasm"
    );
    audioClassifier = await AudioClassifier.createFromOptions(audio, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/audio_classifier/yamnet/float32/1/yamnet.tflite"
        },
        maxResults: 10,
        //categoryDenylist: ["Silence"],
      });
}

const useAudioPipeML = (audioRef) => {
    const [initialized, setInitialized] = useState(false);
    const [result, setResult] = useState(null);
    useEffect(() => {
        if (!initialized && audioRef) {
            console.log("Initializing AudioPipe");
            initializeAudioClassifier().then(() => {
                setInitialized(true);
                console.log("AudioPipe initialized");
                const audioCtx = new AudioContext({ sampleRate: 16000 });
                const source = audioCtx.createMediaStreamSource(audioRef);
                const scriptNode = audioCtx.createScriptProcessor(16384, 1, 1);

                scriptNode.onaudioprocess = function (audioProcessingEvent) {
                    const inputBuffer = audioProcessingEvent.inputBuffer;
                    let inputData = inputBuffer.getChannelData(0);

                    // Classify the audio
                    const result = audioClassifier.classify(inputData);
                    setResult(result);
                }

                source.connect(scriptNode);
                scriptNode.connect(audioCtx.destination);
                return () => {
                    scriptNode.disconnect(audioCtx.destination);
                    source.disconnect(scriptNode);
                }
            }
            );
        }
    }, [initialized, audioRef, setInitialized, setResult]);
    return [ initialized, result ];
}

export default useAudioPipeML;
