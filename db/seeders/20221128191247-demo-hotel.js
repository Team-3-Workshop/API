"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Hotels", [
      {
        id: uuidv4(),
        name: "Hotel California",
        address: "Jln. Albania, Bali",
        description: "2 kamar dengan Bed King Size",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Hotel Sanjaya",
        address: "Bumi Raya Hill, Jakarta",
        description: "5 kamar dengan masing-masing single bed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Hotel POP",
        address: "Jln. Panglima Soedirman, Malang",
        description: "1 Kamar single bed King Size, balkon, dan kolam renang outdoor. Cocok untuk pasangan yang sedang bulan madu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Hotels", null, {});
  },
};
