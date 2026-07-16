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
        <h2>Loading orders...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <h2>{error}</h2>
        <button onClick={fetchOrders}>Try again</button>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <h1>Your Orders</h1>

      {orders.length === 0 && (
        <p>No orders yet</p>
      )}

      {orders.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            gap: '20px',
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px'
          }}
        >
          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            width="100"
            height="100"
            style={{ objectFit: 'contain' }}
          />

          <div>
            <h3>{item.title}</h3>

            <p>₹{item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <p>
              Ordered on:
              {' '}
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders