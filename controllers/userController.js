const Validator = require("fastest-validator");
const { User, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const v = new Validator();

module.exports = {
  index: async (req, res) => {
    // const users = await sequelize.query(
    //   "SELECT * FROM `Users` ORDER BY `firstName`"
    // );
    const users = await User.findAll({
      order: [['firstName', 'ASC']]
    });

    return res.json({
      success: true,
      message: "Users Found",
      data: users,
    });
  },
  search: async (req, res) => {
    const search = req.query.keyword;

    const users = await sequelize.query(
      "SELECT * FROM Users WHERE fullName LIKE :search ORDER BY Users.firstName ASC",
      {
        replacements: { search: `%${search}%` },
        type: QueryTypes.SELECT
      }
    );

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
    // const users = await sequelize.query(
    //   "SELECT * FROM Users WHERE id=:id",
    //   {
    //     replacements: { id: id },
    //     type: QueryTypes.SELECT
    //   }
    // );

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
      },
      lastName: {
        type: "string",
        alpha: true,
      },
      fullName: {
        type: "string",
        alpha: true
      },
      citizen: {
        type: "enum",
        value: ["WNI", 'WNA']
      },
      nik: {
        type:"string",
        length: 16,
        numeric: true
      },
      adreess : {
        type: "string",
      },
      date: {
        type: "string"
      },
      phone: {
        type: "string",
        numeric: true
      },
      email: "email",
      password: {
        type: "string",
        min: 8,
        singleLine: true
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

    const user = await User.create(req.body);

    res.status(201).json({
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
      roleId: "string|optional"
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
    res.status(200).json({
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

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  },
};
