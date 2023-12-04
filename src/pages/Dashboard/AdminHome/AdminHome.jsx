import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
    const {user} = useAuth()
    console.log(user);
    return (
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
            <div>
                <h2 className="text-3xl">
                    <span>Hi, Welcome </span>
                    {
                        user?.displayName? user?.displayName : 'Back'
                    }
                </h2>
            </div>
        </>
    );
};

export default AdminHome;