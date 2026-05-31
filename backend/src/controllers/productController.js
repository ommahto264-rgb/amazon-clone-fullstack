const pool = require('../config/db');

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');

        res.status(200).json({
            message: 'Products fetched',
            products: result.rows
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product fetched',
            product: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getAllProducts, getProductById };