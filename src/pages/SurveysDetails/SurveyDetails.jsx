import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SurveyDetailsCard from "./SurveyDetailsCard";
import { Helmet } from "react-helmet-async";

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
        <>
           <Helmet>
            <title>Survey Savvy | Survey Details</title>
        </Helmet>
            <div className="flex flex-col pt-20  gap-3">
                {
                    surveys.map(survey => <SurveyDetailsCard refetch={refetch} key={survey._id} item={survey} />)
                }
            </div>
        </>
    );
};

export default SurveyDetails;