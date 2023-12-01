import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env. VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
            <div className="text-center py-10 mt-10">
                <h2 className="text-5xl py-5 text-orange-400 font-bold">Payment Here</h2>
                <hr className="border-2 border-orange-400 mb-5 max-w-xs mx-auto" />
                <p>Pay and become a pro-user and participate in our all feature</p>
            </div>
            <div>
                <h2  className="text-green-600 pb-6">Need $50 to become a pro-user</h2>
                <Elements stripe={stripePromise}> 
                <CheckOutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;