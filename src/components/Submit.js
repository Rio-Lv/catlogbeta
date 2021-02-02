import { db, storage } from '../firebase';
import firebase from 'firebase'
import React,{useState} from 'react';

function Submit(user, week) {
    const [image, setImage] = useState(null);
    const userID = user.user.uid;

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        if(image!=null){
            console.log(userID);
            storage.ref(`images/${userID}/images`).put(image);
            storage
                .ref(`images/${userID}/images`)
                .getDownloadURL()
                .then(url => {
                    // post image inside db     
                    db.collection(`users/${userID}/images`).add({
                        imageUrl: url,
                        userID: userID,
                        week: week,
                    });
                    // this collection can then be edited using cloud function
                    db.collection(`submissions/`).add({
                        imageUrl: url,
                        userID: userID,
                        week: week,
                    });
                    console.log('image has been sent')
                    setImage(null);
                })
        }else{
            alert('no image loaded')
        }
    }

    return (
        <div>
            <input type="file" onChange = {handleChange}/>
            <button onClick ={handleUpload}>Upload</button>
        </div>
    )
}

export default Submit
