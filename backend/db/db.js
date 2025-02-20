const { Sequelize, DataTypes } = require('sequelize')
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
    }
)

sequelize.authenticate()
    .then(_=> console.log('La connexion'))
    .catch(error => console.error(`Impossible d'établir uine connexion avec ${error}`))

sequelize.sync()
    .then(_=> console.log('La base de données a bien été synchornisée'))

module.exports = sequelize