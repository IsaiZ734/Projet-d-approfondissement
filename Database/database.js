// Import Sequelize
const {Sequelize, DataTypes, Model} = require('sequelize')

// Creation of database link
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "preparatoryproject.sqlite"
})
module.exports = sequelize;