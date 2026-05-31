function BecomeSeller() {

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
        width: '500px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>

        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Become a Seller
        </h1>

        <p style={{
          lineHeight: '1.7',
          color: '#444',
          marginBottom: '20px'
        }}>
          Want to sell your products on our platform?
          Contact our team for seller verification and
          approval.
        </p>

        <div style={{
          background: '#f9fafb',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>

          <h3>Requirements:</h3>

          <ul>
            <li>Valid email account</li>
            <li>Product details</li>
            <li>Business or personal verification</li>
          </ul>

        </div>

        <a
          href="mailto:yourmail@gmail.com"
          style={{
            display: 'block',
            textAlign: 'center',
            background: '#232f3e',
            color: 'white',
            padding: '12px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Contact Us
        </a>

      </div>

    </div>
  )
}

export default BecomeSeller