import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(
    searchTerm.toLowerCase()
  )
)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/products')
        const data = await response.json()

        if (data.products) {
          setProducts(data.products)
        } else {
          setMessage(data.message)
        }
      } catch (error) {
        console.log('Fetch error:', error)
        setMessage('Failed to fetch products')
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="home-page">
      <Navbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>

      <div className="hero-section">
        <h1>Welcome to Amazon Clone</h1>
        <p>Shop electronics, accessories, and more</p>
      </div>

      <div className="products-section">
        <h2 className="section-title">Top Products</h2>

        {message && <p>{message}</p>}

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home