import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
// using for resizing to 1:1 ratio
import convert from 'image-file-resize';

import FadeIn from 'react-fade-in'
import transitions from '@material-ui/core/styles/transitions';
import { Translate } from '@material-ui/icons';

const Height = 500;
const Width = 400;


//styling for component that contains a preview for submission image
const DropZone = styled.div`
    position:fixed;
    transform:translate(-50%,-50%) ;
    left:50%;
    top:50%;
    height:400px;    
    width:400px;
    margin: auto;
    padding: 10px;
    border-radius:3px;
    border:1px solid #dbdbdb;
    background-size: cover;
    background-color: white;
    text-align: center;   
`
const Hoverblock = styled.div`
    position:fixed;
    transform:translate(-50%,-50%) ;
    left:50%;
    top:50%;
    height:500px;    
    width:${Width}px;
    margin: auto;
    padding: 10px;
    border-radius:3px;
    border:1px solid #dbdbdb;
    background-size: cover;
    background-color: transparent;
    text-align: center;  
    transition:1s;
    opacity:0;
    &:hover {
        opacity: 1;
    }
`
const TextTop = styled.div`
    position:fixed;
    transform:translate(-50%,-260px) ;
    left:50%;
    top:50%;
    height:25px;    
    width:${Width}px;
    margin: auto;
    padding: 10px;
    border-radius:3px;
    border:1px solid #a1a1a1;
    background-size: cover;
    background-color: white;
    text-align: center;   
`

function Drop() {
    const [image, setImage] = useState(null);
    const [locURL, setLocUrl] = useState('');
    const [prevText, setPrevText] = useState(true);
    // maybe unecessary use effect but shows when no image is loaded
    useEffect(() => {
        if (image !== null) {
            console.log('from useEffect');
            console.log(image.name);
        } else {
            console.log('no image has been loaded yet');
        }
    }, [image])
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
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div>

            <DropZone
                style={{
                    backgroundImage: image ? `url(${locURL})` : 'none'
                }}
                {...getRootProps({ refKey: 'innerRef' })}
            >
                <input
                    {...getInputProps()}
                />

                {image ?
                    null
                    :
                    <div
                        style={{
                            alignSelf: 'center',
                            fontWeight: '200',
                            transform: 'translate(50px,145px)',
                            color: '#d3d3d3',
                            width: '300px',
                            fontSize: '25px'
                        }}>
                        <p1>Click to open file explorer</p1>
                        <br />
                        <p1>or</p1>
                        <br />
                        <p1>Drag and drop an image</p1>

                    </div>}
            </DropZone>
            {image?
            <Hoverblock>
                {image ?
                    null
                    : null
                }
                <TextTop>
                    <div style={{
                        display: 'inline - block',
                        verticalAlign: 'middle',
                        lineHeight: 'normal',
                        fontWeight: '200',
                        fontSize: '25px',
                        transform: 'translate(0px,-6px)'
                    }}>
                        Submission Preview
                        </div>

                </TextTop>
                <TextTop>
                    <div style={{
                        display: 'inline - block',
                        verticalAlign: 'middle',
                        lineHeight: 'normal',
                        fontWeight: '200',
                        fontSize: '25px',
                        transform: 'translate(0px,-6px)'
                    }}>
                        Submission Preview
                    </div>

                </TextTop>

            </Hoverblock>:null}


        </div >
    )
}
export default Drop

