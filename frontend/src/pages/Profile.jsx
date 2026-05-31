import { useEffect, useState } from 'react'

function Profile() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setMessage('Please login first')
        return
      }

      try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (data.user) {
          setUser(data.user)
        } else {
          setMessage(data.message)
        }

      } catch (error) {
        setMessage('Something went wrong')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div>
      <h2>Profile</h2>

      {message && <p>{message}</p>}

      {user && (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Created At:</strong> {user.created_at}</p>
        </div>
      )}
    </div>
  )
}

export default Profile