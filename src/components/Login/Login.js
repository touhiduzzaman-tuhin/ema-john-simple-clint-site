import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleGoogleSignOut, initializeFirebase, SignInWithEmailAndPassword } from './LoginManager';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    document.title = 'Log in';
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        password : '',
        success: ''
    })

    initializeFirebase();

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (event) => {

        let formValid = true;
        if(event.target.name === 'email'){
            formValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        else if(event.target.name === 'password'){
            const passwordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            formValid = passwordValid && passwordHasNumber;
        }

        if(formValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then( res => {
            handleResponse(res, true);
        })
    }

    const googleSignOut = () => {
        handleGoogleSignOut()
        .then( res => {
            handleResponse(res, false);
        })
    }

    const facebookSignIn = () => {
        handleFacebookSignIn()
        .then( res => {
            handleResponse(res, true);
            // setUser(res);
            // setLoggedInUser(res);
            // history.replace(from);
        })
    }

    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }
        else if(!newUser && user.email && user.password){
            SignInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }

        e.preventDefault();
    }

    const handleResponse = (res, isRedirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(isRedirect){
            history.replace(from);
        }
    }

    
    return (
        <div style={{textAlign: 'center'}}>
            {/* <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <img style={{width: '300px'}} src={user.photo} alt=""/> <br/> */}

            {
                user.isSignedIn ? 
                <Button className='mt-3' variant="danger" onClick={googleSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> &nbsp;
                    Sign Out
                </Button> : 
                <Button className='mt-3' variant="outline-success" onClick={googleSignIn}>
                    <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> &nbsp;
                    Google Sign In
                </Button>
            } 
            
            <br/> <br/>
            <Button variant="outline-primary" onClick={facebookSignIn}>
                <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> &nbsp;
                Login Using Facebook
            </Button>
            <br/>
            <br/>

            <h3 style={{fontFamily : 'Roboto'}}>Login Form With Authentication</h3>

            {/* <p>Email : {user.email}</p>
            <p>Password : {user.password}</p>
            <p>Name : {user.name}</p> */}

            <div className="create-login-form">
                <input type="checkbox" name="userName" id="" onChange={ () => setNewUser(!newUser)}/> &nbsp;
                <label htmlFor="userName">New User</label>
                <form onSubmit={handleSubmit}>

                    {
                        newUser && <input type="text" name="name" id="" onBlur={handleBlur} placeholder='Enter Your Name' required/>
                    }

                    <br/> <br/>
                    <input type="email" name="email" id="" onBlur={handleBlur} placeholder="Enter your email" required/> <br/> <br/>
                    <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Enter your password" required/> <br/> <br/>
                    <input className='sign-button' type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
                </form>
            </div>

            {
                user.success ? <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Login'} Successfully!</p> : <p style={{color: 'red'}}> {user.error} </p>
            }
        </div>
    );
};

export default Login;