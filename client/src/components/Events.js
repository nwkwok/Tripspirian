import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Events() {
    const [event, setEvent] = useState([]);

    async function getUserData() {
        try {
            const response = await fetch('http://localhost:3000/dashboard/', {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()
            console.log(parseResponse);
            
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
            <h1>Events for TripName</h1>
                <ul className="events">
                    {
                    event.map(e => {
                        return (
                            <li key={e.event_id}>
                                <Link to="/events">{e.event_name}</Link> 
                            </li>
                            )
                        })
                    }
                </ul>   
         </div>
    )
}

export default Events

    

