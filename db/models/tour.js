'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsTo(models.Hotel, {
        foreignKey: 'id'
      });
      Tour.belongsTo(models.Transportation, {
        foreignKey: 'id'
      });
      Tour.belongsTo(models.TourGuide, {
        foreignKey: 'id'
      });
    }
  }
  Tour.init({
    destination: DataTypes.STRING,
    description: DataTypes.TEXT,
    hotelId: DataTypes.UUID,
    transportationId: DataTypes.UUID,
    tourGuideId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Tour',
    tableName: 'Tours'
  });
  return Tour;
};