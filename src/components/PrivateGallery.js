import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

import { gallery } from '../customTools/boxing';
import { BGrmblur } from '../customTools/filters';

import Gallery from 'react-photo-gallery';
import FadeIn from 'react-fade-in';

import firebase from 'firebase';

const { MainBox, InnerBox } = gallery(300, 400);

function PrivateGallery(props) {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user !== null) {
                // User is signed in.
                console.log(user.uid)
                const docRef = db.collection('users').doc(`${user.uid}`)

                docRef.onSnapshot(doc => {
                    console.log('this coming from private gallery');
                    try {
                        const subArray = doc.data().submissions;
                        const photoArray = []
                        subArray.forEach(element => {
                            console.log('array element ===>' + element.url)
                            const photo = {
                                src: `${element.url}`,
                                width: 1,
                                height: 1,
                            }
                            photoArray.push(photo);
                            console.log('these are the useState Photos ' + photos)
                        });
                        setPhotos(photoArray)
                        console.log(photoArray);
                    } catch (err) {
                        console.log(err)
                    }
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

