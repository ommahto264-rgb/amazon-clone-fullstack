const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem
} = require('../controllers/cartController');

router.post('/', authMiddleware, addToCart);
router.get('/', authMiddleware, getCartItems);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, deleteCartItem);

module.exports = router;