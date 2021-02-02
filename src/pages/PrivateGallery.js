import {db} from '../firebase'
import React,{useState} from 'react'

function PrivateGallery(user) {
    const [posts,setPosts] = useState([])
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
    return (
        <div>
            
        </div>
    )
}

export default PrivateGallery
