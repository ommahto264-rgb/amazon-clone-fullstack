import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-box">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <h3 className="product-title">{product.title}</h3>

      {product.category && (
        <p className="product-category">{product.category}</p>
      )}

      <p className="product-price">
        <span className="price-symbol">₹</span>
        {product.price}
      </p>

      <div className="product-card-footer">
        <Link to={`/products/${product.id}`}>
          <button className="btn-primary">View Details</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard