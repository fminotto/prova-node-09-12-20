module.exports = {
    dbName: process.env.DB_NAME,
    dbPass:process.env.DB_PASS,
    dbUser: process.env.DB_USER,
    host:{
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        define:{
            paranoid: true
        }
    }
}