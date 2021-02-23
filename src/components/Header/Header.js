import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header" style={{fontFamily: 'Roboto'}}>
            <img src={logo} alt=""/>
            <nav align='left'>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
                <Button variant='danger' className='mb-1' onClick={() => setLoggedInUser({})}>
                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                    Sign Out
                </Button>
                <Link className='name-style'>{loggedInUser.name}</Link>
            </nav>
        </div>
    );
};

export default Header;