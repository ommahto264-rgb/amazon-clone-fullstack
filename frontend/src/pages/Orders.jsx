import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
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
        throw new Error('Failed to load your orders. Please try again.')
      }

      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])

    } catch (err) {
      console.log(err)
      setError(err.message || 'Something went wrong while loading your orders.')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="state-message">
          <h2>Loading orders...</h2>
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
          <button className="btn-secondary" onClick={fetchOrders}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <div className="orders-page">
        <h1>Your Orders</h1>

        {orders.length === 0 && (
          <div className="state-message">
            <h2>No orders yet</h2>
            <button className="btn-secondary" onClick={() => navigate('/home')}>
              Start shopping
            </button>
          </div>
        )}

        {orders.map((item) => (
          <div key={item.id} className="order-card">

            <div className="order-card-header">
              <div>
                <span className="order-card-header-label">Order Placed</span>
                <span className="order-card-header-value">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>

              <div>
                <span className="order-card-header-label">Total</span>
                <span className="order-card-header-value">
                  ₹{Number(item.price) * item.quantity}
                </span>
              </div>

              <div>
                <span className="order-card-header-label">Order #</span>
                <span className="order-card-header-value">{item.id}</span>
              </div>
            </div>

            <div className="order-card-body">
              <img
                src={item.image}
                alt={item.title}
                className="order-item-image"
              />

              <div>
                <p className="order-item-title">{item.title}</p>
                <p className="order-item-qty">Quantity: {item.quantity}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders