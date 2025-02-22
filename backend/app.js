const express = require('express')
const user = require('./Models/Users')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = require('./db/db')
require('dotenv').config()

app.use(express.json());

const app = express()
const port = process.env.PORT || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const User = user(sequelize, Sequelize);

/**
 * Sécurité et login
 */
app.post('/login', (req, res) => {
    let login = req.body.email
    let password = req.body.password
    User.findOne({
        where:{
            [Sequelize.Op.or]: [
                {email: login},
                {username: login}
            ],
            password: password
            }
        })
        .then((user) => {
            if (user) {
                res.status(200).json({message: 'Connexion réussi', user: user})
            } else {
                res.status(401).json({error: 'Indentifiant invalides'})
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la recherche de l\'utilisateur')
            res.status(500).json({error: 'Erreur serveur lors de la connexion'})
        })
})

// Synchroniser Sequelize avec la base de données
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur lancé sur le port ${PORT}`)
        console.log ("📌 Base de données synchronisée !");
    });
});
