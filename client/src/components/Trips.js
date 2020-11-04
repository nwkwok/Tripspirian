import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Modal from './Modal'
import CreateTrip from './Modals/CreateTrip'
import { useHistory, useLocation, Link } from 'react-router-dom';
import axios from 'axios'


function Trips(props) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const history = useHistory();
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



    const deleteTrip = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/trips/${id}`)
            history.push('/');
            history.push(location.pathname);
        } catch (err) {
            console.error(err.message)
        }
        
        console.log(id)
    }


    return (
        <div>
            <h1>Your Trips</h1>
                <ul className="trips">
                {
                trip.map(t => {
                    return (
                        <li key={t.trip_id}>
                            <Link to={{
                                pathname:`events/${t.trip_id}`,
                                trip: t.trip_name}}>{t.trip_name}</Link> 
                            <Button 
                                color="secondary"
                                onClick={() => deleteTrip(t.trip_id)}>Delete Trip</Button>
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

                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <CreateTrip user={props.user} />
                    </Modal>

                </div>
         </div>
    )
}

export default Trips
