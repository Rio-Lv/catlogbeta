import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';


// using for resizing to 1:1 ratio
import convert from 'image-file-resize';

import { dropZone } from '../../customTools/boxing';
import { BGrmblur, BGblur } from '../../customTools/filters';

import { db, storage, auth } from '../../firebase.js'

import FadeIn from 'react-fade-in'

const { Box, Zone, Tab, DarkTab, ZoneDiv, ZoneDiv2, Butt } = dropZone(400, 30);

const week = 5;
const { t1, t2, t3 } = { t1: 'Blocky', t2: 'Chonky', t3: 'Cat' };


const Title = `${t1} ${t2} ${t3}`;
const title = `${t1}-${t2}-${t3}`

function Drop(props) {
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(null);
    const [locURL, setLocUrl] = useState('');
    const zone = true;

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

    // function that run on image drop, converts the image to square ratio
    const onDrop = useCallback(files => {
        var _URL = window.URL || window.webkitURL;
        if (files[0]) {
            console.log("drop input:====>")
            console.log(files[0])
            convert({
                file: files[0],
                width: 1000,
                height: 1000,
                type: 'jpeg'
            }).then(resp => {
                setImage(resp)
                var image = new Image();

                image.src = _URL.createObjectURL(resp);

                setLocUrl(`${image.src}`)

                image.onload = function () {
                    console.log(this.width + " " + this.height + " this was created in the image converter");
                    //alert(props.week)
                };
                image.onerror = function () {
                    alert("not a valid file: " + resp.type);
                };
            }).catch(error => { console.log(error) })
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const handleUpload = () => {
        const storage_path = `/${user.uid}/week${week}`;
        if (image !== null) {
            console.log(user.uid);

            storage.ref(storage_path).delete().then(() => {
                // File deleted successfully
                console.log('successfully deleted, ready for replacement')
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error)
            });

            storage.ref(storage_path).put(image).then(() => {
                console.log('image sent to storage');

                storage
                    .ref(storage_path)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)


                        const docRef = db.collection('users').doc(`${user.uid}`);
                        docRef.get().then(doc => {
                            console.log(doc.data());
                            const submission = {
                                week: week,
                                title: title,
                                url: url,
                                user: user.uid
                            }
                            try {
                                const submissions = doc.data().submissions
                                const newSubmissions = [...submissions, submission]
                                console.log('submissions have been set');
                                console.log(newSubmissions);
                                docRef.set({
                                    week: `week${week}`,
                                    uid: user.uid,
                                    submissions: newSubmissions,
                                });
                            } catch {
                                console.log('fuck, no submission detected')
                            }
                            // this ia an array
                        })
                        console.log('image has been sent')
                        setImage(null);
                    }).catch((error) => {
                        // Uh-oh, an error occurred!
                        console.log(error)
                    });
            }).catch(err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('succeesss')
                }

            });
        } else {
            alert('no image loaded')
        }
    }

    return (
        <div>
            {zone ?
                <div>
                    {image ?
                        <Box>
                            <DarkTab>{Title}</DarkTab>
                            <Zone
                                style={{ backgroundImage: image ? `url(${locURL})` : 'none' }}
                                {...getRootProps({ refKey: 'innerRef' })}
                            >
                                <ZoneDiv>
                                </ZoneDiv>
                                <input {...getInputProps()} />
                            </Zone>
                            <Butt onClick={() => {
                                handleUpload();
                                BGrmblur();
                                props.close();
                            }}>Submit</Butt>
                        </Box>
                        :
                        <Box>
                            <FadeIn>
                                <Tab>This weeks Title: Blocky Chonky Cat</Tab>
                                <Zone
                                    style={{ backgroundImage: image ? `url(${locURL})` : 'none' }}
                                    {...getRootProps({ refKey: 'innerRef' })}
                                >
                                    <ZoneDiv>
                                        <p1>Drag and Drop an Image</p1>
                                        <br />
                                        <p1>or</p1>
                                        <br />
                                        <p1>Click to open file explorer</p1>
                                    </ZoneDiv>
                                    <ZoneDiv2>
                                        <p1>Images greater than 2000 x 2000 will be resized to 2000 x 2000</p1>
                                        <br />
                                        <p1></p1>
                                        <br />
                                        <p1>Images smaller than 2000 x 2000 will be rejected</p1>
                                    </ZoneDiv2>

                                    <input {...getInputProps()} />
                                </Zone>
                                <Tab>Submit a 2000 x 2000 Image</Tab>
                            </FadeIn>

                        </Box>}
                </div>

                :
                null
            }



        </div >
    )
}
export default Drop

