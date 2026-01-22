import { useMemo } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import  useCartContext  from '../context/useCartContext';
import getPricing from '../utils/getPricing';
import './checkout-header.css';
import './CheckoutPage.css';


export default function CheckoutPage({ placeOrder,placing,error }) {
  console.log('CheckoutPage rendered');

  const navigate = useNavigate();
  const {cart,updateQuantity,removeFromCart, clearCart} = useCartContext();
  const pricing = useMemo(()=>getPricing(cart),[cart]) ;



const handlePlaceOrder =async () => {
     if (cart.length === 0) return;

     try{
      await placeOrder({
    items: cart, 
    totalPrice: pricing.grandTotal});

     clearCart();  
  navigate('/orders');
  } catch{
     //error
  }

     }
   
    
 

  return (
    <div>
      
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/images/logo.png" alt="Logo" />
              <img
                className="mobile-logo"
                src="/images/mobile-logo.png"
                alt="Mobile Logo"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {cart.length} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img
              src="/images/icons/checkout-lock-icon.png"
              alt="Secure"
            />
          </div>
        </div>
      </div>

      
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          
          <div className="order-summary">
            {cart.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px',
                  fontSize: '24px',
                  color: '#888',
                }}
              >
                Your cart is empty.
                <br />
                <Link to="/">Continue shopping</Link>
              </div>
            ) : (
              <>
                
                {pricing.isFreeShipping ? (
                  <div className="free-shipping-banner">
                     Your order qualifies for FREE Shipping
                  </div>
                ) : (
                  <div className="shipping-hint">
                    Only {pricing.remainingForFreeShipping} tk away from FREE
                    Shipping
                  </div>
                )}

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item-container"
                  >
                    <div className="delivery-date info-text">
                      Delivery details will be shown after placing your order
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {item.name}
                        </div>
                        <div className="product-price">
                          {item.price} tk
                        </div>
                        <div className="product-quantity">
                          <button className="quantity-btn" onClick={()=>{
                            if(item.quantity===1){
                              removeFromCart(item.id);
                            }
                            else{
                              updateQuantity(item.id,item.quantity-1)
                            }
                          }}>-</button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button className="quantity-btn" onClick={()=>
                            updateQuantity(item.id,item.quantity+1)
                          }>+</button>
                        </div>
                        <button className="remove-item" onClick={()=>
                          removeFromCart(item.id)
                        }>
                          Remove
                        </button>
                      </div>

                      
                      </div>
                    </div>
                  
                ))}
              </>
            )}
          </div>

          
          <div className="payment-summary">
            <div className="payment-summary-title">
              Order Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({cart.length}):</div>
              <div className="payment-summary-money">
                {pricing.subtotal} tk
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping & handling:</div>
              <div className="payment-summary-money">
                {pricing.shippingCost} tk
              </div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                {pricing.subtotal + pricing.shippingCost} tk
              </div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">
                {pricing.tax} tk
              </div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">
                {pricing.grandTotal} tk
              </div>
            </div>

            <button
              className="place-order-button button-primary"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0 || placing}
            >
              {placing ? 'Placing order...': 'Place your order'}
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
