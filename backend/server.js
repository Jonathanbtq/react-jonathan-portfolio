const express = require("express");
const sequelize = require("./db/db");
const User = require("./Models/User");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Synchroniser Sequelize avec la base de données
sequelize.sync({ force: false }).then(() => {
  console.log("📌 Base de données synchronisée !");
});

app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));