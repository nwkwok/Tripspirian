import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import classes from './Login.module.css'

const Login = (props) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs

    const handleChange = e => {
        setInputs({...inputs, 
        [e.target.name]: e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {email, password}
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            const parseResponse = await response.json();

            if (parseResponse.token) {
                
                localStorage.setItem('token', parseResponse.token)
                props.setAuth(true)
                toast.success('Logged in successfully!');
            } else {
                props.setAuth(false);
                toast.error(parseResponse)
            }
        } catch (err) {
            console.error(err.message)
            
        }
    }

    return (
        <Fragment>
            <div className={classes.loginContainer}>
            <h1 className='text-center my-5'>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    onChange={handleChange} 
                    value={email}
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    className="form-control my-3"/>
                <input 
                    onChange={handleChange} 
                    value={password} 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    className="form-control my-3"/>
                <button 
                    className="btn btn-success btn-block">Submit</button>
                <span>New to Tripspirian? </span><Link to='/register'>Register new user</Link>
            </form>
            </div>
        </Fragment>
    )
}

export default Login
