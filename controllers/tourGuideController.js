const Validator = require("fastest-validator");
const { TourGuide, Tour } = require("../db/models");

const v = new Validator();

module.exports = {
  get: async (req, res) => {
    const tourGuides = await TourGuide.findAll({
      include: Tour,
      order: [["firstName", "ASC"]],
    });

    if (!tourGuides) {
      return res.status(404).json({
        succcess: false,
        message: "Tour Guides not Found",
        data: tourGuides,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour Guides Found",
      data: tourGuides,
    });
  },
  find: async (req, res) => {
    const id = req.params.id;

    const tourGuide = await TourGuide.findByPk(id, {
      include: Tour
    });

    if (!tourGuide) {
      return res.status(404).json({
        success: false,
        data: tourGuide,
      });
    }

    res.status(200).json({
      succcess: true,
      message: "Tour Guide Found",
      data: tourGuide,
    });
  },
  create: async (req, res) => {
    const schema = {
      firstName: {
        type: "string",
        alpha: true,
      },
      lastName: {
        type: "string",
        alpha: true,
      },
      fullName: {
        type: "string",
      },
      address: {
        type: "string",
      },
      phone: {
        type: "string",
        numeric: true
      },
      email: {
        type: "email"
      }
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const tourGuide = await TourGuide.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tour Guide has been Submitted successfully",
      data: tourGuide,
    });
  },
  update: async (req, res) => {
    const id = req.params.id;

    let tourGuide = await TourGuide.findByPk(id);

    if (!tourGuide) {
      return res.status(404).json({
        success: false,
        message: "Tour Guide not found!",
        data: tourGuide,
      });
    }

    const schema = {
      firstName: {
        type: "string",
        alpha: true,
        optional: true,
      },
      lastName: {
        type: "string",
        alpha: true,
        optional: true,
      },
      fullName: {
        type: "string",
        optional: true,
      },
      address: {
        type: "string",
        optional: true
      },
      phone: {
        type: "string",
        numeric: true,
        optional: true
      },
      email: {
        type: "email",
        optional: true
      }
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: tourGuide,
      });
    }

    tourGuide = await tourGuide.update(req.body);

    res.status(200).json({
      success: true,
      message: "Tour Guide updated successfully",
      data: tourGuide,
    });
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const tourGuide = await TourGuide.findByPk(id);

    if (!tourGuide) {
      return res.status(404).json({
        success: false,
        message: "Tour Guide not Found",
        data: tourGuide,
      });
    }

    await tourGuide.destroy();

    res.status(200).json({
      success: true,
      message: "Tour Guide deleted successfully",
      data: null,
    });
  },
};
