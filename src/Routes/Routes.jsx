import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import SurveyPage from "../pages/SurveyPage/SurveyPage";
import SurveyDetails from "../pages/SurveysDetails/SurveyDetails";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import CreateSurvey from "../pages/Dashboard/CreateSeurvey/CreateSurvey";
import ReqSurveys from "../pages/Dashboard/ReqSurveys/ReqSurveys";
import AdminRoute from "./AdminRoute";
import SurveyResponse from "../pages/Dashboard/SurveyResponse/SurveyResponse";
import UsersPayments from "../pages/Dashboard/UserPayments/UsersPayments";
import Payment from "../pages/Dashboard/UserPayment/Payment";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import SurveyorHome from "../pages/Dashboard/SurveyorHome/SurveyorHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import PrivateRoute from "./PrivateRoute";
import ProUserHome from "../pages/Dashboard/ProUserHome/ProUserHome";
import CreatedSurvey from "../pages/Dashboard/MyCreatedSurvey.jsx/CreatedSurvey";




export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signUp",
                element: <SignUp />
            },
            {
                path: "/surveys",
                element: <SurveyPage />
            },
            {
                path: "/surveyDetails",
                element: <SurveyDetails />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // normal user routes
            {
                path: "payment",
                element: <Payment/>
            },
            {
                path: "userHome",
                element: <UserHome/>
            },
            // pro user
            {
                path: "proUserHome",
                element: <ProUserHome/>
            },
            // surveyor routes
            {
                path: "createSurvey",
                element: <CreateSurvey />
            },
            {
                path: "surveyorHome",
                element: <SurveyorHome/>
            },
            {
                path: "mySurvey",
                element: <CreatedSurvey/>
            },
            // admin routes
            {
                path: "adminHome",
                element: <AdminHome/>
            },
            {
                path: "manageUsers",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "reqSurveys",
                element: <AdminRoute><ReqSurveys /></AdminRoute>
            },
            {
                path: "surveyResponse",
                element:<SurveyResponse />
            },
            {
                path: "payments",
                element: <AdminRoute><UsersPayments /></AdminRoute>
            }
        ]
    }
])