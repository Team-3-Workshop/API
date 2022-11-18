const Validator = require("fastest-validator");
const { User } = require("../models");
const { Op } = require('sequelize');
const e = require("express");

const v = new Validator();

module.exports = {
  index: async (req, res) => {
    const users = await User.findAll({
      order: [['firstName', 'asc']]
    });

    return res.json(users);
  },
  search: async (req, res) => {
    const search = req.query.keyword;
    
    let users = await User.findAll({
      where: {
        [Op.or]: [{
          firstName: {
            [Op.like]: `%${search}%`
          }
        }, {
          lastName: {
            [Op.like]: `%${search}%`
          }
        }]
      }
    });

    if(users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({
        message: "User not found!"
      });
    }
  },
  show: async (req, res) => {
    const id = req.params.id;
    const users = await User.findByPk(id);

    return res.json(users || { message: "User not found!" });
  },
  store: async (req, res) => {
    const schema = {
      firstName: {
        type: "string",
        alpha: true,
        min: 6,
      },
      lastName: {
        type: "string",
        alpha: true,
        min: 6,
      },
      email: "email",
    //   password: "string"
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json(validated);
    }

    const user = await User.create(req.body);

    res.json(user);
  },
  update: async (req, res) => {
    const id = req.params.id;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const schema = {
      firstName: "string|optional",
      lastName: "string|optional",
      email: "string|optional",
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json(validated);
    }

    user = await user.update(req.body);
    res.json(user);
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    await user.destroy();

    res.json({
      message: "User deleted!",
    });
  },
};
