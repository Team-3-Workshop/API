const Validator = require("fastest-validator");
const { User } = require("../models");
const { Op } = require("sequelize");
const e = require("express");
const user = require("../models/user");

const v = new Validator();

module.exports = {
  index: async (req, res) => {
    const users = await User.findAll({
      order: [["firstName", "asc"]],
    });

    return res.json({
      success: true,
      message: "Users Found",
      data: users,
    });
  },
  search: async (req, res) => {
    const search = req.query.keyword;

    let users = await User.findAll({
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });

    if (users.length > 0) {
      return res.status(200).json({
        success: true,
        message: "User Found",
        data: users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: users,
      });
    }
  },
  show: async (req, res) => {
    const id = req.params.id;
    const users = await User.findByPk(id);

    return res.json(
      {
        success: true,
        message: "User Found",
        data: users,
      } || {
        success: false,
        message: "User not found!",
        data: users,
      }
    );
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
      password: "string",
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const user = await User.create(req.body);

    res.json({
      success: true,
      message: "User has been Submitted successfully!",
      data: user,
    });
  },
  update: async (req, res) => {
    const id = req.params.id;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: user,
      });
    }

    const schema = {
      firstName: "string|optional",
      lastName: "string|optional",
      email: "string|optional",
      password: "string|optional",
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: user,
      });
    }

    user = await user.update(req.body);
    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: user,
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  },
};
