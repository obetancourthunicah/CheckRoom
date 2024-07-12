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
            <span>{detectedItem.categories[0].score}</span>
        </div>
    );
};
