import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      background: '#232f3e',
      color: 'white'
    }}>

      {/* Logo */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h2>MyShop</h2>
      </Link>

      {/* 🔍 SEARCH BAR */}
      <form style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: 'none',
            width: '250px'
          }}
        />
        <button type="submit" style={{
          padding: '8px 12px',
          background: '#febd69',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Search
        </button>
      </form>

      {/* RIGHT SIDE LINKS */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>

        {token ? (
          <>
            <Link to="/cart" style={{ color: 'white' }}>Cart</Link>
            <Link to="/orders" style={{ color: 'white' }}>Orders</Link>
            {
  role === 'admin' ? (

    <Link
      to="/admin"
      style={{ color: 'white' }}
    >
      Admin Dashboard
    </Link>

  ) : (

    <Link
      to="/become-seller"
      style={{ color: 'white' }}
    >
      Become Seller
    </Link>

  )
}
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar