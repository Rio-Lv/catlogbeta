import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Login from './Login';

import './styles/publicFront.css'

const margin = 30;


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

const Width = window.innerWidth;



export default function PublicFront(props) {
    const classes = useStyles();
    const [width, setWidth] = useState(Width);

    const [anchorEl, setAnchorEl] = useState(null);

    const [loginUI, setLoginUI] = useState(false);

    const updateWidth = () => {
        setWidth(window.innerWidth);
    }
    window.onresize = updateWidth;

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
                <img 
                className="image" 
                src="https://www.brightful.me/content/images/2020/07/david-kovalenko-G85VuTpw6jg-unsplash.jpg" 
                alt=""
                onClick= {closeLoginUI} />
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
                    style={{ left: `${width}px` }}
                    onClick={openLoginUI}
                >Login</Button>
                {loginUI ?
                    <Login user={props.user} />:null
                }


            </div>


        </div>
    );
}