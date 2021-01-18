import './App.css';
import Login from './components/Login';
//import Logout from './components/Logout';
import {firebase} from './config/firebase';
import React, { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    firebase.auth().onAuthStateChanged((User) => {
        if (User) {
            // User is signed in.
            setUser(User)
        } else {
            // No user is signed in.
            setUser(null)
        }
    });

    return (
        <div className="App" >
            <h1>test functions</h1>
            <button onClick={() => {
                user?
                console.log(user.displayName)
                :
                console.log('no user found')
            }}>who this?
            </button>
            {/* <Logout/> */}

            <Login/>
            

        </div>

    );
}

export default App;

