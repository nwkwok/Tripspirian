 import React, {Fragment} from 'react'
 
 const Dashboard = (props) => {
     return (
         <Fragment>
         <div>
             <h1>Dashboard</h1>
             <button onClick={() => props.setAuth(false)}>Logout</button>
         </div>
         </Fragment>
     )
 }
 
 export default Dashboard
 