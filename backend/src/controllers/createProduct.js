const pool = require('../config/db')

const createProduct = async (req, res) => {
  try {

    const {
      title,
      description,
      price,
      category
    } = req.body

    // Cloudinary URL comes from multer-storage-cloudinary after upload
    const image = req.file ? req.file.path : null

    if (!title || !price) {
      return res.status(400).json({
        message: 'Title and price are required'
      })
    }

    const newProduct = await pool.query(
      `
      INSERT INTO products
      (title, description, image, price, category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        title,
        description,
        image,
        price,
        category
      ]
    )

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct.rows[0]
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}

const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params

    const deletedProduct = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    )

    if (deletedProduct.rows.length === 0) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    res.status(200).json({
      message: 'Product deleted successfully'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}

const updateProduct = async (req, res) => {

  try {

    const { id } = req.params

    const {
      title,
      description,
      price,
      category
    } = req.body

    // If a new file was uploaded, use its Cloudinary URL; otherwise keep existing image
    let image = req.body.existingImage || null
    if (req.file) {
      image = req.file.path
    }

    const updatedProduct = await pool.query(
      `
      UPDATE products
      SET
        title = $1,
        description = $2,
        image = $3,
        price = $4,
        category = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        title,
        description,
        image,
        price,
        category,
        id
      ]
    )

    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct.rows[0]
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
}
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct
}