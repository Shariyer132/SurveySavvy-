import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SurveyDetails = () => {
    const { id } = useParams();
    const { data: surveys = [] } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await useAxiosPublic.get('http://localhost:5000/surveys');
            return res.data;
        }
    })

    const specificSurvey = surveys.find(item => item._id === id);
    const { category } = specificSurvey;
    console.log(specificSurvey);

    return (
        <div>
            <h3>{category}</h3>
        </div>
    );
};

export default SurveyDetails;