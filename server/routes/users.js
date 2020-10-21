const express = require('express')
const route = express.Router();
const pool = require('../db/db');

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

module.exports = route;