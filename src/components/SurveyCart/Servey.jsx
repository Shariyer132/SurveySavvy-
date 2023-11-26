import { useNavigate } from "react-router-dom";

const Servey = ({ item }) => {
    const { _id,title, description, totalVotes, category, createdAt, likeCount, dislikeCount } = item;
const navigate = useNavigate();

    const handleViewDetails = id =>{
        navigate(`/surveys/${id}`)
    }
    return (
        <div onClick={()=>handleViewDetails(_id)} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <h3>{category}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Servey;