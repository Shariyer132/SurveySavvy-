import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { Helmet } from "react-helmet-async";

const Main = () => {
    return (
        <div>
               <Helmet>
            <title>Survey Savvy | Home</title>
        </Helmet>
            <div className="flex justify-center">
                <Navbar />
            </div>
            <Outlet />
        </div>
    );
};

export default Main;