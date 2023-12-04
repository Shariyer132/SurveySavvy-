import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
// import useAdmin from "../../../hooks/useAdmin";

const UsersPayments = () => {
    // const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
        }
    })
    console.log(payments);


    return (
        <>
            <Helmet>
                <title>DashBoard | Payments History</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Transection Id</th>
                            <th>Price</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, idx) =>{ 
                                const dateTime = new Date(payment.date);
                                const formattedDate = dateTime.toLocaleDateString();
                                return(
                            <tr className="hover" key={payment._id}>
                                <th>{idx + 1}</th>
                                <td>{payment.name}</td>
                                <td>{payment.email}</td>
                                <td>{payment.transactionId}</td>
                                <td>${payment.price}</td>
                                <td>{formattedDate}</td>
                            </tr>)})
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersPayments;