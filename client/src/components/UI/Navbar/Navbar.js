import React from 'react'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <>
        <div className={classes.container}>
            <div className={classes.logo}>
                Logo
            </div>
            <div className={classes.tripHub}>
            <NavLink to='/triphub' activeClassName={classes.active}>
                    TripHub
                </NavLink>
            </div>
            <div className={`${classes.menuItems} ${classes.login}`}>
                <NavLink to='/login' activeClassName={classes.active}>
                    Login
                </NavLink>
                <NavLink to='/register' className={`${classes.menuItems} ${classes.register}`}>
                    Register
                </NavLink>

            </div>
        </div>

        </>
    )
}

export default Navbar
