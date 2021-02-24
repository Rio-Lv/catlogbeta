import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

import { gallery } from '../customTools/boxing';
import { BGrmblur } from '../customTools/filters';

import Gallery from 'react-photo-gallery';
import FadeIn from 'react-fade-in';

import firebase from 'firebase';


const photos = [
    {
        src: 'https://i.redd.it/rlwj545720j61.png',
        width: 1,
        height: 1
    },
    {
        src: 'https://wallpaperaccess.com/full/2185929.jpg',
        width: 1,
        height: 1
    },

    {
        src: 'https://i.redd.it/zyozbv445ui61.png',
        width: 1,
        height: 1
    }
]


const { MainBox, InnerBox } = gallery(300, 400);

function PrivateGallery(props) {
    const [user, setUser] = useState(null)
    const [submissions, setSubmissions] = useState([])
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                setUser(user)
            } else {
                // No user is signed in.
            }
        });
    }, [user])

    const sublog = () =>{
        const docRef = db.collection('users').doc(`${user.uid}`)
            docRef.get().then(doc => {
                setSubmissions(doc.data());
                console.log(doc.data().submissions[0].url);

            })
    }
    return (
        <div>
            <MainBox onClick={() => {
                console.log('main box is clicked')
                props.setPrivateGallery(false)
                BGrmblur();
            }}>
                <InnerBox>
                    <FadeIn>
                        <Gallery photos={photos} onClick={sublog} />
                    </FadeIn>
                </InnerBox>
            </MainBox>
        </div>



    )
}

export default PrivateGallery

