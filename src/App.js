import './App.css';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { auth } from './firebase';

import PublicFront from './components/PublicFront';
import PrivateFront from './components/PrivateFront';
import Login from './components/Login';


function App() {
  const [publicFront, setPublicFront] = useState(true);
  const [privateFront, setPrivateFront] = useState(false);

  // const [publicGallery, setPublicGallery] = useState(false);

  const [user, setUser] = useState(null);
  const [loginUI, setLoginUI] = useState(false);

  useEffect(() => {
    // check auth state changed
    auth.onAuthStateChanged(response => {
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
  }, [user])
  function publicfrontOpen() { setPublicFront(true) };
  function publicfrontClose() { setPublicFront(false) };

  return (
    <div className="App">

      <header className="App-header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </header>
      
      {user ?
      <PrivateFront />
      :
      <PublicFront publicfrontClose={publicfrontClose} user={user}/>
    }


      
      <button
        onClick={publicfrontClose}
        style={{ left: '100px', top: '100px' }}
      >Close</button>
      <button
        onClick={publicfrontOpen}
        style={{ left: '50px', top: '100px' }}
      >Open</button>

    </div>
  );
}

export default App;
