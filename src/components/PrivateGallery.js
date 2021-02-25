import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

import { gallery } from '../customTools/boxing';
import { BGrmblur } from '../customTools/filters';

import Gallery from 'react-photo-gallery';
import FadeIn from 'react-fade-in';

import firebase from 'firebase';

const { MainBox, InnerBox } = gallery(300, 400);

function PrivateGallery(props) {
    const [user, setUser] = useState(null)
    const [submissions, setSubmissions] = useState([])
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user !== null) {
                // User is signed in.
                console.log(user.uid)
                setUser(user);
                console.log(user.uid)
                const docRef = db.collection('users').doc(`${user.uid}`)

                docRef.onSnapshot(doc => {
                    setSubmissions(doc.data());
                    console.log('this coming from private gallery');

                    const subArray = doc.data().submissions;
                    subArray.forEach(element => {
                        console.log('array element ===>')
                        console.log(element);
                    });
                    console.log(doc.data().submissions[0].url);



                    docRef.get().then(doc => {
                        const photo = {
                            src: `${doc.data().submissions[0].url}`,
                            width: 1,
                            height: 1,
                        }
                        setPhotos([...photos, photo]);
                        console.log('photos')
                        console.log(photos);
                    })

                })
            } else {
                // No user is signed in.
            }
        });
    }, [])

    const sublog = (User) => {

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
                        <Gallery photos={photos} />
                    </FadeIn>
                </InnerBox>
            </MainBox>
        </div>



    )
}

export default PrivateGallery

