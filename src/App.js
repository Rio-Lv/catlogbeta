import './App.css';
import { firebaseConfig, uiConfig } from './config/firebase';
import React, { useState } from 'react'
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseApp = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();


function App() {
    const [user, setUser] = useState(null);

    const login = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // ...
        }).catch((error) => {
            console.log(error)
        });
    }
    const logout = () => {
        firebaseApp.auth().signOut().then(() => {
            console.log('loggin out');
            setUser(null)

        })
    }

    firebaseApp.auth().onAuthStateChanged(response => {
        if (response) {
            setUser(response);
            console.log(response)
        } else {
            (console.log('no response'))
        }

    })


    return (
        <div className="App" >

            {user ?
                <button onClick={() => {
                    logout()
                }}>Logout</button>
                :
                <button onClick={() => {
                    login()
                }}>Login</button>
            }
            {user ?
                <button onClick={() => console.log(user.displayName)}>who this?</button>
                :
                <h3>no user</h3>
            }
        </div>

    );
}

export default App;

