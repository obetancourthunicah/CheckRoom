const ImageStatsBox = (
    {
        stats,
        facesDetected = 0
    }
) => {
    return (
        <section>
            <strong>Brillo:</strong>{stats.brightness} &nbsp;
            <strong>Contraste:</strong>{stats.contrast} &nbsp;
            <strong>Rostros:</strong>{facesDetected} &nbsp;
            <strong>Validado:</strong> {(!stats.isBlank && (facesDetected == 1))?'OK':'NO'} &nbsp;
        </section>
    );
}

export default ImageStatsBox;