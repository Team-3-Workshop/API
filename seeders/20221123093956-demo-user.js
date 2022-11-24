"use strict";

const { v4: uuidv4 } = require('uuid');

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
    await queryInterface.bulkInsert("Users", [{
      id: uuidv4(),
      firstName: 'Sulthon',
      lastName: 'Abadi',
      fullname: "Sulthon Muhtarom Putra Abadi",
      citizen: "WNI",
      nik: "3513141212020004",
      address: "Probolinggo",
      date: "2002-12-12",
      phone: "081231989438",
      email: "sulthon@gmail.com",
      password: "sulthon1234",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user"
    }, {
      id: uuidv4(),
      firstName: 'Adam',
      lastName: 'Lazuardi',
      fullname: "Adam Davala Lazuardi",
      citizen: "WNA",
      nik: "3513141808010004",
      address: "Probolinggo",
      date: "2001-08-18",
      phone: "081231989123",
      email: "adam@gmail.com",
      password: "adam1234",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user"
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
