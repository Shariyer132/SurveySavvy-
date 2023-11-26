import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen max-w-full opacity-75" id="error-page" style={{backgroundImage: 'url(https://i.ibb.co/x3t2771/DALL-E-2023-11-09-11-52-01-A-creative-and-engaging-404-error-page-design-featuring-a-lost-astronaut.png)'}}>
            <Link to="/"><button className="btn btn-info btn-outline">Back to Home</button></Link>
            
        </div>
    );
};

export default ErrorPage;