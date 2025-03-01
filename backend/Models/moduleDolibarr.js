module.exports = (Sequelize, DataTypes) => {
    const ModuleDolibarr = Sequelize.define("ModuleDolibarr", {
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
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        version_dolibarr: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        version_module: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prix_ht: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        prix_ttc: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        timestamps: true,
    });

    return ModuleDolibarr;
};