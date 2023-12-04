import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ReqSurveys = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveys');
            return res.data;
        }
    });

    const handleUnpublish = user => {
        Swal.fire({
            title: "Provide Feedback",
            text: "Please provide a reason for unpublishing the survey:",
            input: "textarea",
            inputAttributes: {
                autocapitalize: "off"
            },
            inputPlaceholder: "Enter your feedback here...",
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (feedback) => {
                if (!feedback) {
                    return Swal.showValidationMessage("Feedback is required to proceed.");
                }
               if (feedback) {
                axiosSecure.patch(`/surveys/${user._id}`, { ...user, status: 'Unpublished', feedback })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Sucess",
                            text: "Survey unPublished successfully ",
                            icon: "success"
                        });
                        refetch();
                    }
                })
               }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    const handlePublish = user => {
        console.log(user);
        axiosSecure.patch(`/surveys/${user._id}`, { ...user, status: 'Published' })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Sucess",
                        text: "Survey published successfully ",
                        icon: "success"
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <Helmet>
                <title>DashBoard | Requested Survey</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Survey Title</th>
                            <th>Creator Email</th>
                            <th>Creating Date</th>
                            <th>Creating Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => {
                                const dateTime = new Date(user.createdAt);
                                const formattedDate = dateTime.toLocaleDateString();
                                const formattedTime = dateTime.toLocaleTimeString();
                                return (
                                    <tr className="hover" key={user._id}>
                                        <th>{idx + 1}</th>
                                        <td>{user.category}</td>
                                        <td>{user.creatorEmail}</td>
                                        <td>{formattedDate}</td>
                                        <td>{formattedTime}</td>
                                        <td>
                                            {
                                                user.status === "Pending" && <>
                                                    <button className="btn btn-xs" onClick={() => { handlePublish(user) }} >Publish</button>
                                                    <span className="px-3">or</span>
                                                    <button className="btn btn-xs" onClick={() => { handleUnpublish(user) }} >Unpublish</button>
                                                </>
                                                ||
                                                user.status === "Published" && <span className="text-green-500">Published</span>
                                                ||
                                                user.status === "Unpublished" && <span className="text-red-400">Canceled</span>
                                            }
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReqSurveys;