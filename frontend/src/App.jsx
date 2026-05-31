import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import AdminAddProduct from './pages/AdminAddProducts'
import BecomeSeller from './pages/BecomeSeller'
import AdminDashboard from './pages/AdminDashboard'
import EditProduct from './pages/EditProduct'



// Protected Route
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Optional Profile (can also protect if you want) */}
      <Route path="/profile" element={<Profile />} />

      {/* Product Details */}
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route
          path="/admin/add-product"
          element={<AdminAddProduct />}
        />
        <Route
          path="/admin/edit-product/:id"
          element={<EditProduct />}
        />
      <Route
  path="/become-seller"
  element={<BecomeSeller />}
/>

<Route
  path="/admin"
  element={<AdminDashboard />}
/>
      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App