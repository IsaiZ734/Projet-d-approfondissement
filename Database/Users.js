const {Model, DataTypes} = require("sequelize");
const sequelize = require("./database");

class Users extends Model {
}

Users.init({
    user: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}, {sequelize})
module.exports = Users