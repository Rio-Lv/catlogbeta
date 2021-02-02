import './App.css';
import { firebaseApp, db } from './firebase';
import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";

import axios from 'axios';

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
//Submit take week and userID
import Submit from './components/Submit';

var firebaseui = require('firebaseui');

var googleProvider = new firebase.auth.GoogleAuthProvider();
//  const cakedata = axios.get("https://us-central1-catlogbeta2.cloudfunctions.net/cakeTaster");
var facebookProvider = new firebase.auth.FacebookAuthProvider();

var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  autoUpgradeAnonymousUsers: true,
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInFailure: function (error) {
      console.log(error);
      if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
        return Promise.resolve();
      }
      var cred = error.credential;
      return firebase.auth().signInWithCredential(cred);
    }
  }
});

function App() {
  const [user, setUser] = useState(null);

  var printUID = firebase.functions().httpsCallable('uid');
  const googleLogin = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        // ...
      }).catch((error) => {
        console.log(error);
      });
  }
  const facebookLogin = () => {
    firebase.auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        // ...
      }).catch((error) => {
        console.log(error);
      });
  }
  // const loginUI = () => {
  //   setShowLogin(false);
  // };
  const logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('loggin out');
      setUser(null)
    })
  }
  firebase.auth().onAuthStateChanged(response => {
    if (response) {
      setUser(response);
      if (user) {
        console.log(user.uid);
      }
    } else {
      (console.log('auth function no response'))
      setUser(null);
    }
  })

  const checkUser = () => {
    user ?
      console.log(user.uid) : console.log('no user found');
  }

  return (
    <div className="App" >
      <h1>Hello there</h1>
      <button onClick={checkUser}>Check User State</button>
      {user ?
        <div>
          <button onClick={logout}>Logout</button>
          <Submit user={user.uid} week={1} />
        </div>
        :
        <div>
          <button onClick={googleLogin}>Login with Google</button>
          <button onClick={facebookLogin}>Login with Facebook</button>
          {/* <button onClick={loginUI}>Login UI</button> */}
        </div>
      }
      <button onClick={() => {
        printUID().then(response => {
          console.log(response)
        })
      }}>UID</button>
      {user ?
        <h2> </h2>
        :
        <div id="firebaseui-auth-container"></div>
      }
      <div id="firebaseui-auth-container"></div>
    </div>

  );
}

export default App;