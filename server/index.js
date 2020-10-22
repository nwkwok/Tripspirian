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

const jwtAuth = require('./routes/jwtAuth')
app.use('/', jwtAuth) // 'login' and 'register' routes inside jwtAuth for validation purposes

///////// POST LOG-IN ///////// 

// Dashboard
// Trip Hub


///////// EXPRESS PORT /////////
app.listen(port, () => {
    console.log(`You are listening on port ${port}`);
});


