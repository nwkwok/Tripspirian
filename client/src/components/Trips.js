import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Modal from './Modal'
import CreateTrip from './CreateTrip'






function Trips() {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleClick = e => {
        console.log("clicked")
    }


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
                <div>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => setIsOpen(true)}>
                        Add Trip
                    </Button>

                    {/* <Button 
            variant='containted'
            color='secondary'
            onClick={() => setIsOpen(true)}>Open Modal</Button> */}

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <CreateTrip />
        </Modal>

                </div>
         </div>
    )
}

export default Trips
