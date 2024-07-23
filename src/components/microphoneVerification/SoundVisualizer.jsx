const SoundVisualizer = ({ timeDomainArray = [], width = 300, height = 260 }) => {
    const nodeWidth = (width / timeDomainArray.length);
    const circles = [...timeDomainArray].map((value, index) => {
        const nodeHeight =  (Math.pow(128.0 - value, 2)) / 256  * height;  //(value/256.0)*height;
        return (
            <rect
                            key={index}
                            x={index}
                            y={(height / 2) - nodeHeight }
                            width={nodeWidth}
                            height={nodeWidth}
                            fill={`rgb(${value + 100}, 50, 50)`}
                        />
            );
    });

    return (
        <svg width={width} height={height} fill="#fff" viewBox={`0,0, ${width},${height}`}>
                {circles}
        </svg>
    );
}

export default SoundVisualizer;

/*


*/