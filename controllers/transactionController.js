const { Transaction, User } = require('../db/models')

module.exports = {
    index: async (req, res) => {
        const transactions = await Transaction.findAll({
            include: User,
            order: [['createdAt']]
        });

        return res.json({
            success: true,
            message: "Transactions Found",
            data: transactions
        });
    },
    show: async (req, res) => {
        const id = req.params.id;

        const transaction = await Transaction.findByPk(id, {
            include: User
        });

        return res.json(transaction);
    }
}