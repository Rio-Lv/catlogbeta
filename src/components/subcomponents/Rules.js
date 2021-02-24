import React from 'react'
import {dropZone} from '../../customTools/boxing'

const { Box, Zone } = dropZone(600);
function Rules(props) {
    return (
        <Box>
            <Zone>
                <h1>Here are the rules</h1>
            </Zone>
        </Box>
    )
}

export default Rules
