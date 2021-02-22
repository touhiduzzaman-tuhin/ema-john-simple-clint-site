import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
const ProductDetails = () => {
    document.title = 'Product Details';
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const category = true;
    const features = true;
    // console.log(productKey);
    useEffect( () => {
        fetch('https://sheltered-plateau-00354.herokuapp.com/product/'+productKey)
        .then(response => response.json())
        .then( data => {
            setProduct(data);
            setLoading(false);
            console.log(data);
        })
    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    return (
        <div>
            <h3 className="text-center">Selected Product Details</h3>
            {
                loading ?
                <p style={{textAlign: 'center'}}>Loading... <CircularProgress />
                </p> :
                <Product category={category} features={features} addToCartButton = {false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;