import { Link } from 'react-router-dom'
import { useMemo } from 'react';
import useCartContext from './../context/useCartContext';
import './Header.css';


export default function Header({
  searchTerm='', setSearchTerm=()=>{} }) {
    console.log('Header rendered');

    const {cart} = useCartContext();
  const totalItems = useMemo(()=> cart.reduce((sum, item) => sum + item.quantity, 0),
  [cart]
  );
  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" alt='logo'/>
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" alt='logo' />
        </Link>
      </div>

        
        <form className="middle-section" onSubmit={(e)=>e.preventDefault()}>
          <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

        <button type='submit' className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" alt='search' />
        </button>
        </form> 
        
      

      <div className="right-section">
        <Link  className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" alt='Cart' />
          {totalItems > 0 && (
            <div className="cart-quantity">{totalItems}</div>
          )}
          
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}