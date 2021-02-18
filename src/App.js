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
  const [page,setPage] = useState('');

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

  useEffect(()=>{

  },[page])

  return (
    <div className="App">
      <head>

      </head>

      <img className="image" src="https://www.teahub.io/photos/full/281-2819479_wallpaper-skull-space-suit-art-astronaut-surreal-skeleton.jpg" alt="" />
      {user ?
        <PrivateFront />
        :
        <PublicFront user={user}/>
      }

    </div>
  );
}

export default App;
