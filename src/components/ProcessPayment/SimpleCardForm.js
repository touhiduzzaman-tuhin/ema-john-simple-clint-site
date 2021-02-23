import React, { useState } from 'react';
// import {useElements, useStripe} from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SimpleCardForm = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
      console.log('[error]', error);
    } else {
      setPaymentSuccess(paymentMethod.id);
      setPaymentError(null);
      handlePayment(paymentMethod.id);
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <p align="center">
          <Button className='mt-4' type="submit" disabled={!stripe}>
            <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
            <span style={{paddingLeft: '10px'}}>Pay Now</span>
          </Button>
        </p>
      </form>

      {
        paymentError && <p align="center" style={{color: 'red'}}>{paymentError}</p>
      }
      {
        paymentSuccess && <p align='center' style={{color: 'green'}}>Your Payment Successfully Prosed</p>
      }
    </div>
  );
};

export default SimpleCardForm;