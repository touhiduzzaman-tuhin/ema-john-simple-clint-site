import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log('Form Submitted', data)
    const saveCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, product : saveCart, shipment : data, orderTime : new Date()};
    fetch('https://sheltered-plateau-00354.herokuapp.com/addOrder', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(response => response.json())
    .then(result => {
      if(result){
        processOrder();
        alert('Your order has been added successfully');
      }
    })
  };

  console.log(watch("example")); 

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Please Enter Your Name"/>
      {errors.name && <span className="error">Name is Required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Please Enter Your Email"/>
      {errors.email && <span className="error">Email is Required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Please Enter Your Phone Number"/>
      {errors.phone && <span className="error">Phone Number is Required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Please Enter Your Address"/>
      {errors.address && <span className="error">Address is Required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;