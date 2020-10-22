const express = require('express');
const validInfo = require('../middleware/validInfo')
const route = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator')

route.post('/login', validInfo, async (req, res) => {    
    try {
        const {email, password} = req.body

        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if (user.rows.length === 0) {
            return res.status(401).json('Passowrd or Email is incorrect');
        }

        const validatePass = await bcrypt.compare(password, user.rows[0].password)
            if (!validatePass) {
                res.status(401).json("Passowrd or Email is incorrect");
            }

        const token = jwtGenerator(user.rows[0].id);
            res.json({token});
            
    } catch (err) {
        console.error(err.message)
    }

})


module.exports = route;