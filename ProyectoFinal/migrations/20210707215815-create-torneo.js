'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('torneos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      fechainicio: {
        type: Sequelize.DATE
      },
      fechafin: {
        type: Sequelize.DATE
      },
      descripcion: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      maximoparticipante: {
        type: Sequelize.INTEGER
      },
      organizadorId: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('torneos');
  }
};