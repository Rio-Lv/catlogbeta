import React from 'react'
import { firebase, auth } from '../config/firebase';

var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(auth);

function Login() {

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
    });
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}

export default Login
