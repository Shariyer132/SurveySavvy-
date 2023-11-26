import { useParams } from "react-router-dom";

const SurveyDetails = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            
        </div>
    );
};

export default SurveyDetails;