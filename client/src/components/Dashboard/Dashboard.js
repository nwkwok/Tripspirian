 import React, { Fragment, useState, useEffect } from 'react'
 import { toast } from 'react-toastify'
 import Trips from '../Trips/Trips'
 import {Button, Container} from '@material-ui/core/';
 import TripHub from '../Triphub/TripHub'

 const Dashboard = (props) => {
    const [name, setName] = useState("");
    const [trip, setTrip] = useState([]);
    const [userId, setUserId] = useState("");

    async function getUserData() {
        try {
            const response = await fetch('http://localhost:3000/dashboard/', {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()
            // console.log(parseResponse);

            setUserId(parseResponse.user.id)
            setName(parseResponse.user.f_name)
            setTrip(parseResponse.trip)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        props.setAuth(false);
        toast.warning("Logged out successfully!");
    }

     return (
         <Fragment>
             <Container maxWidth="lg">
                <section id="header">
                <div>
                    <h1>Welcome to Tripspirian, {name}!</h1>
                </div>
                </section>

                    <Trips user={userId} />
                    <TripHub />

                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={e => logout(e)}
                    className='btn btn-primary'>Logout</Button>



            </Container>
         </Fragment>
     )
 }
 
 export default Dashboard
 