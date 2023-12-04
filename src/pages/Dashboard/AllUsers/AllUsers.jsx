import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const handleDelete = user => {
        console.log(user);
        Swal.fire({
            title: "Are you sure",
            text: "You won't be able to revert this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Success",
                                text: "succesfully deleted the user",
                                icon: "success"
                            })
                            refetch();
                        }
                    })
            }
        })
    }
    const handleRoleChange = (user, role) => {
        console.log(user, role);
        axiosSecure.patch(`/users/role/${user._id}`, { role })
        .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: `user updated to ${role} successfully`,
                    icon: "success",
                });
                refetch();
            }
        })

    }
    return (
        <div>
            <Helmet>
                <title>DashBoard | All Users</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Promote</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr className="hover" key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                   <button className="btn btn-xs" onClick={()=>handleRoleChange(user, 'admin')}> Admin</button>
                                   <span className="px-3">or</span>
                                   <button className="btn btn-xs" onClick={()=>handleRoleChange(user, 'surveyor')}> Surveyor</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-sm hover:bg-red-700 bg-red-700 text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;