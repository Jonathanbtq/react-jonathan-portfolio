module.exports = (sequelize, DataTypes) => {
const Const = sequelize.define("Const", {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    value: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
    note: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
    active: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    tms: {
    type: DataTypes.DATE,
    allowNull: false,
    },
}, {
    timestamps: true, // Active la gestion automatique des timestamps
    createdAt: 'tms', // Utilise le champ 'tms' pour le timestamp de création
    updatedAt: false  // Désactive la mise à jour automatique du timestamp
});

return Const
}