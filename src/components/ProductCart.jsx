import { memo, useState, useRef,useEffect } from 'react';

function ProductCart({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null)

  const handleClick = () => {
    onAddToCart(product);
    setAdded(true);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(()=>{
      setAdded(false);
    }, 2000);
  };

  useEffect(()=>{
    return()=> clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

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
        {product.price} tk
      </div>

      <div className={`added-to-cart ${added ? 'visible' : ''}`}>
        <img src="/images/icons/checkmark.png" alt="Added" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={handleClick}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default memo(ProductCart);
