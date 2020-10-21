const express = require('express')
const route = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt')


// CREATE/REGISTER NEW USER
route.post('/', async (req, res) => {
    try {
    const {f_name, l_name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const createUser = await pool.query(
        'INSERT INTO users (f_name, l_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [f_name, l_name, email, hashedPassword]
    )
    res.status(200).json(createUser.rows);
    } catch (err) {
        console.error(err.message);
    }
})


module.exports = route;