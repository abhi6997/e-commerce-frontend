import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState,FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useNavigate,useLocation,Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useNewOrderMutation } from '../redux/api/orderApi';
import { responseToast } from '../utils/features';
import { loadStripe } from '@stripe/stripe-js';
import { NewOrderRequest } from '../types/requestTypes';
import { RootState } from '../redux/store';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { shippingInfo, cartItems, subTotal, tax, discount, shippingCharges, total } = useSelector(
        (state: RootState) => state.cartReducer
    );

   
    const [newOrder] = useNewOrderMutation();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const orderData : NewOrderRequest= {
            shippingInfo,
            orderItems: cartItems,
            subTotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id!
        };

        

       
            const { paymentIntent, error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin,
                },
                redirect: 'if_required',
            });

            if (error) {
              setIsProcessing(false)
                return toast.error(error.message || 'Something went wrong');
            } 
            if (paymentIntent?.status === 'succeeded') {
                const res = await newOrder(orderData);
                responseToast(res, navigate, '/orders');
            }
       
    };

    return (
        <div className='checkout-container'>
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button type='submit' disabled={isProcessing}>
                    {isProcessing ? 'Processing' : 'Pay'}
                </button>
            </form>
        </div>
    );
};


const CheckOut = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};
export default CheckOut
