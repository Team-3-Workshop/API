var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.route('/')
  .get(userController.index)
  // .post(userController.store);
  
router.get('/search', userController.search);

router.route('/:id')
  .get(userController.show)
  .patch(userController.update)
  .delete(userController.delete);

router.get('/:id/transactions', userController.transaction);
  

module.exports = router;
