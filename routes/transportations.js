const express = require('express')
const router = express.Router()

const transportationController = require('../controllers/transportationController')

router.route('/')
    .get(transportationController.get)

module.exports = router