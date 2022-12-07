const Validator = require("fastest-validator");
const { Hotel, Tour, Sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");

const v = new Validator();

module.exports = {
  get: async (req, res, next) => {
    const where = {};

    const schema = {
      name: {
        type: "string",
        optional: true,
      },
    };

    const validated = v.validate(req.query, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const name = req.query.name;

    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };

    const hotels = await Hotel.findAll({
      where,
      order: [["name", "ASC"]],
    });

    if (!hotels.length) {
      return res.status(404).json({
        success: false,
        message: "Hotels not Found",
        data: hotels,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotels Found",
      data: hotels,
    });

    next();
  },
  find: async (req, res, next) => {
    const id = req.params.id;

    const hotel = await Hotel.findByPk(id, {
      include: Tour,
    });

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

    next();
  },
  create: async (req, res, next) => {
    const schema = {
      name: {
        type: "string",
      },
      description: {
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

    next();
  },
  update: async (req, res, next) => {
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
        optional: true,
      },
      description: {
        type: "string",
        optional: true,
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

    next();
  },
  delete: async (req, res, next) => {
    const id = req.params.id;

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not Found",
        data: hotel,
      });
    }

    await hotel.destroy();

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
      data: null,
    });

    next();
  },
};
