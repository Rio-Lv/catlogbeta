import React from 'react';
import { auth } from '../config/firebase';
function Logout() {

    const logout = () => {
        // auth.signOut();
        console.log('signed Out')
    }

    return (
        <div>
            <button onClick={
                logout
            }>Logout</button>
        </div>
    )
}

export default Logout
