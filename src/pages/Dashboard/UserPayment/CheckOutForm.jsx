import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isProUser] = useUserRole("pro-user");
    const navigate = useNavigate();
    console.log(isProUser);

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const reqUser = users.find(mongoUser => mongoUser?.email === user?.email);
    console.log(reqUser);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: 50 })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure,])

    useEffect(() => {
        axiosSecure('/users')
            .then(res => {
                console.log(res.data);
            })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message)
        }
        if (reqUser.role === 'admin' || reqUser.role === 'surveyor') {
            return (
                Swal.fire({
                    icon: "error",
                    text: `you are a ${reqUser.role}`
                })
            )
        }
        if (reqUser.role === 'pro-user') {
            return (
                Swal.fire({
                    icon: "error",
                    text: `you are already ${reqUser.role}`
                })
            )
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                // user role update
                if (reqUser.role === 'user') {
                    axiosSecure.patch(`/users/role/${reqUser._id}`, { role: "pro-user" })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Sucess",
                                    text: "You have become a Pro-user",
                                    icon: "success"
                                });
                            }
                        })
                }
                //  saved user payment in database
                const payment = {
                    email: user?.email,
                    price: 50,
                    date: new Date(),
                    name: user?.displayName,
                    transactionId: paymentIntent?.id
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment success', res.data);
                navigate('/surveys')
            }
        }
    }

    return (
        <>
     
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: "#423770",
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146'
                            }
                        }
                    }}
                />

                <button className="btn btn-sm btn-info my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
            </form>
        </>
    );
};

export default CheckOutForm;