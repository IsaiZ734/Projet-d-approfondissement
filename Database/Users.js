const { Model, DataTypes }=require("sequelize");
const sequelize=require("./database");

class Users extends Model{}

Users.init({
        user:{
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
        },

        role:{
            type: DataTypes.TEXT,
            allowNull: false
        },

        email:{
            type: DataTypes.TEXT,
            allowNull:false
        },
    
        password : { 
            type: DataTypes.TEXT,
            allowNull: false
        },
    
        firstName : {
            type: DataTypes.TEXT,
            allowNull : false
        },
    
        lastName : {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{sequelize})
module.exports=Users