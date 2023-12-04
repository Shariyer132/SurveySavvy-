import { FaHome, FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdOutlinePayment, MdRateReview } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
    const [isAdmin] = useUserRole('admin');
    const [isSurveyor, isSurveyorLoading] = useUserRole('surveyor');
    const [isProUser] = useUserRole('pro-user');
    // console.log(isUser, 'user');
    console.log(isSurveyor, 'surveyor');
    if (isSurveyorLoading) {
        return <h3>loading</h3>
    }
    console.log(isProUser, 'pro-user');
    console.log(isAdmin, 'admin');
    return (
        <>
            <Helmet>
                <title>DashBoard</title>
            </Helmet>
            <div className="flex gap-10">
                <div className="w-64 min-h-screen bg-cyan-400">
                    <ul className="menu">
                        {/* {
                            isUser && <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/userHome">
                                    <FaHome />
                                    User Home</NavLink>
                            </li>
                        } */}
                        {
                            isAdmin && <>
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
                                    <NavLink className="text-black hover:text-white" to="/dashboard/surveyResponse">
                                        <MdRateReview />
                                        Survey Responses</NavLink>
                                </li>
                            </>}
                        {
                            isProUser && <li>
                                <NavLink className="text-black hover:text-white" to="/dashboard/proUserHome">
                                    <FaHome />
                                    Pro-user Home</NavLink>
                            </li>


                        }
                        {
                            isSurveyor && <>
                                <li>
                                    <NavLink className="text-black hover:text-white" to="/dashboard/surveyorHome">
                                        <FaHome />
                                        Surveyor Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-black hover:text-white" to="/dashboard/createSurvey">
                                        <FaShoppingCart />
                                        Create Surveys</NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-black hover:text-white" to="/dashboard/surveyResponse">
                                        <MdRateReview />
                                        Survey Responses</NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-black hover:text-white" to="/dashboard/mySurvey">
                                        <MdRateReview />
                                        My Surveys</NavLink>
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
                            <NavLink className="text-black hover:text-white" to="/surveys">
                                <FcSurvey />
                                Surveys</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;