import { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

const sampleProducts = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 1999,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Gaming Keyboard',
    price: 1599,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Bluetooth Speaker',
    price: 1299,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Laptop Stand',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'USB-C Hub',
    price: 1499,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Mechanical Mouse',
    price: 1099,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Noise Cancelling Earbuds',
    price: 2299,
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Tablet Case',
    price: 699,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'Portable Charger',
    price: 1299,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    title: 'Smartphone Tripod',
    price: 799,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    title: 'LED Desk Lamp',
    price: 999,
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 13,
    title: 'Webcam',
    price: 1899,
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 14,
    title: 'Ergonomic Chair',
    price: 4999,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 15,
    title: '4K Monitor',
    price: 14999,
    image:
      'https://images.unsplash.com/photo-1527443156517-0c4b2b0b3d4b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 16,
    title: 'External SSD',
    price: 7999,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 17,
    title: 'Wireless Mouse',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1587202372775-98973c2b8a82?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 18,
    title: 'Bluetooth Earbuds',
    price: 1599,
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 19,
    title: 'Smart Home Speaker',
    price: 2999,
    image:
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 20,
    title: 'Compact Camera',
    price: 3599,
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  },
]

function Home() {
  const [products] = useState(sampleProducts)
  const [searchTerm, setSearchTerm] = useState('')

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