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
        <h2>Loading product...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <h2>{error}</h2>
      </div>
    )
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

          <button onClick={handleAddToCart} disabled={addingToCart}>
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductDetails