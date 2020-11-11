import React from 'react'
import classes from './Card.module.css'
import Button from '@material-ui/core/Button'

const handleClick = (tripid) => {
    console.log(tripid)
}

function Card({tripName, tripStart, tripEnd, description, tripid}) {
    return (
            <div className={classes.card}>
                <img></img>
                <h6>Trip Name: {tripName}</h6>
                <h6>Start Date: {tripStart}</h6>
                <h6>End Date: {tripEnd}</h6>
                <h6>{description}</h6>
                <Button 
                    color="primary"
                    onClick={(id) => handleClick(tripid)}
                    >View Trip</Button>
            </div>
    )
}

export default Card
