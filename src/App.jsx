import { useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import  CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import './App.css'


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
      const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: 'ORD-' + Date.now(),
      orderTime: new Date().toISOString(),
      totalPrice: cart.reduce((sum, item) => sum + (item.price) * item.quantity, 0),
      items: [...cart]
    };

    setOrders(prev => [newOrder, ...prev]);  
    setCart([]);  
  };
      
  return (
    <>
    <Header cart={cart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <Routes>

    <Route path="/" element={<HomePage addToCart={addToCart} cart={cart} searchTerm={searchTerm} />} />

    <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} placeOrder={placeOrder}/>} />

    <Route path="/orders" element={<OrdersPage orders={orders} />} />
    </Routes>
    </>
   
  )
}

export default App