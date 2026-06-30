const express = require('express')
const router = express.Router()

const { createProduct, deleteProduct, updateProduct } = require('../controllers/createProduct')

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
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
  upload.single('image'),
  updateProduct
)

module.exports = router