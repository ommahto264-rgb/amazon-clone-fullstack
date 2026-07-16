import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)

      if (!response.ok) {
        throw new Error('Failed to load products. Please try again.')
      }

      const data = await response.json()
      setProducts(Array.isArray(data.products) ? data.products : [])

    } catch (err) {
      console.log('Fetch error:', err)
      setError(err.message || 'Something went wrong while loading products.')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    (product.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="home-page">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="hero-section">
        <h1>Welcome to Amazon Clone</h1>
        <p>Shop electronics, accessories, and more</p>
      </div>

      <div className="products-section">
        <h2 className="section-title">Top Products</h2>

        {loading && <p>Loading products...</p>}

        {!loading && error && (
          <div>
            <p>{error}</p>
            <button onClick={fetchProducts}>Try again</button>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p>No products found</p>
        )}

        {!loading && !error && (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home