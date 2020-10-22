const express = require('express');
const route = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo')


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


module.exports = route;