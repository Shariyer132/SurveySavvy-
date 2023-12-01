import { useEffect, useState } from "react";
import Servey from "../../../components/SurveyCart/Servey";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const FeaturedSection = () => {
    const [survey, setServey] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(()=>{
        axiosPublic.get('/surveys')
        .then(res=>{
            setServey(res.data);
        })
    },[])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {
                survey.slice(0, 6).map((item,idx)=><Servey key={idx} item={item}></Servey>)
            }
        </div>
    );
};

export default FeaturedSection;