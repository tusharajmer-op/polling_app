const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
}
const check_password = async (password, hashed_password) => {
    const isMatch = await bcrypt.compare(password, hashed_password);
    return isMatch;
}
module.exports = { encrypt, check_password }