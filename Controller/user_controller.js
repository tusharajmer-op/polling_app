const { user_modal } = require('../Modals')
const { error_handler,password_encryption,JWT_SECRET, jwt } = require('../Middleware')
const get_error = require('../utils/database_errors')
const login = async (req, res) => {
    try{

    const { username, password } = req.body
    const response = await user_modal.login(username)
    
    if(response.status==false){
        return res.status(400).send(response.message)
    }
    const hashed_password = response.message[0].password
    const is_valid = await password_encryption.check_password(password,hashed_password)
    const tokken = jwt.generate_token({'user_id':response.message[0].user_id,'username':response.message[0].username})
    is_valid? res.status(200).send({'message':'login successfull','tokken':tokken}): res.status(400).send('invalid password ')
    
}
    catch(err){
        next(error_handler.generic_error())
    }
}

const register = async (req, res, next) => {
    try{
    const { name, username, password } = req.body
    const hashed_password = await password_encryption.encrypt(password)
    const response = await user_modal.register(name, username, hashed_password)
    if (response.status == true) {
        const token = jwt.generate_token({'user_id':response.user_id,'username':username})
        res.status(200).send({"message":"response.message","token":token})
    }
    else {
        error_message = get_error(response.message.errno)
        if (error_message.status == true)
            next(error_message.message())
        else
            next(error_handler.invalid_input())
    }}catch(e){
        next(error_handler.generic_error())
    }

}

const logout = async (req, res) => {

    return "logout working "
}

module.exports = { login, register, logout }