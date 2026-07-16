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
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const total = cart.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity
  }, 0)

  // LOADING UI
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="state-message">
          <h2>Loading cart...</h2>
        </div>
      </div>
    )
  }

  // ERROR UI
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="state-message">
          <h2>{error}</h2>
          <button className="btn-secondary" onClick={fetchCart}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <div className="cart-page">

        {/* ITEM LIST */}
        <div className="cart-main">
          <h1>Shopping Cart</h1>

          {cart.length === 0 && (
            <div className="state-message">
              <h2>Your cart is empty</h2>
              <button className="btn-secondary" onClick={() => navigate('/home')}>
                Continue shopping
              </button>
            </div>
          )}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">

              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div>
                <h3 className="cart-item-title">{item.title}</h3>

                <p className="cart-item-price">
                  <span className="price-symbol">₹</span>
                  {item.price}
                </p>

                <div className="cart-item-actions">
                  <div className="qty-stepper">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => deleteItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        {cart.length > 0 && (
          <div className="cart-summary">
            <p className="cart-summary-total">
              Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''}):{' '}
              <strong>₹{total}</strong>
            </p>

            <button
              className="btn-primary"
              onClick={placeOrder}
              disabled={placingOrder}
            >
              {placingOrder ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart