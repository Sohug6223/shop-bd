import { useState } from 'react';
import { products } from '../../starting-code/data/products';
import './HomePage.css';

export default function HomePage({ addToCart, searchTerm='' }) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <div className="home-page">
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            No products found for "{searchTerm}"
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} alt={product.name} />
              </div>

              <div className="product-name limit-text-to-2-lines">{product.name}</div>

              <div className="product-rating-container">
                <img
                  className="product-rating-stars"
                  src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                  alt="rating"
                />
                <div className="product-rating-count link-primary">
                  {product.rating.count}
                </div>
              </div>

              <div className="product-price">
                {(product.price)} tk
              </div>

              <div className="product-quantity-container">
             
              </div>

              

              <div className={`added-to-cart ${addedProductId === product.id ? 'visible' : ''}`}>
                <img src="/images/icons/checkmark.png" alt="Added" />
                Added
              </div>

              <button
                className="add-to-cart-button button-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}