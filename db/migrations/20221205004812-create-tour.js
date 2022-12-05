'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      destination: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      hotelId: {
        type: Sequelize.UUID
      },
      transportationId: {
        type: Sequelize.UUID
      },
      tourGuideId: {
        type: Sequelize.UUID
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

    await queryInterface.addConstraint('Tours', {
      fields: ['hotelId'],
      type: 'foreign key',
      name: 'tour_hotel_association',
      references: {
        table: 'Hotels',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addConstraint('Tours', {
      fields: ['transportationId'],
      type: 'foreign key',
      name: 'tour_transportation_association',
      references: {
        table: 'Transportations',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addConstraint('Tours', {
      fields: ['tourGuideId'],
      type: 'foreign key',
      name: 'tour_tourGuide_association',
      references: {
        table: 'TourGuides',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  }
};