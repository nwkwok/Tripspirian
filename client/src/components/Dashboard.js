 import React, { Fragment, useState, useEffect } from 'react'
 import {toast} from 'react-toastify'
 import { Link } from 'react-router-dom'
 
 const Dashboard = (props) => {

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

        <section id="trips">
             <div>
             <h1>Recent Trips</h1>
                <ul className="trips">
                    {
                        trip.map(t => {
                          return (
                                <li key={t.trip_id}>
                                  <Link to="/trip">{t.trip_name}</Link> 
                                </li>
                          )
                        })
                    }
                </ul>   
             <button onClick={e => logout(e)}className='btn btn-primary'>Logout</button>
         </div>
         </section>

         </Fragment>
     )
 }
 
 export default Dashboard
 