const Sequelize = require('sequelize');
const config = require('./config');

class Database{
    constructor(){
        this.db = new Sequelize(
            config.dbName, 
            config.dbUser, 
            config.dbPass,
            config.host);
    }
    conn(){
        return this.db;
    }
}

module.exports = Database;