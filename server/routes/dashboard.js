const express = require('express');
const route = express.Router();
const pool = require('../db/db')
const authorization = require('../middleware/authorization')

route.get('/', authorization, async (req,res) => {
    try {
        // req.user has the payload from authorization
        // res.json(req.user)
        const user = await pool.query(
            'SELECT * FROM users WHERE id = $1 ORDER BY id asc',
            [req.user]
        );

        const trip = await pool.query(
            'SELECT * FROM trip WHERE user_id = $1',
            [req.user]
        );

        const event = await pool.query(
        'SELECT * FROM event LEFT JOIN trip ON event.trip_ref_id = trip.trip_id WHERE trip.user_id = $1',
        [req.user]
        );

        res.json({
            'user': user.rows[0],
            'trip': trip.rows,
            'event': event.rows
        });

    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

module.exports = route;