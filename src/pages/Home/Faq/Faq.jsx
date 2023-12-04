import { useEffect, useState } from "react";
import img  from '../../../assets/download__1_-removebg-preview.png';
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/faqs')
            .then(res => {
                setFaqs(res.data)
            })
    }, [])
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="w-2/3">
                    <h2 className="text-6xl font-bold pb-4">FAQs</h2>
                    <p>Have questions? Here you will find the answers most valued by our partners, along with access to step-by-step instructions and support.</p>
                </div>
                <img src={img} alt="" className="md:w-full" />
            </div>
            <div className="mb-10">
                {
                    faqs.map(faq => <div key={faq.id} className="collapse collapse-arrow bg-base-200 mb-2">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content">
                            <p>{faq.answer}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Faq;