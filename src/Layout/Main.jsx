import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <div className="flex justify-center">
                <Navbar />
            </div>
            <Outlet />
        </div>
    );
};

export default Main;