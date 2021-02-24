import React, { useState, useEffect } from 'react';
import { twoBox, infobar } from '../customTools/boxing';
import FadeIn from 'react-fade-in';

import { db } from '../firebase'

const getRandomPost = () => {
   const collection =  db.collection('4');
}

const { MainBox, Box, Title, TitleBack } = twoBox(50);
const title = 'Block Choncky Cat';
function Voting() {
    const [post1, setPost1] = useState(null);
    const [post2, setPost2] = useState(null);

    useEffect(() => {

    })

    const box =
        <FadeIn>
            <Box />
        </FadeIn>
        ;
    return (
        <div>
            <FadeIn>
                <TitleBack></TitleBack>
                <Title>{title}</Title>
            </FadeIn>

            <MainBox>
                {box}{box}
            </MainBox>
        </div>
    )
}

export default Voting
