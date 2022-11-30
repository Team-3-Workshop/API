const Validator = require("fastest-validator");
const { Transportation, sequelize } = require("../db/models");
// const Transportation = require('../db/models/transportation')

const v = new Validator();

module.exports = {
  get: async (req, res) => {
    const transportations = await Transportation.findAll({
      order: [["name", "ASC"]],
    });

    if (!transportations) {
      return res.status(404).json({
        success: false,
        message: "Transportations not Found",
        data: transportations,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transportations Found",
      data: transportations,
    });
  },
};
