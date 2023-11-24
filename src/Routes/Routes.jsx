import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";



export const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<ErrorPage/>,
        element:<Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
])