const express = require('express')
const router = express.Router()

const { createProduct, deleteProduct, updateProduct } = require('../controllers/createProduct')

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  createProduct
)

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteProduct
)

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  updateProduct
)

module.exports = router