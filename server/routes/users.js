const express = require('express')
const route = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt')


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
route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getUserById = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        
        res.status(200).json(getUserById.rows);

    } catch (err) {
        console.error(err.message)
    }
})

// UPDATE USER
route.put('/:id', async (req, res) => {
    try {
        const { f_name, l_name, email, password } = req.body;
        const { id } = req.params;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = await pool.query(
            'UPDATE users SET f_name = $1, l_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *',
            [f_name, l_name, email, hashedPassword, id]
        );

        res.status(200).json(updateUser.rows);
        
    } catch (err) {
        console.error(err.message)        
    }
})

// DELETE USER
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        );
        res.json('User Deleted')
    } catch (err) {
        console.error(err.message)
    }
})




module.exports = route; 