export const isMediaCaptureSupported = () => {
    return navigator.mediaDevices?.getUserMedia && true;
};
