import React, { useState, useEffect } from 'react'
import { makeStyles, Card, CardContent, CardActions, Button } from '@material-ui/core/'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

function TripHub() {
    const [allTrips, setAllTrips] = useState([])
    const classes = useStyles();

    async function getAllUserData() {
        try {
            const response = await fetch('http://localhost:3000/trips', {
            method: "GET",
            headers: { token: localStorage.token }
        })
            const parseResponse = await response.json();
            console.log(parseResponse)
            setAllTrips(parseResponse)

        } catch (err) {
            console.error(err.message)
        }
    }

useEffect(() => {
    getAllUserData();
}, [])

    return (
        
        <div>
            <h1>Trip Hub</h1>
            <ul>
            {allTrips.map(a => {
                return (
                    <Card className={classes.root} variant='outlined' key={a.trip_id}>
                        <CardContent>
                            <li >Trip name: {a.trip_name}</li>
                            <li>Trip date: {a.start_date} - {a.end_date}</li>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>

                )
            })
            }
            </ul>
       </div>
    )
}

export default TripHub
