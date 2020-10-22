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
app.use('/users', require('./routes/users'));
app.use('/trips', require('./routes/trips'));
app.use('/events', require('./routes/events'));
app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

///////// EXPRESS PORT /////////
app.listen(port, () => {
    console.log(`You are listening on port ${port}`);
});


