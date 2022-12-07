'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert("Transportations", [
      {
        id: uuidv4(),
        name: "Bus Patas SaintSaiya",
        capacity: 100,
        description: "Penumpang akan mendapatkan makan saat di perjalanan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bus Pariwisata Maulani",
        capacity: 50,
        description: "Pelayanan kelas atas dengan fasilitas lengkap",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bus Ekonomi Jaya Makmur",
        capacity: 50,
        description: "Perjalanan aman, nyaman, dan menyenagkan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Transportations", null, {});
  }
};
