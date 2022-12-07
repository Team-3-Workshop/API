const {
  Transaction,
  User,
  Hotel,
  Transportation,
  TourGuide,
  Tour,
  DetailTransaction,
  sequelize,
} = require("../db/models");

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  index: async (req, res) => {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Tour,
          include: [
            {
              model: Hotel,
            },
            {
              model: Transportation,
            },
            {
              model: TourGuide,
            },
          ],
        },
      ],
      order: [["createdAt"]],
    });

    if (!transactions.length) {
      return res.status(404).json({
        success: false,
        message: "Transactions not Found",
        data: transactions,
      });
    }

    res.json({
      success: true,
      message: "Transactions Found",
      data: transactions,
    });
  },
  find: async (req, res) => {
    const id = req.params.id;

    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: Tour,
          include: [
            {
              model: Hotel,
            },
            {
              model: Transportation,
            },
            {
              model: TourGuide,
            },
          ],
        },
      ],
      order: [["createdAt"]],
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Tour not Found",
        data: transaction,
      });
    }

    return res.json(transaction);
  },
  update: async (req, res) => {
    const id = req.params.id;

    let transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not Found",
        data: transaction,
      });
    }

    const schema = {
      quantity: {
        type: "number",
        integer: true,
        optional: true,
      },
      total: {
        type: "number",
        integer: true,
        optional: true,
      },
      tourId: {
        type: "uuid",
        optional: true,
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

    let detailTransaction = await DetailTransaction.findByPk(id);

    transaction = await transaction.update({
      quantity: req.body.quantity,
    });

    detailTransaction = await detailTransaction.update({
      total: req.body.total,
      tourId: req.body.tourId,
    });

    const newTransaction = await Transaction.findByPk(id, {
      include: DetailTransaction,
    });

    res.status(201).json({
      success: true,
      message: "Transaction updated successfully",
      data: newTransaction,
    });
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const transaction = await Transaction.findByPk(id);

    const detailTransaction = await DetailTransaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not Found",
        data: transaction,
      });
    }

    await transaction.destroy();
    await detailTransaction.destroy();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: null,
    });
  },
};
