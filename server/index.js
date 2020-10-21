const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./db/db');
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

///////// ROUTES /////////


// GET ALL USERS
app.get('/', async (req, res) => {
try {
    const getUsers = await pool.query(
        'SELECT * FROM users'
    )
    res.status(200).json({user: getUsers.rows})
    
} catch (err) {
    console.error(err.message);
    }
})

// GET ALL TRIPS
app.get('/trips', async (req, res) => {
    try {
        const getTrips = await pool.query(
            'SELECT * FROM trip'
        )
        res.status(200).json({user: getTrips.rows})
        
    } catch (err) {
        console.error(err.message);
        }
    })
    
// GET ALL EVENTS
    app.get('/trips/events', async (req, res) => {
        try {
            const getEvents = await pool.query(
                'SELECT * FROM event'
            )
            res.status(200).json({user: getEvents.rows})
            
        } catch (err) {
            console.error(err.message);
            }
        })
        
            



app.listen(port, () => {
    console.log(`You are listening on port ${port}`);
});


