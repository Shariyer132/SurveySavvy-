import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import SurveyPage from "../pages/SurveyPage/SurveyPage";
import SurveyDetails from "../pages/SurveysDetails/SurveyDetails";



export const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<ErrorPage/>,
        element:<Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signUp",
                element: <SignUp/>
            },
            {
                path: "/surveys",
                element: <SurveyPage/>
            },
            {
                path: "/surveys/:id",
                element: <SurveyDetails/>
            }
        ]
    }
])