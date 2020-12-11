const Database = require('./../database');
const auth = require('../libs/auth')
const usersModel = require('../models/users/usersModel');


module.exports = function (apiRoutes) {  
    let db = new Database().conn();    
    let users = new usersModel(db).getInstance();
    require('../models/users/authToken')(db);
    require('./routes/users')(db, auth, apiRoutes, users);
    db.sync();
    require('../../src/libs/db')(users);
}