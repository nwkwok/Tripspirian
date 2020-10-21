const express = require('express')
const route = express.Router();
const pool = require('../db/db');

// CREATE A NEW USER
route.post('/', async (req, res) => {
    try {
    const {f_name, l_name, email, password} = req.body
    const createUser = await pool.query(
        'INSERT INTO users (f_name, l_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [f_name, l_name, email, password]
    );

    res.status(200).json(createUser.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// GET ALL USERS
route.get('/', async (req, res) => {
    try {
        const getUsers = await pool.query(
            'SELECT * FROM users'
        )
        res.status(200).json({user: getUsers.rows})
        
    } catch (err) {
        console.error(err.message);
        }
    })

// GET A USER


// UPDATE USER


// DELETE USER



module.exports = route; 