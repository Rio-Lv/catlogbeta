import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { storage, db, timeStamp } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';




function ImageUpload({username, userID }) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const testFunc = e => {
        image ? (
            console.log(image.name)
        ) : (
                console.log("no image loaded")
            );


    }

    const handleUpload = () => {
        const id = uuidv4()
        const uploadTask = storage.ref(`images/${id}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress);
            },
            (error) => {
                // error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function...
                storage
                    .ref("images")
                    .child(id)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: timeStamp,
                            caption: caption,
                            imageUrl: url,
                            userID: userID,
                            username: username

                        });
                        console.log('image has been sent')
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }

        )
    }

    return (
        <div>
            <progress value={progress} max="100" />
            <br></br>
            {/* I want to have */}
            {/* Caption input */}
            {/* File picker */}
            {/* Post button */}


            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption} />



            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
            <Button onClick={testFunc}>
                test
            </Button>


        </div>
    )
}

export default ImageUpload


