const express = require('express')
const route = express.Router();
const pool = require('../db/db');
    
// GET ALL EVENTS
    route.get('/', async (req, res) => {
        try {
            const getEvents = await pool.query(
                'SELECT * FROM event'
            )
            res.status(200).json({user: getEvents.rows})
            
        } catch (err) {
            console.error(err.message);
            }
        })


module.exports = route;
        
        
        
        
        
        