'use strict'
const { encryptPassword } = require('../libs/crypt')
let users;

class usersController{
    constructor(_usersModel){
        users = _usersModel;
    }

    getUsers(){
        return users.findAll();
    }

    postUsers(body){ 
        let user = body;
        return users.create(user);
    }    

    async updateUsers(body){         
        if (body.password) {            
            body.password = await encryptPassword(body);
        }
        return users.update(body, {
            where : { id: body.id } 
        });
    } 
    
    deleteUsers(body){ 
        return users.destroy({
            where: {
                id: body.id
            }
        })
    }     
    
    async signin(req,res){
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).send(
            'Request missing email or password param'
          );
        }
        try {
            let token = await users.authenticate(email, password)

            return res.json(token);

        } catch (err) {
            console.log(err);
            return res.status(400).send('invalid email or password');
        }
    }

    getLastId() {
        return users.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
          });
    }
}


module.exports = usersController;