import React, { useState, useEffect } from 'react'
import Card from '../Card'
import '../../App.css'
import classes from './Triphub.module.css'


function TripHub() {
    const [allTrips, setAllTrips] = useState([])

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

console.log(allTrips);

    return (
        
        <div>
            <h1 className={classes.header}>Trip Hub</h1>

            <div className={classes.cardContainer}>
            {allTrips.map(({trip_id, trip_name, start_date, end_date, description}) => {

                return (
                    <Card 
                        key={trip_id}
                        tripName={trip_name}
                        tripStart={start_date}
                        tripEnd={end_date}
                        description={description}
                        tripid={trip_id}
                        />
                )
            })
            }
           </div>
       </div>
    )
}

export default TripHub
