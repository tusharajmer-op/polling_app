const error_handler = require('../Middleware')
const errors = {
    1062 : error_handler.error_handler.user_already_exists
}
const getError = (err)=>{
    if(err in errors){
        return {'status':true,'message':errors[err]}
    }else{
        return {'status':false,'message':error_handler.error_handler.generic_error}
    }
}
module.exports = getError