import './App.css';
import { firebaseApp, db } from './config/firebase';
import React, { useState, useEffect } from 'react'
import firebase from "firebase/app";
import { Button } from '@material-ui/core';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import ImageUpload from './components/ImageUpload'
import Post from './components/Post'


var provider = new firebase.auth.GoogleAuthProvider();



function App() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

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
                                imageUrl: doc.data().imageUrl,
                                userID: doc.data().userID
                            }
                            
                        );
                    });
                    console.log("Current posts: ", Posts.join(", "));
                    setPosts(Posts);
                    console.log("posts are set");

                });
            console.log('collection received');
        }
    }



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
                console.log("posts " + posts.id)

                :
                <h3>login to post</h3>
            }
            {user ?
                <Button onClick={() => {
                    getCollection();
                    console.log(posts)
                }}>Collection Test</Button>
                :
                <h3>  </h3>}
            {posts ?
                
                posts.map(({id,imageUrl}) =>(
                    <Post key={id} imageUrl = {`${imageUrl}`}/>
                ))
                :
                <h3>no posts loaded</h3>
            }
            {posts[0]?               
                console.log("Post => UserID :   " + `${posts[0].imageUrl}`)
                :
                <h3>no posts loaded</h3>
            }
        </div>

    );
}

export default App;