import React from 'react'
import {dropZone} from '../../customTools/boxing'

const { Box, Zone } = dropZone(600);
function About(props) {
    return (
        <Box>
            <Zone>
                <h1>About</h1>
            </Zone>
        </Box>
    )
}

export default About
