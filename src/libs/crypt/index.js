const bcrypt = require('bcrypt');

encryptPassword = async function(obj){
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS || 10);
    return await bcrypt.hash(obj.password, salt)
}

module.exports = {encryptPassword};