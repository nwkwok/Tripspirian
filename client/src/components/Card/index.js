import React from 'react'
import classes from './Card.module.css'
import Button from '@material-ui/core/Button'


function Card({tripName, tripStart, tripEnd, description, }) {
    return (
            <div className={classes.card}>
                <img></img>
                <h6>Trip Name: {tripName}</h6>
                <h6>Start Date: {tripStart}</h6>
                <h6>End Date: {tripEnd}</h6>
                <h6>{description}</h6>
                <Button 
                    color="primary"
                    >View Trip</Button>
            </div>
    )
}

export default Card
