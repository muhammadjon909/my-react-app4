import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const productDetails = useMemo(() => {    
    if (!product) return <h1>Loading...</h1>;

    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star">
          {i < Math.round(product.rating) ? '★' : '☆'}
        </span>
      );
    }

    return (
      <div className="container">
        {/* SURAT QISMI */}
        <div className="image-section">
          <img className="main-image" src={product.thumbnail} alt={product.title} />
        </div>

        {/* MAHSULOT MA'LUMOTLARI */}
        <div className="details-section">
          <h1 className="product-title">{product.title}</h1>

          {/* NARX, BREND, REYTING KARTOCHKASI */}
          <div className="card">
            <p className="price">${product.price}</p>
            <p className="info">
              <span>Brand:</span> {product.brand}
            </p>
            <p className="info">
              <span>Model:</span> {product.category}
            </p>
            <div className="rating">{stars}</div>
          </div>

          {/* TUGMALAR */}
          <div className="button-container">
            <button className="btn btn-cart">🛒 Add to Cart</button>
            <button className="btn btn-buy">🛍 Buy Now</button>
          </div>
        </div>
      </div>
    );
  }, [product]);

  return productDetails;
}

export default ProductDetail;
