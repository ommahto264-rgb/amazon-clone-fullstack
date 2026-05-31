const pool = require('../config/db');

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const existingItem = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
      [userId, product_id]
    );

    if (existingItem.rows.length > 0) {
      const updatedItem = await pool.query(
        'UPDATE cart SET quantity = quantity + $3 WHERE user_id = $1 AND product_id = $2 RETURNING *',
        [userId, product_id, quantity || 1]
      );

      return res.json(updatedItem.rows[0]);
    }

    const newItem = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, product_id, quantity || 1]
    );

    res.json(newItem.rows[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CART
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT cart.id, cart.quantity,
              products.title, products.price, products.image
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = $1`,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE QUANTITY
const updateCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;

    const result = await pool.query(
      'UPDATE cart SET quantity = $2 WHERE id = $1 RETURNING *',
      [id, quantity]
    );

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ITEM
const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query(
      'DELETE FROM cart WHERE id = $1',
      [id]
    );

    res.json({ message: 'Item removed' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem
};