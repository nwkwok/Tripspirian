const express = require('express')
const route = express.Router();
const pool = require('../db/db');
    
// CREATE A NEW EVENT
    route.post('/', async (req, res) => {
        try {
            const { trip_ref_id, event_name, start_date, end_date, description, photos, rating } = req.body;
            const createEvent = await pool.query(
                'INSERT INTO event (trip_ref_id, event_name, start_date, end_date, description, photos, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [trip_ref_id, event_name, start_date, end_date, description, photos, rating]
            );

            res.status(200).json(createEvent.rows);
        } catch (err) {
            console.error(err.message)
            
        }
    })

// GET ALL EVENTS
    route.get('/', async (req, res) => {
        try {
            const getEvents = await pool.query(
                'SELECT * FROM event'
            )
            res.status(200).json(getEvents.rows)
            
        } catch (err) {
            console.error(err.message);
            }
        })

// GET AN EVENT
route.get('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const getEventById = await pool.query(
            'SELECT * FROM event WHERE event_id = $1',
            [id]
        )

    res.status(200).json(getEventById.rows);
    } catch (err) {
        console.error(err.message)
        
    }
})

// UPDATE EVENT
route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { event_name, start_date, end_date, description, photos, rating } = req.body;

        const updateEvent = await pool.query(
            'UPDATE event SET event_name = $1, start_date = $2, end_date = $3, description = $4, photos = $5, rating = $6 WHERE event_id = $7 RETURNING *',
            [event_name, start_date, end_date, description, photos, rating, id]
        )

        res.status(200).json(updateEvent.rows);
    } catch (err) {
        console.error(err.message)
        
    }
})

// DELETE EVENT
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteEvent = await pool.query(
            'DELETE FROM event WHERE event_id = $1',
            [id]
        )
        res.status(200).json('Successfully Deleted Event');
        
    } catch (err) {
        console.error(err.message)
    }

})


module.exports = route;
        
        
        
        
        
        