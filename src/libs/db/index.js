'use strict'
module.exports = function(user) {
    user.findAll({where: {email:"adm@teste.com"}}).then(result => {
        if (result.length === 0) {
            user.create({ name:"Administrador", email:"adm@teste.com", password:"987654"})
        }
    })
 
}