 import React, { Fragment, useState, useEffect } from 'react'
 import { toast } from 'react-toastify'
 import Trips from './Trips'
 import Button from '@material-ui/core/Button';
 import Modal from './Modal'


 const Dashboard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [trip, setTrip] = useState([]);

    async function getUserData() {
        try {
            const response = await fetch('http://localhost:3000/dashboard/', {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()
            console.log(parseResponse);

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
        <section id="header">
         <div>
             <h1>Welcome to Tripspirian, {name}!</h1>
        </div>
        </section>

            <Trips name="trip_name" />

         <Button 
            variant='contained' 
            color='primary' 
            onClick={e => logout(e)}
            className='btn btn-primary'>Logout</Button>

        <Button 
            variant='containted'
            color='secondary'
            onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <input type="text" placeholder="Trip Name"></input>
        </Modal>

         </Fragment>
     )
 }
 
 export default Dashboard
 