import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Modal from './Modal'
import CreateEvent from '../components/CreateEvent'

function Events(props) {
    const { id } = useParams()
    const [event, setEvent] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

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
        <>
        <div>
            <h1>Events for {props.tripName}</h1>
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
                <div>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => setIsOpen(true)}>
                        Add Event
                    </Button>

                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <CreateEvent user={props.user} />
                    </Modal>

                </div>
         </div>
         </>
    )
}

export default Events

    

