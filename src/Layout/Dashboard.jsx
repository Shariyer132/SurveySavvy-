import { FaHome, FaShoppingBag, FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdOutlinePayment, MdRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    console.log(isAdmin);
    return (
        <div className="flex gap-10">
            <div className="w-64 min-h-screen bg-cyan-400">
                <ul className="menu">
                    {
                    isAdmin ? <>
                            <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/adminHome">
                                    <FaHome />
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/manageUsers">
                                    <FaUsers />
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/payments">
                                    <MdOutlinePayment />
                                    Pro-user Payments</NavLink>
                            </li>
                            <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/reqSurveys">
                                    <FaShoppingCart />
                                    Surveys request</NavLink>
                            </li>
                            <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/createSurvey">
                                    <FaShoppingCart />
                                    Create Surveys</NavLink>
                            </li>
                            <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/surveyResponse">
                                    <MdRateReview/>
                                    Survey Responses</NavLink>
                            </li>
                        </> :
                            <>
                             <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/surveyResponse">
                                    <MdRateReview/>
                                    Survey Responses</NavLink>
                            </li>
                            </>
                    }
                    <hr className="my-6" />
                    <li>
                        <NavLink className="text-black hover:text-white" to="/">
                            <FaHome />
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="text-black hover:text-white" to="/menu">
                            {/* <MdOutlineMenu /> */}
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink className="text-black hover:text-white" to="/order/salads">
                            <FaShoppingBag />
                            Order</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;