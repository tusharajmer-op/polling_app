const { user_modal } = require('../Modals');
const { error_handler, password_encryption, JWT_SECRET, jwt } = require('../Middleware');
const get_error = require('../utils/database_errors');
const { INVALID_INPUT_MESSAGE, LOGIN_SUCCESSFUL_MESSAGE, INVALID_PASSWORD_MESSAGE, LOGOUT_SUCCESSFUL_MESSAGE } = require('../utils/messages');
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send(INVALID_INPUT_MESSAGE);
        }

        const response = await user_modal.login(username);

        if (!response.status) {
            return res.status(400).send(response.message);
        }

        const hashed_password = response.message[0].password;
        const is_valid = await password_encryption.check_password(password, hashed_password);

        if (is_valid) {
            const token = jwt.generate_token({ 'user_id': response.message[0].user_id, 'username': response.message[0].username });

            if (!token.status) {
                return res.status(400).send(token.message);
            }

            res.status(200).send({ 'message': LOGIN_SUCCESSFUL_MESSAGE, 'token': token.message });
        } else {
            res.status(400).send(INVALID_PASSWORD_MESSAGE);
        }
    } catch (err) {
        next(error_handler.generic_error(err));
    }
};

const register = async (req, res, next) => {
    try {
        const { name, username, password } = req.body;
        const hashed_password = await password_encryption.encrypt(password);
        const response = await user_modal.register(name, username, hashed_password);

        if (response.status) {
            const token = jwt.generate_token({ 'user_id': response.user_id, 'username': username });

            if (!token.status) {
                next(error_handler.invalid_input(token.message));
            }

            res.status(200).send({ "message": response.message, "token": token.message });
        } else {
            const error_message = get_error(response.message.errno);

            if (error_message.status) {
                next(error_message.message());
            } else {
                next(error_handler.invalid_input());
            }
        }
    } catch (err) {
        next(error_handler.generic_error(err));
    }
};

const logout = async (req, res) => {
    res.send(LOGOUT_SUCCESSFUL_MESSAGE);
};

module.exports = { login, register, logout };
