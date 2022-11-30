const Validator = require("fastest-validator");
const { Hotel, sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");

const v = new Validator();

module.exports = {
  get: async (req, res) => {
    const hotels = await Hotel.findAll({
      order: [["name", "ASC"]],
    });

    if (!hotels) {
      return res.status(404).json({
        success: false,
        message: "Hotel not Found",
        data: hotels,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotels Found",
      data: hotels,
    });
  },
  find: async (req, res) => {
    const id = req.params.id;

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not Found",
        data: hotel,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotel Found",
      data: hotel,
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

    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hotel has been Submited successfully!",
      data: hotel,
    });
  },
  update: async (req, res) => {
    const id = req.params.id;

    let hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found!",
        data: hotel,
      });
    }

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
        data: hotel,
      });
    }

    hotel = await hotel.update(req.body);

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const hotel = await Hotel.findByPk(id);

    if(!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not Found",
        data: hotel
      });
    }

    await hotel.destroy();

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
      data: null
    });
  }
};
