import axios from "axios";
import { useEffect, useState } from "react";
import Servey from "../../components/SurveyCart/Servey";
import useCart from "../../hooks/useCart";

const SurveyPage = () => {
    const [surveys, setServeys] = useState([]);
    const carts = useCart();
    console.log(carts);
    useEffect(() => {
        axios('http://localhost:5000/surveys')
            .then(res => {
                setServeys(res.data)
            })
    }, [])
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-6 py-20 mx-auto">
                {
                    surveys.map((item, idx) => <Servey item={item} key={idx}></Servey>)
                }
            </div>
        </>
    );
};

export default SurveyPage;