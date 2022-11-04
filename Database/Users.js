const { Model, DataTypes }=require("sequelize");
const sequelize=require("./database");

class Users extends Model{}

Users.init({
        user:{
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
            unique:true,
            
        },
        email:{
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
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
        },
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    },{sequelize})
module.exports=Users