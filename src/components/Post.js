import React ,{useState} from 'react';
import './Post.css';
import { increment, db } from '../config/firebase';

function Post({ username, caption, imageUrl, id }) {
    const [score,setScore] = useState(0);
    db.collection("posts").onSnapshot(()=>{
        db.collection("posts").doc(id).get().then(doc=>{
            console.log(doc.data().points);
            setScore(doc.data().points)
        })  
    })

    return (

        <div className="post">
            <div className="post__header">
                <h3>hello</h3>
                <button onClick={() => {
                    db.collection("posts").doc(id).update({ points: increment});
                    
                }}>addpoint</button>  
                <button onClick={() => {
                    db.collection("posts").doc(id).get().then(doc=>{
                        console.log(doc.data().points);
                        setScore(doc.data().points)
                    })    
                }}>count</button>   
                
                <h1>{score}</h1>

            </div>

            {/* header -> avatar + username */}

            <img className="post__image" src={imageUrl}
                alt="" />
            {/* image */}

            <h4 className="post__text"><strong>{username}</strong> {caption}
            </h4>


            {/* username + caption */}
        </div>
    )
}

export default Post
