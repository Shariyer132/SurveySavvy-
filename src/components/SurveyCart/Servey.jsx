import { useNavigate } from "react-router-dom";

const Servey = ({ item }) => {
    const { title, description, voteYes, voteNo, category } = item;
    const navigate = useNavigate();
    const totalvotes = parseInt(voteYes) + parseInt(voteNo)

    const handleViewDetails = () => {
        navigate("/surveyDetails")
    }
    return (
        <div onClick={handleViewDetails} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <h3>{category}</h3>
                <p>Total Voted: { totalvotes || 0}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Servey;