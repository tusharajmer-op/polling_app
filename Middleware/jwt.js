const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const generate_token = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET,{expiresIn : 600});
    return token;
}
const verify_token = (token) => {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
}
const expire_token = (token) => {
    const payload = jwt.decode(token);
    const new_token = jwt.sign(payload, JWT_SECRET, { expiresIn: 0 });
    return new_token;
}
module.exports = { generate_token, verify_token, expire_token }