import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import sampleProducts from '../data/sampleProducts'

function Orders() {
  const [orders, setOrders] = useState([])

  const getSampleOrders = () => {
    return sampleProducts.slice(0, 2).map((product, index) => ({
      ...product,
      id: `order-${product.id}`,
      quantity: index + 1,
      created_at: new Date().toISOString(),
    }))
  }

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

      if (Array.isArray(data) && data.length > 0) {
        setOrders(data)
      } else {
        const savedOrders = JSON.parse(localStorage.getItem('demoOrders') || 'null')
        setOrders(savedOrders && savedOrders.length > 0 ? savedOrders : getSampleOrders())
      }

    } catch (error) {
      console.log(error)
      const savedOrders = JSON.parse(localStorage.getItem('demoOrders') || 'null')
      setOrders(savedOrders && savedOrders.length > 0 ? savedOrders : getSampleOrders())
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