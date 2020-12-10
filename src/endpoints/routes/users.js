'use strict'
const usersController = require('../../controllers/usersController')

module.exports = function (db, auth, apiRoutes, users) {    
    let verifyToken = new auth().verifyToken;
    
    apiRoutes.post('/signin', (req, res) => {
        /* #swagger.tags = ['Authorization']
           #swagger.description = 'Endpoint para login.'    
           #swagger.parameters['user'] = {
                    in: 'body',
                    description: 'Informações do usuário.',
                    required: true,
                    type: 'object',
                    schema: { $ref: "#/definitions/SignIn" }
           }           
        */     
        new usersController(users).signin(req, res);  
    })

    apiRoutes.get('/users', verifyToken, (req, res) => {
        /* #swagger.tags = ['User']
         #swagger.summary: "Get all users"
         #swagger.description = 'Endpoint para obter um usuário.'
         #swagger.security = [{ "api_key":{
                                                    "api_key": {
                                                    "type": "apiKey",
                                                    "name": "Authorization",
                                                    "in": "header"
                                                    }                   
                                                }
                             }]
        */
        
        new usersController(users).getUsers().then(result => {
            res.status(200).send(result);
        }).catch(err=>{
            console.log(err);
            res.status(500).send('Internal server error');
        });
    })    

    apiRoutes.post('/users/:userAdd', verifyToken, (req, res) => {
        /* #swagger.tags = ['User']
           #swagger.summary: "Add user"
           #swagger.description = 'Endpoint para obter um usuário.'  
           #swagger.security: { $ref: "#securityDefinitions/apiKey" }
           #swagger.parameters['userAdd'] = {
                    in: 'body',
                    description: 'Informações do usuário.',
                    required: true,
                    type: 'object',
                    schema: { $ref: "#/definitions/AddUser" }                    
           } 
           #swagger.security = [{ "api_key":{
                                                    "api_key": {
                                                    "type": "apiKey",
                                                    "name": "Authorization",
                                                    "in": "header"
                                                    }                   
                                                }
                             }]
        */                        
        new usersController(users).postUsers(req.body).then(user=>{
            res.status(200).send(user)
        }).catch(err=>{
            res.status(500).send('Internal server error');
        }); 
    })

    apiRoutes.put('/users/:userUpdate', verifyToken, (req, res) => {
        /* #swagger.tags = ['User']
           #swagger.summary: "update users"
           #swagger.description = 'Endpoint para alterar um usuário.'    
           #swagger.parameters['userUpdate'] = {
                    in: 'body',
                    description: 'Informações do usuário.',
                    required: true,
                    type: 'object',
                    schema: { $ref: "#/definitions/User" }
           } 
           #swagger.security = [{ "api_key":{
                                                    "api_key": {
                                                    "type": "apiKey",
                                                    "name": "Authorization",
                                                    "in": "header"
                                                    }                   
                                                }
                             }]           
           */        
        if(!req.body.id) return res.status(400).send('no id informed!');            

        new usersController(users).updateUsers(req.body).then(updatedRecord=>{
            if(updatedRecord[0] === 1){
                res.status(200).json({sucess: true, error: false, message:"Updated successfully"});          
            }
            else
            {
                res.status(404).json({sucess: false, error: true, message:"record not found"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).send('Internal server error');
        }); 
    })
    
    apiRoutes.delete('/users/:userDel', verifyToken, (req, res) => {
        /* #swagger.tags = ['User']
           #swagger.summary: "Delete users"
           #swagger.description = 'Endpoint para excluir um usuário.' 
           #swagger.parameters['userDel'] = {
              in: 'body',
              description: 'Informações do usuário.',
              required: true,
              type: 'object',
              schema: { $ref: "#/definitions/DelUser" }
          }
          #swagger.security = [{ "api_key":{
                                                    "api_key": {
                                                    "type": "apiKey",
                                                    "name": "Authorization",
                                                    "in": "header"
                                                    }                   
                                                }
                             }]
        */     
        let { id } = req.body;
        if(!id) return res.status(400).send('no id informed!');    
                
        new usersController(users).deleteUsers(req.body).then(function (deletedRecord) {
            if(deletedRecord === 1){
                res.status(200).json({sucess: true, error: false, message:"Deleted successfully"});          
            }
            else
            {
                res.status(404).json({sucess: false, error: true, message:"record not found"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).send('internal server error');
        }); 
    })    

}