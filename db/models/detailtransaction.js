'use strict';
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Transaction.hasOne(DetailTransaction);
      DetailTransaction.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        as: 'transaction'
      });
    }
  }
  DetailTransaction.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    total: DataTypes.STRING,
    transactionId: {
      type: DataTypes.UUID,
      references: {
        model: 'Transaction',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'detailTransaction',
  });
  return DetailTransaction;
};