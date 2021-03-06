import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Modal from '../UI/Modal'
import CreateEvent from '../UI/Modals/CreateEvent'
import axios from 'axios';
import { FormControl } from '@material-ui/core';
import UpdateTrip from '../UI/Modals/UpdateTrip'

function Events(props) {
    console.log(props.location)
    const { id } = useParams()
    const location = useLocation();
    const history = useHistory();
    const [event, setEvent] = useState([]);
    const [createEventIsOpen, setCreateEventIsOpen] = useState(false)
    const [editTripIsOpen, setEditTripIsOpen] = useState(false)
    const [trip, setTrip] = useState([]);
    const [tripName, setTripName] = useState(`${props.location.trip}`)

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

    async function getTrip() {
        try {
            const response = await fetch(`http://localhost:3000/trips/${id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()
            setTrip(parseResponse)
            console.log(parseResponse)


        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        getTrip();
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
            
            {trip.map(t => {
                return (
                <>
                <h1>{t.trip_name} Summary <span onClick={() => setEditTripIsOpen(true)}>[Edit Trip]</span> </h1> 
                <ul key={t.trip_id}>
                    <li>Start Date: {t.start_date}</li>
                    <li>End Date: {t.end_date}</li>
                    <li>Description: {t.description}</li>
                    <li>{t.cover_photo}</li>
                </ul>
                </>
                )
            })}

            <h1>Events from {props.location.trip} trip</h1> 
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
                        onClick={() => setCreateEventIsOpen(true)}>
                        Add Event
                    </Button>

                    <Button 
                        variant="default" 
                        onClick={() => history.push('/trips')}>
                        Back to Trips
                    </Button>

                    <Modal open={createEventIsOpen} onClose={() => setCreateEventIsOpen(false)}>
                        <CreateEvent user={props.user} />
                    </Modal>

                    <Modal open={editTripIsOpen} onClose={() => setEditTripIsOpen(false)}>
                        <FormControl autoComplete="off" noValidate>
                            
                            <UpdateTrip />
                            {/* <input 
                                type="text" 
                                label="Change trip name" 
                                placeholder={`${props.location.trip}`}
                                value={tripName}
                                onChange={e => setTripName(e.target.value)}/>
                            <Button 
                                variant='default'
                                // onClick={updateTripName}
                                type="submit"
                                /> */}
                        </FormControl>
                    </Modal>

                </div>
         </div>
         </>
    )
}

export default Events

    

