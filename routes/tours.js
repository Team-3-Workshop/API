const express = require('express')
const router = express.Router()

const tourController = require('../controllers/tourController')

router.route('/')
    .get(tourController.get)
    .post(tourController.create)

module.exports = router