import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/products/${id}`)
        const data = await res.json()
        setProduct(data.product)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProduct()
  }, [id])

  // 🔥 ADD TO CART FUNCTION
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://127.0.0.1:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })

      const data = await res.json()

      console.log(data)
      alert('Product added to cart')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />

      {product && (
        <div className="product-details">
          <img src={product.image} alt={product.title} width="200" />

          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>

          {/* 🔥 BUTTON */}
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductDetails