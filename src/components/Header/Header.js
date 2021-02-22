import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
                <Button variant='primary' className='mb-1' onClick={() => setLoggedInUser({})}>Sign Out</Button>
            </nav>
        </div>
    );
};

export default Header;