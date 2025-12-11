
import { Link,useNavigate } from 'react-router-dom';
import './checkout-header.css';
import './CheckoutPage.css';

export default function CheckoutPage({ cart = [], setCart,placeOrder }) {
  
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price) * item.quantity;
  }, 0);

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: Number(newQuantity) } : item
    ));
  };
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    placeOrder();          
    navigate('/orders');     
  };

  return (
    <div> 
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="/images/mobile-logo.png" alt="Mobile Logo" />
            </Link>
          </div>
          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">{cart.length} items</Link>)
          </div>
          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" alt="Secure" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
         
          <div className="order-summary">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px', fontSize: '24px', color: '#888' }}>
                Your cart is empty
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image" src={item.image} alt={item.name} />

                    <div className="cart-item-details">
                      <div className="product-name">{item.name}</div>
                      <div className="product-price">
                        {(item.price)} tk
                      </div>

                      <div className="product-quantity">
                        <span>Quantity: </span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                          style={{ width: '60px', margin: '0 10px' }}
                        />
                        <span
                          className="delete-quantity-link link-primary"
                          onClick={() => removeFromCart(item.id)}
                          style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                        >
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">Choose a delivery option:</div>
                      <label className="delivery-option">
                        <input type="radio" defaultChecked name={`delivery-${item.id}`} />
                        <div>
                          <div className="delivery-option-date">Tuesday, June 21</div>
                          <div className="delivery-option-price">FREE Shipping</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

         
          <div className="payment-summary">
            <div className="payment-summary-title">Order Summary</div>

            <div className="payment-summary-row">
              <div>Items ({cart.length}):</div>
              <div className="payment-summary-money">{totalPrice} tk</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping & handling:</div>
              <div className="payment-summary-money">0 tk</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{totalPrice} tk</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{(totalPrice * 0.1)} tk</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{(totalPrice * 1.1)} tk</div>
            </div>

            <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}