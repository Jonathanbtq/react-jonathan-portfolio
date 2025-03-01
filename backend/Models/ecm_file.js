module.exports = (Sequelize, DataTypes) => {
    const EcmFiles = Sequelize.define("Ecm_Files", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        object_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true, // Active `createdAt` et `updatedAt`
        indexes: [
            {
                unique: true,
                fields: ['filename', 'object_id'] // Évite les conflits de fichiers pour un même objet
            }
        ]
    });

    return EcmFiles;
};
