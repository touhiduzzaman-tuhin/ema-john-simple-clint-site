import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { Button } from 'react-bootstrap';

const Review = () => {
    document.title = 'Product Review';
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handlePlaceOrder = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    }

    const handleRemoveOrder = (productKey) => {
        // console.log('some one clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect( () => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('https://sheltered-plateau-00354.herokuapp.com/productsKeys', {
            method: 'POST',
            headers : { 'Content-Type': 'application/json'},
            body : JSON.stringify(productKeys)
        })
        .then(response => response.json())
        .then( data => setCart(data))
        // const cartProducts = productKeys.map(key => {
        //     const products = fakeData.find(pd => pd.key === key);
        //     products.quantity = saveCart[key];
        //     return products;
        //     // console.log(products);
        // });
        // console.log(productKeys);
        // console.log(saveCart);
        // setCart(cartProducts);  
    }, [])
    // console.log(cart);

    let thankYOu;
    if(orderPlaced){
        thankYOu = <img src={happyImage} alt=""/>
    }
    return (
        <div className="text-center">
            <h3>Total Selected Product {cart.length}</h3>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        cart.map(pd => <ReviewItem key={pd.key} handleRemoveOrder = {handleRemoveOrder} product = {pd}></ReviewItem>)
                    }
                    {
                        thankYOu
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link>
                            <Button onClick={handlePlaceOrder}>Prosed Check-Out</Button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;