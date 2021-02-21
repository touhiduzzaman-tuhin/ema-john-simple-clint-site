import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const handleRemoveOrder = props.handleRemoveOrder;
    return (
        <div className='review-item product'>
            <h3>{name}</h3>
            <hr/>
            <p className='text-danger'>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <button className='addProductButton' onClick={() => handleRemoveOrder(key)}>Remove Order</button>
        </div>
    );
};

export default ReviewItem;