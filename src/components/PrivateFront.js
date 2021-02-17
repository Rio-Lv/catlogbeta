import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './styles/publicFront.css';

import { auth } from '../firebase';

import Drop from './Drop'

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
            backgroundColor: 'black',
            color: 'gold'
        }
    },
    logoutButton: {
        position: 'fixed',
        // left:width,
        transform: 'translate(-140%, -50%)',
        marginRight: `${margin}px`,
        marginTop: `${margin}px`,
        backgroundColor: 'transparent',
        color: 'white',
        transition: '0.6s',
        '&:hover': {
            backgroundColor: 'black',
            color: 'gold'
        }
    },
    menu: {
        backgroundColor: 'transparent',
    }
}));

const Width = window.innerWidth;

export default function PrivateFront(props) {
    const classes = useStyles();
    const [width, setWidth] = useState(Width);

    const [anchorEl, setAnchorEl] = useState(null);

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

    const logout = () => {
        auth.signOut().then(() => {
            console.log('logging out');
        })
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
                    <MenuItem
                    
                        onClick={() => {
                            handleClose();
                        }}>Public Gallery</MenuItem>
                    <MenuItem onClick={handleClose}>Private Gallery</MenuItem>
                    <MenuItem onClick={handleClose}>Hello</MenuItem>
                </Menu>
                

                <Button
                    className={classes.logoutButton}
                    color='inherit'
                    style={{ left: `${width}px` }}
                    onClick={logout}
                >Logout</Button>

            </div>
            <Drop/>


        </div>
    );
}