const { Model, DataTypes } = require("sequelize")
const sequelize = require("./database");
const Users = require("./Users");
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

    user: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model:Users,
            key:"user"
        }
    }
},{sequelize});

module.exports=Incident