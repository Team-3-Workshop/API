var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.route('/')
  .get(userController.get);
  
router.get('/search', userController.search);

router.route('/:id')
  .get(userController.find)
  .patch(userController.update)
  .delete(userController.delete);

router.get('/:id/transactions', userController.transaction);
  

module.exports = router;
