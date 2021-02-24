import React, { useState } from 'react'
import { db } from '../firebase';

import { gallery } from '../customTools/boxing';
import { BGrmblur } from '../customTools/filters';

import Gallery from 'react-photo-gallery';
import FadeIn from 'react-fade-in';

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

function PublicGallery(props) {
    return (
        <div>
            <MainBox onClick={() => {
                console.log('main box is clicked')
                props.setPublicGallery(false)
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

export default PublicGallery


