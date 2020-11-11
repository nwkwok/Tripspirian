import React from 'react'
import classes from '../Button/Button.module.css'

function index({buttonStyle, text}) {
    return (
        <div className={buttonStyle}>
            {text}
        </div>
    )
}

export default index
