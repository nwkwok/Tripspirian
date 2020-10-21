const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT;

// MOUNT MIDDLEWARE 
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


///////// EXPRESS ROUTER /////////
const users = require('./routes/users')
app.use('/users', users)

const trips = require('./routes/trips')
app.use('/users/trips', trips)

const events = require('./routes/events')
app.use('/users/trips/events', events)

const login = require('./routes/login')
app.use('/login', login)

const register = require('./routes/register')
app.use('/register', register)



///////// EXPRESS PORT /////////
app.listen(port, () => {
    console.log(`You are listening on port ${port}`);
});


