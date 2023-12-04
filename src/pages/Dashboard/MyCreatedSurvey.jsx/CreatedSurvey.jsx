import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const CreatedSurvey = () => {
    const {user} = useAuth();
    const [cart] = useCart();

    const myCreatedSurveys = cart.filter(survey=>survey.creatorEmail === user.email)
    console.log(myCreatedSurveys);
    return (
        <table className="table">
        {/* head */}
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Email</th>
                <th>Role</th>
                <th>Promote</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {
                myCreatedSurveys.map((user, idx) => <tr className="hover" key={user._id}>
                    <th>{idx + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  
                </tr>)
            }
        </tbody>
    </table>
    );
};

export default CreatedSurvey;