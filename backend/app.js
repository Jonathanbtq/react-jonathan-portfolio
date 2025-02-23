const express = require('express')
const sequelize = require('./db/db')
const user = require('./Models/User')
const Consts = require('./Models/Const')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
require('dotenv').config()

const PORT = process.env.PORT || 3500;
const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const User = user(sequelize, Sequelize);
const Const = Consts(sequelize, Sequelize);

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
            console.error('Erreur lors de la recherche de l\'utilisateur:', error); // Affiche l'erreur dans la console
            res.status(500).json({ 
                error: 'Erreur serveur lors de la connexion',
                details: error.toString() // Ajoute les détails de l'erreur
            });
        });        
})

/**
 * Création d'une variable d'environnement
 */
app.post('/addconst', async (req, res) => {
    if (req.body) {
        try {
            const {name, value, active, note} = req.body;
            const [consts, created] = await Consts.findOrCreate({
                where: {name},
                defaults: {value, description}
            });
            if (created) {
                res.status(201).json({mesage: "Variable created", value: consts});
            } else {
                res.status(400).json({ error: 'Variable already exists' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})

/**
 * Récupération des Consts global
 */
app.get('/getConst', async (req, res) => {
    try {
        const variables = await Const.findAll();
        const formattedVariables = {};
    
        variables.forEach(variable => {
        formattedVariables[variable.key] = variable.value;
        });

        res.json(formattedVariables);
    } catch {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// Synchroniser Sequelize avec la base de données
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur lancé sur le port ${PORT}`)
        console.log ("📌 Base de données synchronisée !");
    });
});
