import { db, storage } from '../firebase';
import React, { useState } from 'react';
import convert from 'image-file-resize';
import { v4 as uuidv4 } from 'uuid';


function Submit(props) {
    const [image, setImage] = useState(null);
    const userID = props.user.uid;
    const week = props.week;
    const handleChange = (e) => {
        var _URL = window.URL || window.webkitURL;
        if (e.target.files[0]) {
            
            convert({
                file: e.target.files[0],
                width: 500,
                height: 500,
                type: 'jpeg'
            }).then(resp => {
                // Response contain compressed and resized file
                setImage(resp);
                var image = new Image();
                image.src = _URL.createObjectURL(resp);
                image.onload = function () {
                    alert(this.width + " " + this.height + " this was created in the image converter");
                    //alert(props.week)
                };
                image.onerror = function () {
                    alert("not a valid file: " + resp.type);
                };
            }).catch(error => {
                // Error
            })
        }
    };
    const handleUpload = () => {
        const uuid = uuidv4();
        const storage_path = `/week${week}/${userID}`;
        if (image != null) {
            console.log(userID);
            storage.ref(storage_path).delete().then(() => {
                // File deleted successfully
                console.log('successfully deleted, ready for replacement')
              }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error)
              });
            storage.ref(storage_path).put(image); 
            storage
                .ref(storage_path)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                    db.collection(`/week${week}`).doc(`${userID}`).set({
                        imageUrl: url,
                        week: week,
                        wins: 0,
                        losses: 0,
                    });
                    
                    db.collection(`/users`).doc(`${userID}`).set({
                        imageUrl: url,
                        week: week,
                        wins: 0,
                        losses: 0,
                    });
                    console.log('image has been sent')
                    setImage(null);
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(error)
                  });
        } else {
            alert('no image loaded')
        }
    }
    const getUpdatedUrl = () => {
        const url = storage.ref().child()
    }

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}

export default Submit
