import React from 'react';
import { Button } from 'react-bootstrap';
import fakeData from '../../fakeData';
import './Inventory.css';

const Inventory = () => {
    const handleAddProduct = () => {
        fetch('https://sheltered-plateau-00354.herokuapp.com/addProduct', {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(fakeData[0])
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                alert('Your Product Added Successfully in Database');
            }
        })
    }
    return (
        <div className="text-center addProduct-style">
            <form action="/addProduct" method="post">
                <p><span>Name :</span><input autoFocus type="text"/></p>
                <p><span>Price : </span><input type="text"/></p>
                <p><span>Quantity : </span><input type="text"/></p>
                <p><span>Product Image :</span><input type="file"/></p>
                <Button onClick={handleAddProduct}>Add Product</Button>
            </form>
        </div>
    );
};

export default Inventory;