const Validator = require("fastest-validator");
const { Transportation, Tour, sequelize } = require("../db/models");
// const Transportation = require('../db/models/transportation')

const v = new Validator();

module.exports = {
  get: async (req, res) => {
    const transportations = await Transportation.findAll({
      include: Tour,
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
  find: async (req, res) => {
    const id = req.params.id;

    const transportation = await Transportation.findByPk(id, {
      include: Tour
    });

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation not Found",
        data: transportation,
      });
    }

    res.status(200).json({
      success: true,
      message: "Transportation Found",
      data: transportation,
    });
  },
  create: async (req, res) => {
    const schema = {
      name: {
        type: "string",
      },
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const transportation = await Transportation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Transportation has been Submitted successfully",
      data: transportation,
    });
  },
  update: async (req, res) => {
    const id = req.params.id;

    let transportation = await Transportation.findByPk(id);

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation not Found",
        data: transportation,
      });
    }

    const schema = {
      name: {
        type: "string",
        optional: true
      },
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: transportation,
      });
    }

    transportation = await transportation.update(req.body);

    res.status(200).json({
      success: true,
      message: "Transportation updated successfully",
      data: transportation,
    });
  },
  delete: async (req, res) => {
    const id = req.params.id

    const transportation = await Transportation.findByPk(id)

    if(!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation not Found",
        data: transportation
      })
    }
    
    await transportation.destroy()

    res.status(200).json({
      success: true,
      message: "Transportation deleted successfully",
      data: null
    })
  },
};
