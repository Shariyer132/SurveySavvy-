const Banner = () => {
    // URL of the uploaded banner image
    const bannerImageUrl = "https://files.oaiusercontent.com/file-xIWLJoBACDBkxXkjbpJFtHxu?se=2023-11-24T11%3A11%3A55Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D2895e762-5424-4018-a8b2-0d455951ad55.webp&sig=S7eX2AP2cbOXm7xAz5N8MDZnnMDEvo/tqflr%2BiWbK08%3D";

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImageUrl})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Make Your Voice Heard</h1>
                    <p className="mb-5">Dive into a world of insights and opinions. Participate in diverse surveys, express your views, and see how they stack up against others. Your opinion matters here, and every vote counts towards shaping decisions on a wide range of topics from technology to social issues.</p>
                    <button className="btn btn-primary">Explore More</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
