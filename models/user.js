"use strict";

const { Model } = require("sequelize");
const { Sequelize } = require(".");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullname: DataTypes.STRING,
      citizen: DataTypes.ENUM("WNI", "WNA"),
      nik: DataTypes.STRING,
      address: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
