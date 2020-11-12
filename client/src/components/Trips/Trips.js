import React, { useState, useEffect } from 'react'
import { Button, Icon } from '@material-ui/core/';
import Modal from '../UI/Modal'
import CreateTrip from '../UI/Modals/CreateTrip'
import { useHistory, useLocation, Link } from 'react-router-dom';
import axios from 'axios'
import classes from './Trips.module.css'


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
        <div className={classes.tripSection}>
            <h1 className={classes.heading}>Your Trips</h1>
                <ul className="trips">
                {
                trip.map(({trip_id, trip_name, start_date, end_date, description}) => {

                
                    return (
                    <div className={classes.tripContainer}>
                        <div className={classes.tripPhoto}>
                            Photo
                        </div>
                        <div>
                        <li className={classes.tripList} key={trip_id}>
                            <Link to={{
                                pathname:`events/${trip_id}`,
                                trip: trip_name}}>{trip_name}</Link> 
                                <h6>{start_date}</h6>
                                <h6>{end_date}</h6>
                                <h6>{description}</h6>
                            <Button 
                                color="secondary"
                                onClick={() => deleteTrip(trip_id)}>Delete Trip</Button>
                            </li>
                        </div>
                    </div>
                            )
                        })
                    }
                </ul>   
                <div className={classes.addTripBtnContainer}>
                    <Button className={classes.addTripBtn} 
                        variant="outlined" 
                        color="primary"
                        onClick={() => setIsOpen(true)}>
                        <h4>+</h4>
                    </Button>

                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <CreateTrip user={props.user} />
                    </Modal>

                </div>
         </div>
    )
}

export default Trips
