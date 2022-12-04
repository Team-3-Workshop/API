var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.get('/', userController.get);

router.route('/:id')
  .get(userController.find)
  .patch(userController.update)
  .delete(userController.delete);

router.get('/:id/transactions', userController.getTransactions);
// router.get('/:id/transactions/:trans', userController.getTransactions);
  

module.exports = router;
