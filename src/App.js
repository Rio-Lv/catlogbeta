import './App.css';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { auth } from './firebase';

import PublicFront from './components/PublicFront';
import PrivateFront from './components/PrivateFront';

import { BGrmblur } from './customTools/filters'
import { infobar } from './customTools/boxing'

// const imageURL = 'https://external-preview.redd.it/wOFEGkV9XT35-ZYsXchKx6GCnOOnyW0R5dSbjH0nYyM.jpg?auto=webp&s=db2b4d5223acfd4da79d380dc8efbfac07841190';

// portrait
// const imageURL = 'https://external-preview.redd.it/k6QWffSVVBfS_6IFsJdMWP4jvHjQEx4vMsk1IzZMUXs.jpg?auto=webp&s=5a61fcb3ce6fc50fdcb48fa88e64a6d93b4bf4cc';

//skull

const imageURL = 'https://images.wallpaperscraft.com/image/skull_space_suit_art_121221_2000x2000.jpg';


const { TopBar, BotBar } = infobar();

function App() {
  // const [publicGallery, setPublicGallery] = useState(false);
  const [user, setUser] = useState(null);
  const [square, setSquare] = useState(true);

  useEffect(() => {
    // check auth state changed
    auth.onAuthStateChanged(response => {
      if (response) {
        setUser(response);
        if (user) {
          console.log(user.uid);
          BGrmblur();
        }
      } else {
        (console.log('auth function no response'))
        setUser(null);
      }
    })
  }, [user])


  const changeSquare = () => {
    const imagestyle = document.getElementById("bgImage").style;
    const width = window.innerWidth;
    const height = window.innerHeight;
    imagestyle.transition = '1s ease';
    if (square === true) {
      setSquare(false);
      imagestyle.height = `${width}px`;
      imagestyle.width = `${width}px`;
      imagestyle.border = `2px solid tranparent`;
    };

    if (square === false) {
      setSquare(true);
      // imagestyle.border = `2px dotted #ffae00`;
      imagestyle.width = `${height - 8}px`;
      imagestyle.height = `${height - 8}px`;
    }
  }


  return (
    <div className="App" >
      <header className="App-header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </header>

      <img
        className="image"
        id="bgImage"
        src={imageURL}
        alt=""
        onClick={() => {
          changeSquare();
          console.log('bgImage clicked');
        }}
      />
      {/* <TopBar>adsfhasekjf</TopBar> */}
      {/* <BotBar>congratulations</BotBar> */}

      {user ?
        <PrivateFront />
        :
        <PublicFront user={user} />
      }

    </div>
  );
}

export default App;
