import './App.css';
import Login from './components/Login';

import { firebase } from './config/firebase';
import React, { useState , useEffect} from 'react';

function App() {
    const [user, setUser] = useState(null);
    var provider = new firebase.auth.GoogleAuthProvider();
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((User) => {
            if (User) {
                // User is signed in.
                console.log('signing in')
                setUser(User.displayName)
            } else {
                // No user is signed in.
                console.log('sign in failed')
            }
        });
    },[user])

    return (
        <div className="App" >
            <h1>test functions</h1>
            <button onClick={() => {
                user ?
                    console.log(user)
                    :
                    console.log('no user found')
            }}>who this?
            </button>
            <button onClick={() => {
                firebase.auth().signInWithRedirect(provider);
                const User = firebase.auth().currentUser;
                setUser(User);
                console.log(User);
            }}>whhooooo</button>
            <Login />

        </div>

    );
}

export default App;

