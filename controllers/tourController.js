const Validator = require("fastest-validator");
const {
  Tour,
  Hotel,
  Transportation,
  TourGuide,
  Sequelize,
} = require("../db/models");

const v = new Validator();

module.exports = {
  get: async (req, res) => {
    const where = {};

    const schema = {
      destination: {
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

    const { destination } = req.query;

    if (destination)
      where.destination = { [Sequelize.Op.like]: `%${destination}%` };

    // const tours = await Tour.findAll({
    //   where,
    //   include: [
    //     {
    //       model: Hotel,
    //     },
    //     {
    //       model: Transportation,
    //     },
    //     {
    //       model: TourGuide,
    //     },
    //   ],
    //   order: [["destination", "ASC"]],
    // });

    const tours = await Tour.findAll({
        where,
        include: [
          {
            model: Hotel
          },
          {
            model: Transportation
          },
          {
            model: TourGuide
          }
        ]
    })

    if (!tours) {
      return res.status(404).json({
        success: false,
        message: "Tour not Found",
        data: tours,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour Found",
      data: tours,
    });
  },
  create: async (req, res) => {
    const schema = {
      destination: {
        type: 'string',
      },
      description: {
        type: 'string'
      },
      hotelId: {
        type: 'uuid'
      },
      transportationId: {
        type: 'uuid'
      },
      tourGuideId: {
        type: 'uuid'
      }
    }

    const validated = v.validate(req.body, schema)

    if(validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null
      })
    }

    const tour = await Tour.create(req.body)

    res.status(201).json({
      success: true,
      message: "Tour has been submitted successfully",
      data: tour
    })
  }
};
