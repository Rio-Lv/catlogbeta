import React from 'react'

import { firebase, auth } from '../config/firebase';
var firebaseui = require('firebaseui');

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(auth);

function Login() {

    ui.start('#firebaseui-auth-container', {
        autoUpgradeAnonymousUsers: true,
        signInOptions: [
            // List of OAuth providers supported.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // signInFailure callback must be provided to handle merge conflicts which
            // occur when an existing credential is linked to an anonymous user.
            signInFailure: function(error) {
              // For merge conflicts, the error.code will be
              // 'firebaseui/anonymous-upgrade-merge-conflict'.
              if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
              }
              // The credential the user tried to sign in with.
              var cred = error.credential;
              // Copy data from anonymous user to permanent user and delete anonymous
              // user.
              // ...
              // Finish sign-in after data is copied.
              return firebase.auth().signInWithCredential(cred);
            }
          }
    });



    return (
        <div>
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}

export default Login
