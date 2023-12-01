import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SurveyDetailsCard from "./SurveyDetailsCard";
    
    const SurveyDetails = () => {
        const axiosPublic = useAxiosPublic();

    const { data: surveys = [], refetch } = useQuery({
                queryKey: ['surveys'],
                queryFn: async () => {
                    const res = await axiosPublic.get('/surveys');
                    return res.data;
                }
            })

    return (
        <div className="flex flex-col pt-20  gap-3">
            {
                surveys.map(survey=><SurveyDetailsCard refetch={refetch} key={survey._id} item={survey}/>)
            }
        </div>
    );
};

export default SurveyDetails;