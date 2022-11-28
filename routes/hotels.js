const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotelController');

router.route('/')
    .get(hotelController.get)
    .post(hotelController.create)

router.route('/:id')
    .get(hotelController.find)

module.exports = router;