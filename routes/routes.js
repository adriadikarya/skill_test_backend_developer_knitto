const express = require('express');
const router = express.Router();
const {
    customer_numbers_classic_cars
} = require('../controllers/controller');
const {jwtMiddleware} = require('../util/middleware');

router.get('/customer-numbers-classic-cars', customer_numbers_classic_cars);

module.exports = router;