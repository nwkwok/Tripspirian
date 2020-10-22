const express = require('express');
const route = express.Router();
const pool = require('../db/db');

// CREATE A TRIP - localhost:3000/users/trips/

route.post('/', async (req, res) => { 
    try {
        const { user_id, trip_name, start_date, end_date, description, is_public, cover_photo } = req.body
        const createTrip = await pool.query(
            'INSERT INTO trip (user_id, trip_name, start_date, end_date, description, is_public, cover_photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [user_id, trip_name, start_date, end_date, description, is_public, cover_photo]
        )
        res.status(200).json(createTrip.rows)
    } catch (err) {
        console.error(err.message)
    }
   
})

// GET ALL TRIPS
route.get('/', async (req, res) => {

    try {
        const getTrips = await pool.query(
            'SELECT * FROM trip'
        )
        res.status(200).json(getTrips.rows)
        
    } catch (err) {
        console.error(err.message);
        }
    })

// GET TRIPS BY TRIP_ID
route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getTripByTripId = await pool.query(
            'SELECT * FROM trip WHERE trip_id = $1',
            [id]
        )
        res.status(200).json(getTripByTripId.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// GET TRIPS BY USER_ID
route.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getTripByUserId = await pool.query(
            'SELECT * FROM trip WHERE user_id = $1',
            [id]
        )
        res.status(200).json(getTripByUserId.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// UPDATE TRIP BY TRIP_ID
route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { trip_name, start_date, end_date, description, is_public, cover_photo} = req.body;
        const updateTrip = await pool.query(
            'UPDATE trip SET trip_name = $1, start_date = $2, end_date = $3, description = $4, is_public = $5, cover_photo = $6 WHERE trip_id = $7 RETURNING *',
            [trip_name, start_date, end_date, description, is_public, cover_photo, id]
        );
        res.status(200).json(updateTrip.rows);
    } catch (err) {
        console.error(err.message);        
    }
})

// DELETE TRIP
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTrip = await pool.query(
            'DELETE FROM trip where trip_id = $1',
            [id]
        );
        res.status(200).json("Successfully Deleted Trip");
    } catch (err) {
        console.error(err.message)
        
    }
})

module.exports = route;
