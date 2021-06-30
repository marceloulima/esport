'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Rols', [
      {
       nombre: 'admin',
       createdAt: new Date(),
       updatedAt : new Date()
     },
     {
       nombre: 'organizador',
       createdAt: new Date(),
       updatedAt : new Date()
     },
     {
       nombre: 'participante lider',
       createdAt: new Date(),
       updatedAt : new Date()
     }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
