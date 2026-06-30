import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProduct() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  // FETCH SINGLE PRODUCT
  const fetchProduct = async () => {

    try {

      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/createProduct/${id}`
      )

      const data = await response.json()

      const product = data.product

      setTitle(product.title)
      setDescription(product.description)
      setImage(product.image)
      setPrice(product.price)
      setCategory(product.category)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  // UPDATE PRODUCT
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem('token')

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/createProduct/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            image,
            price,
            category
          })
        }
      )

      const data = await response.json()

      alert(data.message)

      navigate('/admin')

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>

      <div style={{
        background: 'white',
        padding: '30px',
        width: '400px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>

        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Edit Product
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              ...inputStyle,
              height: '100px'
            }}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#232f3e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box'
}

export default EditProduct