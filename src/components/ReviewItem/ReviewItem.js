import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, shipping, key, price} = props.product;
    const handleRemoveOrder = props.handleRemoveOrder;
    return (
        <div className='review-item product'>
            <h3>{name}</h3>
            <hr/>
            <p className='text-danger'>Shipping: ${shipping}</p>
            <p><small>Price: ${price}</small></p>
            <Button className='mb-2' variant='warning' onClick={() => handleRemoveOrder(key)}>
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                <span style={{paddingLeft: '5px'}}>Remove Order</span>
            </Button>
        </div>
    );
};

export default ReviewItem;