const { Model, DataTypes } = require("sequelize")
const sequelize = require("./database")
class Incident extends Model{}

Incident.init({
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    address : { 
        type: DataTypes.TEXT,
        allowNull: false
    },

    date : {
        type : DataTypes.DATE,
        allowNull : false
    },

    user : {
        type: DataTypes.TEXT,
        allowNull: false,
        foreignKey:true,

    }
},{sequelize});

module.exports=Incident