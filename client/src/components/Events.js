import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Modal from './Modal'
import CreateEvent from '../components/CreateEvent'
import axios from 'axios';

function Events(props) {
    const { id } = useParams()
    const location = useLocation();
    const history = useHistory();
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

    const deleteEvent = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/events/${id}`)
            history.push('/');
            history.push(location.pathname);

        } catch (err) {
            console.error(err.message)
        }
    }



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
                                <Button
                                    color="secondary"
                                    onClick={()=>deleteEvent(e.event_id)} 
                                    >Delete Event</Button>
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

    

