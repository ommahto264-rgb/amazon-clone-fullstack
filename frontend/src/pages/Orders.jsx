import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function Orders() {
  const [orders, setOrders] = useState([])

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      setOrders(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

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