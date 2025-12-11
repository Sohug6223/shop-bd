import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ cart = [],searchTerm, setSearchTerm }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link  className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          {totalItems > 0 && (
            <div className="cart-quantity">{totalItems}</div>
          )}
          
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}