'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailTransactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      total: {
        type: Sequelize.INTEGER
      },
      transactionId: {
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

    await queryInterface.dropTable('detailTransactions');
  }
};