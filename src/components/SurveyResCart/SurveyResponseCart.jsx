import { PieChart } from "react-minimal-pie-chart";

const SurveyResponseCart = ({ item }) => {
    const { voters, voteYes = 0, voteNo = 0 } = item;

    return (
        <div className="flex flex-col lg:flex-row my-10 gap-20">
            <div className="overflow-x-auto w-2/3 h-[420]">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Voted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            voters?.map((user, idx) => {
                                const dateTime = new Date(user.date);
                                const formattedDate = dateTime.toLocaleDateString();
                                return (
                                    <tr className="hover" key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{user.voterName}</td>
                                        <td>{user.voterEmail}</td>
                                        <td>{formattedDate}</td>
                                        <td>{user.voted}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="w-1/3">
                <PieChart
                    data={[
                        { title: 'Yes', value: voteYes, color: '#E38627' },
                        { title: 'No', value: voteNo, color: '#C13C37' },
                    ]}
                />
            </div>
        </div>
    );
};

export default SurveyResponseCart;