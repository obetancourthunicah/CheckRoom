const ImageStatsBox = (
    {stats}
) => {
    return (
        <section>
            <strong>Brillo:</strong>{stats.brightness} &nbsp;
            <strong>Contraste:</strong>{stats.contrast} &nbsp;
            <strong>Validado:</strong> {stats.isBlank?'NO' :'OK'} &nbsp;
        </section>
    );
}

export default ImageStatsBox;