import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function Events(props) {

    const { id } = useParams()
    const [event, setEvent] = useState([]);

    async function getEvents() {
        try {
            const response = await fetch(`http://localhost:3000/events/trips/${id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()
            console.log(parseResponse);
            
            setEvent(parseResponse)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <h1>Events for {props.name}</h1>
                <ul className="events">
                    {
                    event.map(e => {
                        return (
                            <li key={e.event_id}>
                                <Link to={`/events/${e.event_id}/update`}>{e.event_name}</Link> 
                            </li>
                            )
                        })
                    }
                </ul>   
         </div>
    )
}

export default Events

    

