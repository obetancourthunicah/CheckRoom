import { useEffect, useState } from "react";
import { isMediaCaptureSupported } from "../navigatorService/isMediaCaptureSupported";
const useVerifyVideo = ()=> {
    const [supported, setSupported] = useState(false);
    const [localMediaStream, setLocalMediaStream] = useState(null);
    useEffect( ()=>{
        if (isMediaCaptureSupported() && !localMediaStream) {
            setSupported(true);
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
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

export default useVerifyVideo;


const getImageStats = (data) => {
    let totalPixels = 0;
    let averageRed = 0;
    let averageGreen = 0;
    let averageBlue = 0;
    let averageAlpha = 0;

    data.forEach((pixel)=>{
        totalPixels++;
        averageRed += pixel[0];
        averageGreen += pixel[1];
        averageBlue += pixel[2];
        averageAlpha += pixel[3];
    });
    return {
        totalPixels,
        redPixels: averageRed / totalPixels,
        greenPixels: averageGreen / totalPixels,
        bluePixels: averageBlue / totalPixels,
        alphaPixels: averageAlpha / totalPixels
    };
}

const isImageBlank = (brightness, contrast) => {
    return brightness < 70 || brightness > 170 || contrast < 50;
}

const getImageBrightness = (imageData) => {
    let imagePixels = [];
    let totalLight = 0;
    for(let i = 0; i < imageData.length; i+=4) {
        const r = imageData[i];
        const g = imageData[i+1];
        const b = imageData[i+2];
        const a = imageData[i+3];
        const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
        imagePixels.push([
            r,
            g,
            b,
            a,
            hsp
        ]);
        totalLight += hsp;
    }
    return {brightness: Math.round((totalLight / imagePixels.length)*100)/100, imagePixels};
}

const getImageContrast = (imageData) => {
    let maxLuminance = 0;
    let minLuminance = 255;
    imageData.forEach(pixel => {
        const hsp = pixel[4];
        if (hsp > maxLuminance) maxLuminance = hsp;
        if (hsp < minLuminance) minLuminance = hsp;
    });
    const contrast = Math.round(((maxLuminance - minLuminance) / (maxLuminance + minLuminance))*10000)/100;
    return contrast;
}

export const getImageAnalysis = (imageData) => {
    const canvasImgData = getCanvasImgData(imageData);
    const { brightness, imagePixels } = getImageBrightness(canvasImgData);
    const stats = getImageStats(imagePixels);
    const contrast = getImageContrast(imagePixels);
    return {
        brightness,
        isBlank: isImageBlank(brightness, contrast),
        contrast,
        stats
    };
}

export const captureImageFromVideo = (videoElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function getCanvasImgData(imageData) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    const data = ctx.getImageData(0, 0, imageData.width, imageData.height).data;
    return data;
}
