const express = require('express');
const route = express.Router();
const pool = require('../db/db')
const authorization = require('../middleware/authorization')

route.get('/', authorization, async (req,res) => {
    try {
        // req.user has the payload from authorization
        // res.json(req.user)
        const user = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [req.user]
        );
        res.json({
            'First Name': user.rows[0].f_name,
            'Last Name': user.rows[0].l_name});

    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

module.exports = route;