import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import SurveyResponseCart from '../../../components/SurveyResCart/SurveyResponseCart';

const SurveyResponse = () => {
    const [cart] = useCart();

    return (
        <>
            <Helmet>
                <title>DashBoard | Survey Response</title>
            </Helmet>
            <div>
                {
                    cart.map((item)=> <SurveyResponseCart key={item._id} item={item}></SurveyResponseCart>)
                }
            </div>
        </>
    );
};

export default SurveyResponse;