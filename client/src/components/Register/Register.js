import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom' 
import { toast } from 'react-toastify'
import classes from './Register.module.css'

const Register = (props) => {

    const [inputs, setInputs] = useState({
        f_name: "",
        l_name: "",
        email: "",
        password: ""
    })

    const { f_name, l_name, email, password } = inputs;

    const handleChange = e => {
        setInputs({...inputs, 
        [e.target.name]: e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body = { f_name, l_name, email, password }
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const parseResponse = await response.json();
            
            if (parseResponse.token) {
                localStorage.setItem('token', parseResponse.token)
                props.setAuth(true);
                toast.success("Successully Registered!")
            } else {
                props.setAuth(false)
                toast.error(parseResponse);
            }

        } catch (err) {
            console.err(err.message)
        }

    }
    return (
        <Fragment>
            <div className={classes.registerContainer}>
            <h1 className='text-center my-5'>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type='text' 
                    name='f_name' 
                    placeholder='First Name' 
                    className='form-control my-3'
                    onChange={handleChange}
                    value={f_name}/>
                <input 
                    type='text' 
                    name='l_name' 
                    placeholder='Last Name' 
                    className='form-control my-3'
                    onChange={handleChange}
                    value={l_name} />
                <input 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    className='form-control my-3'
                    onChange={handleChange}
                    value={email}/>
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    className='form-control my-3'
                    onChange={handleChange}
                    value={password}/>
                <button className='btn btn-success btn-block'>Submit</button>
                <span>Already have an account? </span><Link to='/login'>Login here</Link>
            </form>
            </div>
        </Fragment>
    )
}

export default Register
