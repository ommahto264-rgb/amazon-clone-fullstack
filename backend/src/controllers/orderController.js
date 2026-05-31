const pool = require('../config/db')

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id

    // GET USER CART ITEMS
    const cartItems = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    )

    // CHECK EMPTY CART
    if (cartItems.rows.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      })
    }

    // INSERT INTO ORDERS
    for (const item of cartItems.rows) {
      await pool.query(
        'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3)',
        [userId, item.product_id, item.quantity]
      )
    }

    // CLEAR CART
    await pool.query(
      'DELETE FROM cart WHERE user_id = $1',
      [userId]
    )

    return res.status(200).json({
      message: 'Order placed successfully'
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// GET USER ORDERS
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id

    const orders = await pool.query(
      `
      SELECT 
        orders.id,
        orders.quantity,
        orders.created_at,
        products.title,
        products.price,
        products.image
      FROM orders
      JOIN products
      ON orders.product_id = products.id
      WHERE orders.user_id = $1
      ORDER BY orders.created_at DESC
      `,
      [userId]
    )

    return res.status(200).json(orders.rows)

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  placeOrder,
  getOrders
}