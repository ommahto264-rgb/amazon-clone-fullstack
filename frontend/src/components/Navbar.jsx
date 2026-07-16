import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!token) {
        setCartCount(0)
        return
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!res.ok) return

        const data = await res.json()
        const count = Array.isArray(data)
          ? data.reduce((acc, item) => acc + item.quantity, 0)
          : 0

        setCartCount(count)

      } catch (err) {
        console.log('Cart count fetch error:', err)
      }
    }

    fetchCartCount()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <h2>amazon<span>.clone</span></h2>
      </Link>

      {/* Search bar */}
      <form
        className="navbar-search"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
        />
        <button type="submit" aria-label="Search">🔍</button>
      </form>

      {/* Right side links */}
      <div className="navbar-links">

        {/* Admin Panel is publicly viewable — always shown */}
        <Link to="/admin" className="nav-item">
          <span className="nav-item-top">Manage</span>
          <span className="nav-item-bottom">🛠️ Admin Panel</span>
        </Link>

        {token ? (
          <>
            <Link to="/orders" className="nav-item">
              <span className="nav-item-top">Your</span>
              <span className="nav-item-bottom">📦 Orders</span>
            </Link>

            {role !== 'admin' && (
              <Link to="/become-seller" className="nav-item">
                <span className="nav-item-top">Start</span>
                <span className="nav-item-bottom">Become Seller</span>
              </Link>
            )}

            <Link to="/cart" className="nav-item">
              <span className="nav-item-top">&nbsp;</span>
              <span className="nav-item-bottom">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </span>
            </Link>

            <button className="navbar-button" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              <span className="nav-item-top">Hello, sign in</span>
              <span className="nav-item-bottom">👤 Account & Lists</span>
            </Link>
            <Link to="/signup" className="navbar-button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar