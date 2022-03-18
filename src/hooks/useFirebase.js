import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";
import { useHistory } from "react-router-dom";

initializeAuthentication();

const useFirebase = () => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const auth = getAuth();


    // REGISTER A NEW USER //

    const handleRegistration = (displayName, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                verifyEmail();
                setDisplayName(displayName);
                alert('Please Verify Your Email');
                history.push('/');
            })
            .catch(error => {
                setError(error.message);
            })
    }



    // SIGN IN //

    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                history.push('/add');
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    // EMAIL VERIFICATION //

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then(result => {})
    }

    // PASSWORD RESET //

    const handleResetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    // set USER Display Name

    const setDisplayName = (username) => {
        updateProfile(auth.currentUser, { displayName: username })
            .then(result => { })
            .catch((error) => {
                setError(error.message);
            })
    }

    // log out //

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
        window.location.pathname = '/'
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                setUser(user);
            }
        })
    }, [auth])

    return {
        user,
        error,
        logOut,
        handleRegistration,
        handleSignIn,
        handleResetPassword
    }
}

export default useFirebase;