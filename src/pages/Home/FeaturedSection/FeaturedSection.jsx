import axios from "axios";
import { useEffect, useState } from "react";
import Servey from "../../../components/SurveyCart/Servey";


const FeaturedSection = () => {
    const [survey, setServey] = useState([]);

    useEffect(()=>{
        axios('Surveys.json')
        .then(res=>{
            setServey(res.data);
        })
    },[])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {
                survey.map((item,idx)=><Servey key={idx} item={item}></Servey>)
            }
        </div>
    );
};

export default FeaturedSection;