import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const OrderDetails = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState([]);

    useEffect( () => {
        fetch('http://localhost:5000/orders?email='+loggedInUser.email, {
            method: 'GET',
            headers : { 
                'Content-Type': 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setOrder(data);
        })
    }, [])

    console.log(order);

    return (
        <div>
            <h3>Your Total Placed Order : {order.length}</h3>
        </div>
    );
};

export default OrderDetails;