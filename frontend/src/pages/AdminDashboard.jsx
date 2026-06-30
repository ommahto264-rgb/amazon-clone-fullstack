import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function AdminDashboard() {
  const navigate = useNavigate()
  
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`
      )

      const data = await response.json()

      setProducts(data.products)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      const token = localStorage.getItem('token')

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/createProduct/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      alert(data.message)

      fetchProducts()

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div style={{
      padding: '30px',
      background: '#f3f4f6',
      minHeight: '100vh'
    }}>

      {/* TOP SECTION */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>

        <h1>Admin Dashboard</h1>

        <Link
          to="/admin/add-product"
          style={{
            background: '#232f3e',
            color: 'white',
            padding: '10px 15px',
            textDecoration: 'none',
            borderRadius: '5px'
          }}
        >
          Add Product
        </Link>

      </div>

      {/* PRODUCTS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit, minmax(250px, 250px))',
        gap: '20px'
      }}>

        {products.map((product) => (

          <div
            key={product.id}
            style={{
              background: 'white',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >

            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain'
              }}
            />

            <h3>{product.title}</h3>

            <p>₹{product.price}</p>

            <p>{product.category}</p>

            {/* BUTTONS */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px'
            }}>

              <button
  onClick={() =>
    navigate(`/admin/edit-product/${product.id}`)
  }
  style={{
    flex: 1,
    padding: '10px',
    border: 'none',
    background: '#f59e0b',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer'
  }}
>
  Edit
</button>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                style={{
                  flex: 1,
                  padding: '10px',
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AdminDashboard