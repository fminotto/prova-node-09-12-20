const Database = require('./../database');
const auth = require('../libs/auth')

module.exports = function (apiRoutes) {  
    let db = new Database().conn();
    require('./routes/users')(db, auth, apiRoutes);
    db.sync();
}