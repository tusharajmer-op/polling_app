const { promisePool } = require('./connect');


const login = async (uname) => {
    try{ 
        if (uname == undefined){
            return { 'status': false, 'message': 'username and password is required' };
        }
        const response = await  promisePool.query('SELECT user_id,username,password FROM users where username = ?',[uname],)
        if (response[0].length == 0){
            return { 'status': false, 'message': 'user does not exists' };
        }
        return { 'status': true, 'message': response[0] };
    }
    catch(err){
        return false,err
    }
}
const register = async (name, username, password) => {
    try {
        await promisePool.query('START TRANSACTION'); 
        const response = await promisePool.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?);', [name, username, password]);
        const user_id  = await promisePool.query('SELECT LAST_INSERT_ID() AS user_id;')
        await promisePool.query('COMMIT'); 
        return { 'status': true, 'message': 'user registered successfully','user_id':user_id[0].user_id };
    } catch (err) {
        console.log(err)
        await promisePool.query('ROLLBACK');
        return { 'status': false, 'message': err };
    }
}
const logout = async (req, res) => {

}  

module.exports = { login, register, logout}