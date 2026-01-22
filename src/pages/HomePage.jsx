import { memo } from 'react';
import { useOutletContext } from 'react-router-dom';
import  useCartContext  from '../context/useCartContext';
import useProducts from '../hooks/useProducts';
import ProductCart from '../components/ProductCart';
import './HomePage.css';

function HomePage() {
  console.log('HomePage rendered');

  const { searchTerm } = useOutletContext();
  const{addToCart}=useCartContext();
  const { products, loading, error } = useProducts(searchTerm);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if(error){
    return <div className="error">{error}</div>
  }

  return (
    <div className="home-page">
      
      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-results">
            No products found for "{searchTerm}"
          </div>
        ) : (
          products.map(product => (
            <ProductCart
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default memo(HomePage);
