const { DataTypes } = require('sequelize');
const AuthTokenModel = require('./authToken')
const bcrypt = require('bcrypt');
const {encryptPassword} = require('../../libs/crypt')

class User{
    constructor(db){
        this.db = db;
        this.db.define('User',{
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique:true
            },
			password:{
				type: DataTypes.STRING,
				allowNull: false
			},
			email:{
				type: DataTypes.STRING,
				allowNull: false,
				unique:true,
				validate: {
					isEmail: true
				}
			}
        }, {
            freezeTableName: true,
            hooks: {
                beforeCreate: async (user, options)=>{                    
                    user.password = await encryptPassword(user);
                }         
            },
            db
		  });
		  
          this.db.models.User.authenticate =  (async function(email, password) {
            const user = await this.db.models.User.findOne({ where: { email } });
            if (bcrypt.compareSync(password, user.password)) {
              return user.authorize(user);
            }
            throw new Error('invalid password');
          }).bind(this);
		  
		  this.db.models.User.prototype.authorize =  (async function (user) {            
            const authToken = await AuthTokenModel(this.db).generate(user.id);
        
            return { authToken }
          }).bind(this);
        
    }
    getInstance(){
        return this.db.models.User;
    }
}

module.exports = User;