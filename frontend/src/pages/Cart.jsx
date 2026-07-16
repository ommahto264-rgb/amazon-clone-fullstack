import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import sampleProducts from '../data/sampleProducts'

const getSampleCart = () => {
  return sampleProducts.slice(0, 3).map((product, index) => ({
    ...product,
    id: `${product.id}-${index}`,
    quantity: index + 1,
  }))
}

function Cart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // FETCH CART
  const fetchCart = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch cart')
      }

      const data = await res.json()

      if (Array.isArray(data) && data.length > 0) {
        setCart(data)
        setMessage('')
      } else {
        setCart(getSampleCart())
        setMessage('Showing sample cart items because the backend has no cart data yet.')
      }

    } catch (error) {
      console.log(error)
      setCart(getSampleCart())
      setError('')
      setMessage('Showing sample cart items because the backend is unavailable.')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // UPDATE QUANTITY
  const updateQuantity = async (id, quantity) => {
    try {
      const token = localStorage.getItem('token')

      if (quantity < 1) {
        setCart((prev) => prev.filter((item) => item.id !== id))
        return
      }

      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })

      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )

    } catch (error) {
      console.log(error)
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }

  // DELETE ITEM
  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token')

      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setCart((prev) => prev.filter((item) => item.id !== id))

    } catch (error) {
      console.log(error)
      setCart((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // PLACE ORDER
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (data.message) {
        alert(data.message)
      }

      const demoOrders = cart.map((item) => ({
        ...item,
        created_at: new Date().toISOString(),
      }))

      localStorage.setItem('demoOrders', JSON.stringify(demoOrders))
      setCart([])

    } catch (error) {
      console.log(error)
      const demoOrders = cart.map((item) => ({
        ...item,
        created_at: new Date().toISOString(),
      }))

      localStorage.setItem('demoOrders', JSON.stringify(demoOrders))
      setCart([])
      alert('Order placed locally for demo purposes.')
    }
  }

  // TOTAL PRICE
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  // LOADING UI
  if (loading) {
    return (
      <div>
        <Navbar />
        <h2>Loading cart...</h2>
      </div>
    )
  }

  // ERROR UI
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

      <h1>Your Cart</h1>

      {message && <p>{message}</p>}

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <h2>Cart is empty</h2>
      )}

      {/* CART ITEMS */}
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            gap: '20px',
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px'
          }}
        >

          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            width="120"
            height="120"
            style={{ objectFit: 'contain' }}
          />

          {/* PRODUCT INFO */}
          <div>
            <h3>{item.title}</h3>

            <p>₹{item.price}</p>

            <p>Quantity: {item.quantity}</p>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: '10px' }}>

              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                -
              </button>

              <button onClick={() => deleteItem(item.id)}>
                Remove
              </button>

            </div>
          </div>
        </div>
      ))}

      {/* TOTAL + PLACE ORDER */}
      {cart.length > 0 && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ccc'
          }}
        >
          <h2>Total: ₹{total}</h2>

          <button onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}

    </div>
  )
}

export default Cart