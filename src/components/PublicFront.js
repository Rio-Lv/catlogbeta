import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import Login from './Login';

import './styles/publicFront.css'

import styled, { keyframes } from 'styled-components';


const margin = 30;

const Back = styled.div`
    position:fixed;
    transform:translate(-50%,-50%) ;
    left:50%;
    top:50%;
    height:100%;    
    width:100%;
    margin: auto;
    padding: 10px;
    border-radius:3px;
    border:1px solid #dbdbdb;
    background-size: cover;
    `

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        display: 'flex',
        direction: 'row'
    },
    iconButton: {
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        marginLeft: `${margin}px`,
        marginTop: `${margin}px`,
        backgroundColor: 'transparent',
        color: 'white',
        transition: '0.6s',
        '&:hover': {
            backgroundColor: 'black'
        }
    },
    loginButton: {
        position: 'fixed',
        // left:width,
        transform: 'translate(-140%, -50%)',
        marginRight: `${margin}px`,
        marginTop: `${margin}px`,
        backgroundColor: 'transparent',
        color: 'white',
        transition: '0.6s',
        '&:hover': {
            backgroundColor: 'black'
        }
    }
}));

export default function PublicFront(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const [loginUI, setLoginUI] = useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function openLoginUI() {
        setLoginUI(true)
    }
    function closeLoginUI() {
        setLoginUI(false)
    }
    return (

        <div className={classes.root}>
            <div className={classes.bar}>

                <Button />

                <IconButton
                    className={classes.iconButton}
                    aria-controls="simple-menu"
                    aria-haspopup="true" color="inherit"
                    aria-label="menu"
                    onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                    }}>Public Gallery</MenuItem>
                    <MenuItem onClick={handleClose}>Rules</MenuItem>
                    <MenuItem onClick={handleClose}>about</MenuItem>
                </Menu>

                <Button
                    className={classes.loginButton}
                    color='inherit'
                    style={{ left: `100%` }}
                    onClick={openLoginUI}
                >Login</Button>
                {loginUI ?
                    <Back
                        onClick={closeLoginUI}
                    >
                        <Login />
                    </Back>
                    :
                    null
                }


            </div>


        </div>
    );
}