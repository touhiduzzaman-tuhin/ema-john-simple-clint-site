import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51INgGREBnHfC3bJaMPM4wA8wh6qoGGYBx9nGGjQmaTcXWxAqtlyA8a6EFU1sAe21qJkZSLK5p0uZdGiJgbIbRJG700gk2WV5Md');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            {/* <SplitCardForm></SplitCardForm> */}
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;