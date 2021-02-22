import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';
import happyImage from '../../images/giphy.gif';

const Shipment = () => {
  document.title = 'Shipment';
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log('Form Submitted', data)
    setShippingData(data);
  };

  const handlePaymentOrder = paymentId => {
    setOrderPlaced(true);
    const saveCart = getDatabaseCart();
    const orderDetails = { 
      ...loggedInUser, 
      product: saveCart, 
      shipment: shippingData, 
      paymentId,
      orderTime: new Date() 
    };

    fetch('https://sheltered-plateau-00354.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          processOrder();
          alert('Your order has been added successfully');
        }
      })
  }

  console.log(watch("example"));

  let thankYou;
  if(orderPlaced){
    thankYou = <img src={happyImage} alt=""/>
  }

  return (
    <div className="">
      <div style={{display: shippingData ? 'none' : 'block'}}>
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Please Enter Your Name" />
          {errors.name && <span className="error">Name is Required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Please Enter Your Email" />
          {errors.email && <span className="error">Email is Required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="Please Enter Your Phone Number" />
          {errors.phone && <span className="error">Phone Number is Required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Please Enter Your Address" />
          {errors.address && <span className="error">Address is Required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}}>
        <h2 align="center" className='my-2'>Please Prosed Your Payment</h2>
        <ProcessPayment handlePayment={handlePaymentOrder}></ProcessPayment>
      </div>

      <div className="thankYou-style">
        {
          thankYou
        }
      </div>
    </div>
  );
};

export default Shipment;