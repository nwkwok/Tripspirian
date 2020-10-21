const express = require('express');
const route = express.Router();
const pool = require('../db/db');


// CREATE A TRIP


// GET ALL TRIPS
route.get('/', async (req, res) => {
    try {
        const getTrips = await pool.query(
            'SELECT * FROM trip'
        )
        res.status(200).json({user: getTrips.rows})
        
    } catch (err) {
        console.error(err.message);
        }
    })

// GET A TRIP


// UPDATE TRIP


// DELETE TRIP

module.exports = route;
