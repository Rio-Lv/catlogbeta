import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import convert from 'image-file-resize';


const StyledDiv = styled.div`
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
function Drop() {
    const [image, setImage] = useState(null);
    const [locURL, setLocUrl] = useState('');

    useEffect(() => {
        if (image !== null) {
            console.log('from useEffect');
            console.log(image.name);
        } else {
            console.log('no image has been loaded yet');
        }
    }, [image])
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
            <StyledDiv
                style={{
                    backgroundImage: image ? `url(${locURL})` : 'none'
                }}
                {...getRootProps({ refKey: 'innerRef' })}
            >
                <input
                    {...getInputProps()}
                />
                {image ?
                    null :
                    <div style={{
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
                <div style={{
                    alignSelf: 'center',
                    fontWeight: '200',
                    transform: 'translate(50px,315px)',
                    color: '#d3d3d3',
                    width: '300px',
                    fontSize: '25px'
                }}>
                    

                </div>
            </StyledDiv>

        </div>
    )
}
export default Drop

