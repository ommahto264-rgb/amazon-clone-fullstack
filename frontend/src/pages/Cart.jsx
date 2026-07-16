import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [placingOrder, setPlacingOrder] = useState(false)

  // FETCH CART
  const fetchCart = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
        return
      }

      if (!res.ok) {
        throw new Error('Failed to load your cart. Please try again.')
      }

      const data = await res.json()
      setCart(Array.isArray(data) ? data : [])

    } catch (err) {
      console.log(err)
      setError(err.message || 'Something went wrong while loading your cart.')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // UPDATE QUANTITY
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      deleteItem(id)
      return
    }

    const previousCart = cart
    // optimistic update
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )

    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })

      if (!res.ok) {
        throw new Error('Failed to update quantity')
      }

    } catch (err) {
      console.log(err)
      // roll back to the last known good state since the update failed
      setCart(previousCart)
      alert('Could not update quantity. Please try again.')
    }
  }

  // DELETE ITEM
  const deleteItem = async (id) => {
    const previousCart = cart
    // optimistic update
    setCart((prev) => prev.filter((item) => item.id !== id))

    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to remove item')
      }

    } catch (err) {
      console.log(err)
      // roll back since the delete failed
      setCart(previousCart)
      alert('Could not remove item. Please try again.')
    }
  }

  // PLACE ORDER
  const placeOrder = async () => {
    try {
      setPlacingOrder(true)
      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order')
      }

      // backend already cleared the cart server-side, mirror that locally
      setCart([])
      alert(data.message || 'Order placed successfully')
      navigate('/orders')

    } catch (err) {
      console.log(err)
      alert(err.message || 'Something went wrong while placing your order.')

    } finally {
      setPlacingOrder(false)
    }
  }

  // TOTAL PRICE
  const total = cart.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity
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
        <button onClick={fetchCart}>Try again</button>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <h1>Your Cart</h1>

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

          <button onClick={placeOrder} disabled={placingOrder}>
            {placingOrder ? 'Placing order...' : 'Place Order'}
          </button>
        </div>
      )}

    </div>
  )
}

export default Cart