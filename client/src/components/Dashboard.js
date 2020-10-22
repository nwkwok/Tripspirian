 import React, { Fragment, useState, useEffect } from 'react'
 
 const Dashboard = (props) => {

    const [name, setName] = useState("")


    async function getName() {
        try {
            const response = await fetch('http://localhost:3000/dashboard/', {
                method: "GET",
                headers: { token: localStorage.token }
            })
            const parseResponse = await response.json()
            setName(parseResponse.f_name)

        } catch (err) {
            console.error(err.message)
            
        }
    }
    useEffect(() => {
        getName()
    }, []);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token')
        props.setAuth(false);

    }

     return (
         <Fragment>
         <div>
             <h1>Welcome to Tripspirian, {name}!</h1>
             <button onClick={e => logout(e)}className='btn btn-primary'>Logout</button>
         </div>
         </Fragment>
     )
 }
 
 export default Dashboard
 