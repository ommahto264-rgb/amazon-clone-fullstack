import { useState } from 'react'

function AdminAddProduct() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!imageFile) {
      alert('Please select an image')
      return
    }

    setSubmitting(true)

    try {

      const token = localStorage.getItem('token')

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('image', imageFile)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/createProduct`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
            // Note: no Content-Type header — browser sets it automatically
            // with the correct multipart boundary when using FormData
          },
          body: formData
        }
      )

      const data = await response.json()

      alert(data.message)

      setTitle('')
      setDescription('')
      setImageFile(null)
      setImagePreview(null)
      setPrice('')
      setCategory('')

    } catch (error) {
      console.log(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
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
          Add Product
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              height: '100px'
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={inputStyle}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                maxHeight: '180px',
                objectFit: 'cover',
                borderRadius: '5px',
                marginBottom: '15px'
              }}
            />
          )}

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
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              background: submitting ? '#888' : '#232f3e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {submitting ? 'Uploading...' : 'Add Product'}
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

export default AdminAddProduct