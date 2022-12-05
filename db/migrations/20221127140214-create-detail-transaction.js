'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailTransactions', {
      transactionId: {
        type: Sequelize.UUID
      },
      total: {
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

    await queryInterface.addConstraint('DetailTransactions', {
      fields: ['transactionId'],
      type: 'foreign key',
      name: 'transaction_detailTransaction_association',
      references: {
        table: 'Transactions',
        field: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('DetailTransactions', 'transaction_detailTransaction_association');

    await queryInterface.dropTable('DetailTransactions');
  }
};