import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && localStorage.getItem('role') !== requiredRole) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute