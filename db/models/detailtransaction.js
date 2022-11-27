'use strict';
const {
  Model
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
      DetailTransaction.belongsTo(models.Transaction);
    }
  }
  DetailTransaction.init({
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