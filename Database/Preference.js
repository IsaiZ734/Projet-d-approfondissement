const {Model, DataTypes} = require("sequelize")
const sequelize = require("./database");
const Users = require("./Users");

class Preference extends Model {
}

Preference.init({
    darkMode: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

    numberOfIncidents: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    user: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: Users,
            key: "user"
        }
    },
    timestamps: false,
    createdAt: false,
    updatedAt: false,

}, {sequelize});

module.exports = Preference