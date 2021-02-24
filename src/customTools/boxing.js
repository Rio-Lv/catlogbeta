import styled from 'styled-components';
//takes two parameters, colum width and tab height creates a center box with two spaced divs on the side
const dropZone = (Width, TabHeight, Spacing, txtHeight) => {
    const spacing = Spacing || 3;
    const textHeight = txtHeight || 150;
    //bare box in the center
    const fullHeight = Width + TabHeight * 2 + spacing * 5;

    const ZoneDiv = styled.div`
        align-self:center;
        position:relative;
        transform: translate(0,${textHeight}px); 
    `;
    const ZoneDiv2 = styled.div`
    align-self:center;
    position:relative;
    transform: translate(0,${120}px); 
    display:none;
`;
    const Zone = styled.div`
        transform:translate(0,0);
        position:relative;
        /* box size */
        height:${Width}px;    
        /* edge styling */
        border-radius:3px;
        border:1px solid #dbdbdb;
        /* make sure the image fits the box properly */
        background-size: cover;
        /*  */
        background-color: white;
        text-align: center;   
         /*text styling  */
        line-height: 34px;
        font-size:20px;
        font-weight:300;  
        font-weight:300;
        font-family: Arial;
        color:#c7c7c7;   
    `;
    const Tab = styled.div`
        transform:translate(0,0);
        position:relative;
        /* box size */
        height:${TabHeight}px;    
        /* edge styling */
        border-radius:3px;
        border:1px solid #4b4b4b;
        /* make sure the image fits the box properly */
        background-size: cover;
        /*  */
        background-color: #4b4b4b;
        text-align: center;  
        //spacing between parts  
        margin-top:${spacing}px;
        margin-bottom:${spacing}px;
        /* text styling */
        /* adjust text height */
        line-height: 32px;
        font-size:20px;
        font-weight:300;
        font-family: Arial;
        color:#fcfcfc;
        /* hover options */
        opacity:0;       
    `;
    const DarkTab = styled.div`
    transform:translate(0,0);
    position:relative;
    /* box size */
    height:${TabHeight}px;    
    /* edge styling */
    border-radius:3px;
    border:1px solid #141414;
    /* make sure the image fits the box properly */
    background-size: cover;
    /*  */
    background-color: #141414;
    text-align: center;  
    //spacing between parts  
    margin-top:${spacing}px;
    margin-bottom:${spacing}px;
    /* text styling */
    /* adjust text height */
    line-height: 32px;
    font-size:20px;
    font-weight:300;
    font-family: Arial;
    color:#dddddd;
    /* hover options */
    opacity:0;       
`;
    const Butt = styled.button`
    transform:translate(-0,0);
        position:relative;
        /* box size */
        width:${Width}px;
        height:${TabHeight}px;    
        /* edge styling */
        border-radius:3px;
        border:1px solid #141414;
        /* make sure the image fits the box properly */
        background-size: cover;
        /*  */
        background-color: #141414;
        text-align: center;  
        //spacing between parts  
        margin-top:${spacing}px;
        margin-bottom:${spacing}px;
        /* text styling */
        /* adjust text height */
        line-height: 20px;
        font-size:20px;
        font-weight:400;
        font-family: Arial;
        color:#f0f0f0;
        /* hover options */
        opacity:0;
    `
    const Box = styled.div`
        /* border:3px solid black; */
        position:fixed;
        width:${Width}px;
        height:${fullHeight}px;
        //center column
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        ${Tab} {
            opacity: 0;
            transition:0.7s;
        } 
        &:hover ${Tab} {
            opacity: 1;
        } 
        ${Butt} {
            opacity: 0;
            transition:0.7s;
        } 
        &:hover ${Butt} {
            opacity: 1;
        } 
        ${DarkTab} {
            opacity: 0;
            transition:0.7s;
        } 
        &:hover ${DarkTab} {
            opacity: 1;
        } 
        
        &:hover ${ZoneDiv} {
            display:none;
        } 
        ${ZoneDiv2} {
            transition:0.7s;
        } 
        
        &:hover ${ZoneDiv2} {
            display:block;
        } 
        `
    return { Box, Zone, Tab, ZoneDiv, ZoneDiv2, Butt, DarkTab };
}

const gallery = (posx, posy) => {
    const Temp = styled.div`
        position:fixed;
        left:${posx}px;
        top:${posy}px;
        font-size:50px;
        color:white;
        `
    const MainBox = styled.div`
        position:fixed;
        width:100%;
        height:100%;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        font-size:50px;
        color:white;
        /* border: 3px black solid; */
        background-color:transparent;
    `
    const InnerBox = styled.div`
        width:95%;
        position:relative;
        /* border:3px black solid; */
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        /* background-color:#000000; */
        /* background-color:white; */
    
    `
    const ShowBox = styled.div`
        position:fixed;
        width:90%;
        height:90%;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        font-size:50px;
        color:white;
        //border: 3px black solid;
        background-color:transparent;
    `

    return { Temp, MainBox, InnerBox, ShowBox }
}

const infobar = (Yoff) => {
    const TopBar = styled.div`
        position:fixed;
        margin-top:${Yoff}px;
        width:50%;
        height:50px;
        left:50%;
        top:30px;
        transform: translate(-50%,-50%);
        font-size:50px;
        color:white;
        border: 3px #ffffff solid;
        background-color:transparent;
        line-height:40px;
        text-align:center;
        opacity:0;
        transition:1s;
        &:hover{
            opacity:1;
        }
    `
    const BotBar = styled.div`
        position:fixed;
        width:${(window.innerWidth - window.innerHeight) / 2}px;
        height:50px;
        right:0;
        bottom:10px;
        
        font-size:50px;
        color:white;
        border: 3px #ffffff solid;
        background-color:transparent;
        line-height:40px;
        text-align:center;
        transition:1s;

`
    return { TopBar, BotBar }
}

const twoBox = (Yoff) => {
    const Title = styled.div`
        position:fixed;
        margin-top:${Yoff}px;
        width:50%;
        height:50px;
        left:50%;
        top:30px;
        transform: translate(-50%,-50%);
        font-size:50px;
        color:white;
        text-shadow: 1px 1px  5px black;
        /* border: 3px #ffffff solid; */
        background-color:transparent;
        line-height:40px;
        text-align:center;
    `
    const TitleBack = styled.div`
        position:fixed;
        margin-top:${Yoff}px;
        width:50%;
        height:60px;
        left:50%;
        top:30px;
        transform: translate(-50%,-50%);
        background-color:black;
        opacity:50%;
        border-radius:5px;
    `
    const MainBox = styled.div`
        position:fixed;
        display: flex;
        flex-direction:row;
        
        //center column
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        /* border:3px solid white; */
        align-items:center;
        transition:.7s;
        @media (max-aspect-ratio:1/1) {
            flex-direction: column;
        }

    `
    const Box = styled.div`
        margin:30px;
        position:relative;
        background-color:grey;
        background-size:cover;
        width:450px;
        height:450px;
        border:3px solid #000000;
        opacity:100%;
        border-radius:5px;
        transition:.5s;
        &:hover{
            border:5px solid #ffffff;   
        }
        @media (max-width:1250px) {
            width:350px;
            height:350px;
        }

    `;
    return { MainBox, Box, Title, TitleBack }
}

export { dropZone, gallery, infobar, twoBox };