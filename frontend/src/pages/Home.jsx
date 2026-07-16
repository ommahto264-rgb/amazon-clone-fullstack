import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import sampleProducts from '../data/sampleProducts'

function Home() {
  const [products, setProducts] = useState(sampleProducts)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
        const data = await response.json()

        if (data.products && data.products.length > 0) {
          setProducts(data.products)
          setMessage('')
        } else {
          setProducts(sampleProducts)
          setMessage('Showing sample products because the backend has no products yet.')
        }
      } catch (error) {
        console.log('Fetch error:', error)
        setProducts(sampleProducts)
        setMessage('Showing sample products because the backend is unavailable.')
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
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