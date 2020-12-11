'use strict'
const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize) => {
    const AuthToken = sequelize.define('AuthToken', {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {});

    AuthToken.belongsTo(sequelize.models.User);
   
    AuthToken.generate = async function(UserId) {
      if (!UserId) {
        throw new Error('AuthToken requires a user ID')
      }
      let token = jwt.sign({ id:UserId }, process.env.SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION || 86400 // expires in 1day
      });
  
      return AuthToken.create({ token, UserId })
    }
  
    return AuthToken;
};
  