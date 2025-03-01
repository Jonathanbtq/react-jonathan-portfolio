'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ModuleDolibarr', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ref: {
        type: Sequelize.STRING
      },
      version_dolibarr: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      version_module: {
        type: Sequelize.STRING
      },
      prix_ht: {
        type: Sequelize.DECIMAL
      },
      prix_ttc: {
        type: Sequelize.DECIMAL
      },
      active: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ModuleDolibarr');
  }
};