import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const total = cart.reduce( (total, product) => total + product.price ,0);

    let total = 0;
    let shippingCost = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price *( element.quantity || 1);
        shippingCost = shippingCost + element.shipping;
    }

    const subTotal = total + shippingCost;
    const tax = subTotal * .10;
    const totalPrice = subTotal + tax;
    // console.log(total, shippingCost, subTotal, tax);

    function formatAmount(num) {
        const amount = num.toFixed(2);
        return Number(amount);
    }
    return (
        <div className='cart-style'>
            <h3>Order Summary</h3>
            <h3>Items Order - {cart.length}</h3>
            <hr/>
            <p>Product Price : ${formatAmount(total)}</p>
            <p>Shipping Cost : ${formatAmount(shippingCost)}</p>
            <p>Tax + VAT : ${formatAmount(tax)}</p>
            <h2>Total Price : ${formatAmount(totalPrice)}</h2>
            {
                props.children
            }
        </div>
    );
};

export default Cart;