import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UpdateEvent from './Modals/UpdateEvent'
import Button from '@material-ui/core/Button'
import Modal from './Modal'


function EditEvent(props) {
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()
    const [event, setEvent] = useState([]);

    async function getEventsById() {
        try {
            const response = await fetch(`http://localhost:3000/events/${id}`, {
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
        getEventsById();
    }, []);

    return (
        <div>
             {event.map(e => {
                return (
                    <>
                <h1>Edit {e.event_name}</h1>
           
                <ul key={e.event_id}>
                    <li>
                        Event: <p>{e.event_name}</p>
                    </li>
                    <li>
                        Start Date: <p>{e.start_date}</p>
                    </li>
                    <li>
                        End Date: <p>{e.end_date}</p>
                    </li>
                    <li>
                        Description: <p>{e.description}</p>
                    </li>
                    <li>
                        Photos: <p>{e.photos}</p>
                    </li>
                    <li>
                        Rating: <p>{e.rating}</p>
                    </li>
                </ul>
                </>
                )
            })}

                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => setIsOpen(true)}>
                        Edit Event Info
                    </Button>

                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <UpdateEvent />
                    </Modal>
        </div>
        )
    }

export default EditEvent
