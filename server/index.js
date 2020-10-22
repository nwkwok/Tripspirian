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
app.use('/trips', trips)

const events = require('./routes/events')
app.use('/events', events)

const login = require('./routes/login')
app.use('/', login) // '/login' specified in route file for validinfo.js purposes

const register = require('./routes/register')
app.use('/', register) // '/register' specified in route file for validinfo.js purposes

///////// POST LOG-IN ///////// 


// Dashboard
// Trip Hub


///////// EXPRESS PORT /////////
app.listen(port, () => {
    console.log(`You are listening on port ${port}`);
});


