const Validator = require("fastest-validator");
const { User, sequelize, Transaction } = require("../db/models");
const { QueryTypes, Op } = require("sequelize");

const v = new Validator();

module.exports = {
  get: async (req, res) => {
    const users = await User.findAll({
      include: Transaction,
      order: [["firstName", "ASC"]],
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
        type: QueryTypes.SELECT,
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
  find: async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      include: Transaction,
    });

    return res.json(
      {
        success: true,
        message: "User Found",
        data: user,
      } || {
        success: false,
        message: "User not found!",
        data: user,
      }
    );
  },
  getTransactions: async (req, res) => {
    const id = req.params.id;

    const transactions = await Transaction.findAll({
      where: {
        userId: id,
      },
    });

    return res.status(200).json(transactions);
  },
  getTransaction: async (req, res) => {
    const id = req.params.id;
    const trans = req.params.trans;

    // const transaction = await Transaction.findAll({
    //   where: {
    //     [Op.and]: [{ id: trans }, { userId: id }],
    //   },
    // });

    // const transaction = await sequelize.query(
    //   "SELECT * FROM Transactions WHERE userId=:id AND id=:trans",
    //   {
    //     replacements: { 
    //       id: id,
    //       trans: trans
    //      },
    //     type: QueryTypes.SELECT,
    //   }
    // )

    const transaction = await Transaction.findByPk(trans);

    if(!transaction) {
      return res.status(404).json({
        success: false,
        message: "User Transaction not Found",
        data: transaction
      });
    }

    res.status(200).json({
      success: true,
      message: true,
      data: transaction
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
      citizen: {
        type: "enum",
        values: ["WNI", "WNA"],
        optional: true,
      },
      nik: {
        type: "string",
        length: 16,
        numeric: true,
        optional: true,
      },
      address: {
        type: "string",
        optional: true,
      },
      date: {
        type: "string",
        optional: true,
      },
      phone: {
        type: "string",
        numeric: true,
        optional: true,
      },
      email: {
        type: "email",
        optional: true,
      },
      password: {
        type: "string",
        min: 8,
        singleLine: true,
        optional: true,
      },
      role: {
        type: "enum",
        values: ["user", "admin"],
        optional: true,
      },
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
