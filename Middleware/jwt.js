const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const generate_token = (payload) => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 600 });
        return { 'status': true, 'message': token }
    }
    catch (err) {
        
        if (err == jwt.JsonWebTokenError) {
            return { 'status': false, 'message': 'Token Error' };
        }
    }
}
const verify_token = (token) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return { 'status': true, 'message': payload };
    } catch (err) {
        
        if (err.name == 'TokenExpiredError') {
            return { 'status': false, 'message': 'Token Expired' };
        }
        else if (err.name == 'JsonWebTokenError') {
            return { 'status': false, 'message': 'Token Error' };
        }
    }
}
const expire_token = (token) => {
    const payload = jwt.decode(token);
    const new_token = jwt.sign(payload, JWT_SECRET, { expiresIn: 0 });
    return new_token;
}
module.exports = { generate_token, verify_token, expire_token }