import { Link, useNavigate } from 'react-router-dom'

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

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
        {token ? (
          <>
            <Link to="/orders" className="nav-item">
              <span className="nav-item-top">Your</span>
              <span className="nav-item-bottom">Orders</span>
            </Link>

            {role === 'admin' ? (
              <Link to="/admin" className="nav-item">
                <span className="nav-item-top">Manage</span>
                <span className="nav-item-bottom">Admin Dashboard</span>
              </Link>
            ) : (
              <Link to="/become-seller" className="nav-item">
                <span className="nav-item-top">Start</span>
                <span className="nav-item-bottom">Become Seller</span>
              </Link>
            )}

            <Link to="/cart" className="nav-item">
              <span className="nav-item-top">&nbsp;</span>
              <span className="nav-item-bottom">🛒 Cart</span>
            </Link>

            <button className="navbar-button" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              <span className="nav-item-top">Hello, sign in</span>
              <span className="nav-item-bottom">Account & Lists</span>
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