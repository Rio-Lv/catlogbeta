//import React from 'react';
import './Post.css';

function Post({username,caption,imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <h3>{username}</h3>
            </div> 

            {/* header -> avatar + username */}

            <img className="post__image" src={imageUrl}
            alt=""/>
            {/* image */}

            <h4 className="post__text"><strong>{username}</strong> {caption}
            </h4>
            {/* username + caption */}
        </div>
    )
}

export default Post