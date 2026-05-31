const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  placeOrder,
  getOrders
} = require('../controllers/orderController')

// PLACE ORDER
router.post('/', authMiddleware, placeOrder)

// GET ORDERS
router.get('/', authMiddleware, getOrders)

module.exports = router