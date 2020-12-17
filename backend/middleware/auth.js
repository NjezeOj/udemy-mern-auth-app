const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.jwtSecret

//Authentication middleware

exports.requireLogin = (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1]
            //verify token
            const decode = jwt.verify(token, jwtSecret)
            //Attach token to request
            req.user = decode;
            next();
        }
    } catch (err) {
        console.log("error")
    }
}