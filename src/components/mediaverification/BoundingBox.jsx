export const BoundingBox = ({ detectedItem }) => {
    const styleValue = {
        position: 'absolute',
        top: detectedItem.boundingBox.originY,
        left: detectedItem.boundingBox.originX,
        width: detectedItem.boundingBox.width,
        height: detectedItem.boundingBox.height,
        border: '2px solid red',
        transform: `rotate(${detectedItem.boundingBox.angle}deg)`
    };
    // console.log(detectedItem);
    return (
        <div style={styleValue}>
            <span>{Math.round(detectedItem.categories[0].score * 100)/100}</span>
        </div>
    );
};
