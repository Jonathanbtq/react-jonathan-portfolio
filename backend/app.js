const express = require('express')
const sequelize = require('./db/db')
const multer = require("multer");
const user = require('./Models/User')
const Consts = require('./Models/Const')
const moduleDolibarrs = require('./Models/moduleDolibarr')
const Ecm_Filess = require('./Models/ecm_file')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
require('dotenv').config()

const PORT = process.env.PORT || 3500;
const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
const User = user(sequelize, Sequelize);
const Const = Consts(sequelize, Sequelize);
const moduleDolibarr = moduleDolibarrs(sequelize, Sequelize);
const Ecm_Files = Ecm_Filess(sequelize, Sequelize);

const path = require('path'); // Assure-toi d'importer le module `path`

const fs = require('fs');
const createFolderIfNotExists = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};
createFolderIfNotExists("uploads/modules/");
createFolderIfNotExists("uploads/modules/zip/");

const storageImgModule = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/modules/"); // 📁 Dossier où seront stockées les images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 🔄 Renommer le fichier avec un timestamp
    },
});
const upload = multer({ storage: storageImgModule });

// Upload des fichiers Zip
const storageZipFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/modules/zip"); // 📁 Dossier où seront stockées les images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // 🔄 Renommer le fichier avec un timestamp
    },
})
const uploadZip = multer({ storage: storageZipFile});

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
    const { name, value, note, active } = req.body;
    
    // ✅ Vérifie si les champs obligatoires sont présents
    if (!name || !value) {
        return res.status(400).json({ error: "Name and value are required" });
    }

    try {
        const [consts, created] = await Const.findOrCreate({
            where: {name},
            defaults: { 
                value, 
                note: note || '', 
                active: active !== undefined ? active : true 
            }
        });
        if (created) {
            res.status(201).json({message: "Variable créer", value: consts});
        } else {
            res.status(400).json({ message: 'Variable already exists', value: 'error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

/**
 * Récupération des Consts global
 */
app.get('/getConstValue', async (req, res) => {
    // console.log(Const);
    try {
        const variables = await Const.findAll({ raw: true });
        if (!variables || variables.length === 0) {
            return res.status(404).json({ error: "Aucune variable trouvée" });
        }

        const formattedVariables = {};
        variables.forEach(variable => {
            if (variable.name !== undefined) {
                formattedVariables[variable.name] = variable.value;
            } else {
                console.error("Clé manquante pour la variable :", variables);
            }
        });

        res.json(formattedVariables);

    } catch (error) {
        console.error("Erreur lors de la récupération des variables globales:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

/**
 * Récupération des Consts global
 */
app.get('/getConst', async (req, res) => {
    // console.log(Const);
    try {
        const variables = await Const.findAll({ raw: true });
        if (!variables || variables.length === 0) {
            return res.status(404).json({ error: "Aucune variable trouvée" });
        }

        res.json(variables);
    } catch (error) {
        console.error("Erreur lors de la récupération des variables globales:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/updateConst', async (req, res) => {
    const updatedConstData = req.body; // Données envoyées depuis le client

    try {
         // On vérifie si toutes les données nécessaires sont présentes
         if (!updatedConstData || !Array.isArray(updatedConstData)) {
            return res.status(400).json({ error: "Les données envoyées ne sont pas valides" });
        }

        let updatedRecords = []; // Stocker les enregistrements mis à jour

        // Mise à jour des constantes dans la base de données
        for (const data of updatedConstData) {
            const { id, name, value, note, active } = data;

            if (!id) {
                return res.status(400).json({ error: "L'ID est requis pour chaque constante" });
            }

            // Effectuer la mise à jour de chaque constante par son ID
            const [updatedRowCount] = await Const.update(
                { name, value, note, active }, // Données à mettre à jour
                { where: { id }, returning: true } // Condition de mise à jour avec l'ID
            );

            if (updatedRowCount === 0) {
                return res.status(404).json({ error: `Constante avec l'ID ${id} non trouvée` });
            }

            // Ajouter les données mises à jour à la liste des résultats
            updatedRecords.push({ id, name, value, note, active });
        }

        return res.status(200).json({ message: "Les constantes ont été mises à jour avec succès", data: updatedRecords });
    } catch (error) {
        console.error("Une erreur est survenue lors de l'update de la constante", error);
        res.status(500).json({error: "Internat Server Error"});
    }
})

app.post('/addDoliModule', upload.fields([
        { name: "file", maxCount: 1 },
        { name: "zipFile", maxCount: 1 }
    ]), async (req, res) => {
    try {
        const { name, ref, description, version_dolibarr, version_module, prix_ht, prix_ttc, active } = req.body;
        
        // Vérification des fichiers
        const imgFile = req.files['file'] ? req.files['file'][0] : null;
        const zipFile = req.files['zipFile'] ? req.files['zipFile'][0] : null;

        if (!name || !ref || !version_dolibarr || !version_module || !active) {
            return res.status(400).json({ error: "Les données envoyées ne sont pas valides" });
        }

        const nouveauModule = await moduleDolibarr.create({
            name,
            ref,
            version_dolibarr,
            description,
            version_module,
            prix_ht,
            prix_ttc,
            active
        })

         // Ajout de l'image (si présente)
         if (imgFile) {
            await Ecm_Files.create({
                filename: imgFile.filename,
                object_id: nouveauModule.id,
                description,
                path: imgFile.path,
            });
        }

        // Ajout du fichier ZIP
        await Ecm_Files.create({
            filename: `${zipFile.filename}_${nouveauModule.id}.zip`,
            object_id: nouveauModule.id,
            description: "Zip du module",
            path: `uploads/modules/zip/${zipFile.filename}`,
        });

        return res.status(200).json({ message: "Le module a été ajouté avec succès", data: nouveauModule });
    } catch (error) {
        console.error("Une erreur est survenue lors de l'update de la constante", error);
        res.status(500).json({error: "Internat Server Error"});
    }
})

app.get('/getModules', async (req, res) => {
    try {
        const modules = await moduleDolibarr.findAll();
        res.json(modules); // Envoie les modules sous forme de JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des modules:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Synchroniser Sequelize avec la base de données
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur lancé sur le port ${PORT}`)
        console.log ("📌 Base de données synchronisée !");
    });
});
