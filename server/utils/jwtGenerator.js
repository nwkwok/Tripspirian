require('dotenv').config();
const jwt = require('jsonwebtoken');

function jwtGenerator(id) {
    const payload = {
        user: id
    }
return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 60 * 60})
}

module.exports = jwtGenerator;