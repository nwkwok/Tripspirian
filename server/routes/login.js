const express = require('express');
const route = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt');

route.post('/', async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if(user) { 
            const validatePass = await bcrypt.compare(password, user.rows[0].password)
            if (validatePass) {
                res.json('Authenticated User')
            } else {
                res.json('Sorry, that password did not match.')
            }
        } else {
            res.status(404).json('User not found');
        }

    } catch (err) {
        console.error(err.message)
    }

})


module.exports = route;