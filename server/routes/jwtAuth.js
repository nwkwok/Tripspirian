const express = require('express');
const validInfo = require('../middleware/validInfo')
const route = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator')

// CREATE/REGISTER NEW USER
route.post('/register', validInfo, async (req, res) => {
    try {
    const {f_name, l_name, email, password} = req.body

    const user = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    if(user.rows.length !== 0) {
        return res.status(401).send('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await pool.query(
        'INSERT INTO users (f_name, l_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [f_name, l_name, email, hashedPassword]
    );
    
    const token = jwtGenerator(newUser.rows[0].id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// LOGIN USER
route.post('/login', validInfo, async (req, res) => {    
    try {
        const {email, password} = req.body

        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if (user.rows.length === 0) {
            return res.status(401).json('Passowrd or Email is incorrect');
        }

        const validatePass = await bcrypt.compare(password, user.rows[0].password)
            if (!validatePass) {
                res.status(401).json("Passowrd or Email is incorrect");
            }

        const token = jwtGenerator(user.rows[0].id);
            res.json({token});
            
    } catch (err) {
        console.error(err.message)
    }

})


module.exports = route;