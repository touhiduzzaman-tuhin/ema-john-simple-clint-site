import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFirebase = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// Google Sign In

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                error: '',
                success: true
            }
            storeAuthToken();
            return signInUser;
        })
        .catch(error => {
            console.log(error.message);
        })
}

// Google Sign Out

export const handleGoogleSignOut = () => {
    return firebase.auth().signOut()
        .then(result => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: ''
            }
            return signOutUser;
        })
        .catch(error => {
            console.log(error.message);
        })
}

// FaceBook Sign In

export const handleFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(facebookProvider)
        .then(result => {
            console.log(result);
            const { displayName, email, photoURL } = result.user;
            const facebookUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                error: '',
                success: true
            }
            return facebookUser;
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            const newUserInfo = result.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

export const SignInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            const newUserInfo = result.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}


const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(result => {

        })
        .catch(error => {

        });
}

// Store Auth Token

const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        // Send token to your backend via HTTPS
        // ...
    }).catch(function (error) {
        // Handle error
    });
}