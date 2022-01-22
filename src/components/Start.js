import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
    console.log("moce")
    return (
        <div className='Startup'> 
            <h1 className='Heading'>CHESS MASTER</h1>
            <button className='btn'>
                <Link to="/game" className='link'>Start Game</Link></button>
        </div>
    )
}



export default Start
