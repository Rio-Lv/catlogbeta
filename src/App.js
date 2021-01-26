import './App.css';
import { firebaseApp, db } from './config/firebase';
import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import { Button } from '@material-ui/core';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import ImageUpload from './components/ImageUpload';
import Post from './components/Post';
import CountDown from './components/CountDown';

var provider = new firebase.auth.GoogleAuthProvider();
const week = 1000 * 60 * 60 * 24 * 7;
const schedule = db.collection("schedule").doc("1swrNVoYEanKzT9tUVPq");



function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const [now, setNow] = useState(Date.now())
    const [deadline, setDeadline] = useState(0);
    const login = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                // ...
            }).catch((error) => {
                console.log(error);
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
            //console.log(response)
        } else {
            (console.log('auth function no response'))
        }
    })
    // getting collection, this should be put into a use effect
    const getCollection = () => {
        if (user) {
            console.log('getting collection');
            db.collection("posts").where("userID", "==", `${user.uid}`)
                .onSnapshot(function (querySnapshot) {
                    var Posts = [];
                    querySnapshot.forEach(function (doc) {
                        Posts.push(
                            {
                                id: doc.id,
                                imageUrl: doc.data().imageUrl,
                                userID: doc.data().userID,
                                points: doc.data().points
                            }
                        );
                    });
                    if (Posts[0] != null) {
                        setPosts(Posts);
                        console.log("posts are set");
                    }
                });
            console.log('collection received');
        }
    }
    // setting deadline to correct doc from firebase
    useEffect(() => {
        schedule.get().then(doc => {
            console.log(doc.data().schedule);
            doc.data().schedule.forEach((item) => {
                if(item.deadline>=Date.now() && item.deadline<Date.now()+week)
                console.log(typeof(item.deadline));
                setDeadline(item.deadline);
            })
        })
    }, [])

    // loop for updating the timer that is displayed , countdown function takes a end date and creates a countdown
    useEffect(() => {
        setInterval(() => {
            setNow(Date.now())
        }, 1000);
    }, []);

    return (
        <div className="App" >
            {user ?
                <Button onClick={() => {
                    logout()
                }}>Logout</Button>
                :
                <button onClick={() => {
                    login()
                }}>Login</button>
            }
            {user ?
                <Button onClick={() => console.log(user.uid)}>who this?</Button>
                :
                <h3>no user</h3>
            }

            <Button onClick={() => {
                console.log(user.email);
                console.log(posts)
            }}>Test</Button>
            {user ?
                <ImageUpload
                    username={user.displayName}
                    userID={user.uid}
                />
                :
                <h3>Login for imageupload</h3>
            }
            {/* gets posts from database, this should be done with useeffect */}
            {user ?
                <Button onClick={() => {
                    getCollection();
                    console.log(posts)
                }}>Get Collection</Button>
                :
                <h3>  </h3>}
           

            {/* This button creates the days of challenges on the data base, too be removed for production */}
            <Button onClick={() => {
                const startdate = new Date(2021, 0, 26); 
                const schedule = [];
                var i;
                for (i = 0; i < 10; i++) {
                    schedule.push({ deadline: startdate.getTime() + i * week })
                };
                db.collection("schedule").add({schedule});
            }}>create schedule</Button>

            <CountDown  deadline={deadline} now={now}/>
            {/* {here the table begins ==========================================} */}
            {posts ?
                posts.map(({ id, imageUrl, points }) => (
                    <div>
                        <Post key={id} imageUrl={`${imageUrl}`} points={points} id={id} />
                    </div>
                ))
                :
                <h3>no posts loaded</h3>
            }
            {/* {here the tabe ends ==============================================} */}

        </div>

    );
}

export default App;