import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addingToCart, setAddingToCart] = useState(false)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)

      if (res.status === 404) {
        setProduct(null)
        setError('Product not found')
        return
      }

      if (!res.ok) {
        throw new Error('Failed to load this product. Please try again.')
      }

      const data = await res.json()
      setProduct(data.product)

    } catch (err) {
      console.log(err)
      setError(err.message || 'Something went wrong while loading this product.')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // ADD TO CART FUNCTION
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please log in to add items to your cart')
      navigate('/login')
      return
    }

    try {
      setAddingToCart(true)

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
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

      if (res.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        alert('Your session has expired. Please log in again.')
        navigate('/login')
        return
      }

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add product to cart')
      }

      alert('Product added to cart')

    } catch (err) {
      console.log(err)
      alert(err.message || 'Something went wrong while adding this product to your cart.')

    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="state-message">
          <h2>Loading product...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="state-message">
          <h2>{error}</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      {product && (
        <div className="product-details-page">
          <div className="product-details-card">

            {/* IMAGE */}
            <div className="product-details-image-box">
              <img
                src={product.image}
                alt={product.title}
                className="product-details-image"
              />
            </div>

            {/* INFO + BUY BOX */}
            <div className="product-details-info">
              <h1>{product.title}</h1>

              {product.category && (
                <p className="product-details-category">
                  {product.category}
                </p>
              )}

              <hr className="product-details-divider" />

              <p className="product-details-price">
                <span className="price-symbol">₹</span>
                {product.price}
              </p>

              <p className="product-details-description">
                {product.description}
              </p>

              <div className="buy-box">
                <p className="buy-box-price">
                  <span className="price-symbol">₹</span>
                  {product.price}
                </p>
                <p className="buy-box-stock">In Stock</p>

                <button
                  className="btn-primary"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>

                <button
                  className="btn-secondary"
                  onClick={async () => {
                    await handleAddToCart()
                    navigate('/cart')
                  }}
                  disabled={addingToCart}
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails