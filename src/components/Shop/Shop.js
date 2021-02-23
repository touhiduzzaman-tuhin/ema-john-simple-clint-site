import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { Button } from 'react-bootstrap';

const Shop = () => {
    // const firstTen = fakeData.slice(0, 10);
    document.title = 'Shop More';
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect( () => {
        fetch(`https://sheltered-plateau-00354.herokuapp.com/products?search=${search}`)
        .then(response => response.json())
        .then( data => {
            setProducts(data)
            // console.log(data);
            document.getElementById('searchProduct').value = '';
        })
    }, [search])

    const handleAddProduct = (product) => {
        // console.log('Product added');
        // console.log(product);

        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        
        if(sameProduct){
            count = count + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
        // const newCart = [...cart, product];
        // setCart(newCart);

        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count);
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
        // console.log(products, productKeys);
        // if(products.length > 0) {
        //     const previousCart = productKeys.map(key => {
        //         const product = products.find(pd => pd.key === key);
        //         product.quantity = saveCart[key];
        //         // console.log(saveCart[key]);
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
        // console.log(saveCart);
    }, [products])

    const handleSearch = (event) => {
        setSearch(event.target.value);
        // console.log(event.target.value);
    }
    return (
        <div className='main-shop-body'> 
            <div className='search-box'>
                <p>
                    <input autoFocus type="text" onBlur={handleSearch} name="" className="searchProduct" id="searchProduct" placeholder="Search Product"/>
                    &nbsp;&nbsp; 
                    <Button variant='primary'>
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        <span style={{paddingLeft: '10px'}}>Search</span>
                    </Button>
                    &nbsp;&nbsp; <FontAwesomeIcon icon={ faShoppingCart }></FontAwesomeIcon>
                    &nbsp; <span style={{color: 'red'}}>{cart.length}</span>
                </p>
            </div> 

            {
                    products.length === 0 && <p style={{textAlign: 'center'}}>Loading... <LinearProgress />
                    </p>
            }   

            <div className="shop-container">               
                <div className="product-container">                   
                    {
                        products.map(product => <Product addToCartButton = {true} key={product.key} handleAddProduct = {handleAddProduct} product={product}></Product>)
                    }
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <Button variant='outline-success'>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                <span style={{paddingLeft: '10px'}}>Order Review</span>
                            </Button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;