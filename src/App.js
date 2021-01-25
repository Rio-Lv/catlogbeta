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

import countDown from './functions/time';

var provider = new firebase.auth.GoogleAuthProvider();

function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const counter = 0;
    const [time, setTime] = useState({ day: 0, hour: 0, minute: 0, seconds: 0 })
    const [deadline, setDeadline] = useState(0);
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
            //console.log(response)
        } else {
            (console.log('auth function no response'))
        }
    })
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


    useEffect(() => {
        const week = 1000*60*60*24*7;
        db.collection("Challenge").where("deadline", "!=", 0)
            .get()
            .then(function (querySnapshot) {
                
                querySnapshot.forEach(function (doc) {    
                    // doc.data() is never undefined for query doc snapshots
                    
                    if(doc.data().deadline>Date.now() && doc.data().deadline<Date.now()+week){
                        console.log('eyy')
                        setDeadline(doc.data().deadline)
                    }

                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }, [])


    useEffect(() => {
        const interval = setInterval(() => {

            setTime({
                day: countDown(counter).day,
                hour: countDown(counter).hour,
                minute: countDown(counter).minute,
                seconds: countDown(counter).seconds
            })
        }, 1000);
        return () => clearInterval(interval);
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
            {user ?
                <Button onClick={() => {
                    getCollection();
                    console.log(posts)
                }}>Get Collection</Button>
                :
                <h3>  </h3>}
            <h1>Time remaining:  Days,{time.day}, Hours:{time.hour} minutes:{time.minute} seconds:{time.seconds}</h1>

            <Button onClick={() => {
                const deadline = new Date(2021, 0, 26);
                const week = 1000 * 60 * 60 * 24 * 7;
                var i;
                for (i = 0; i < 5; i++) {
                    db.collection("Challenge").add({ deadline: deadline.getTime() + i * week })
                }


                console.log(countDown(deadline.getTime()))
            }}>Time Update</Button>

            <Button onClick={() => {
                console.log(deadline)
            }}>deadline log</Button>

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