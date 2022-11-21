const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');

router.route('/')
  .get(roleController.index)
  .post(roleController.store);
  
router.get('/search', roleController.search);

router.route('/:id')
  .get(roleController.show)
  .patch(roleController.update)
  .delete(roleController.delete);
  

module.exports = router;
