import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Trips() {
    const [trip, setTrip] = useState([]);
    const [event, setEvent] = useState([])

    async function getUserData() {
        try {
            const response = await fetch('http://localhost:3000/dashboard/', {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()
            
            setTrip(parseResponse.trip)
            setEvent(parseResponse.event)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);



    return (
        <div>
            <h1>Your Trips</h1>
                <ul className="trips">
                    {
                    trip.map(t => {
                        return (
                            <li key={t.trip_id}>
                                <Link to={`events/${t.trip_id}`}>{t.trip_name}</Link> 
                            </li>
                            )
                        })
                    }
                </ul>   
         </div>
    )
}

export default Trips
