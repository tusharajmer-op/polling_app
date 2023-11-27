const token = require('./jwt')

const check_incoming_request = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).send("Please provide the token")
    }
    const token_data = token.verify_token(authorization);
    if (!token_data.status) {
        return res.status(400).send(token_data.message);
    }

    req.body.user_id = token_data.message.user_id;
    req.body.username = token_data.message.username;
    next();
}
module.exports = check_incoming_request