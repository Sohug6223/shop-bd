import { Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import  CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import useOrders from './hooks/useOrders';


import './App.css';


function App() {
  console.log('App rendered');
 
  
  const {orders,placeOrder,placing,error} = useOrders();
  
  return (
    <>
    
   <Routes>
  <Route element={<MainLayout />}>

    <Route path="/" element={<HomePage />} />
  
  <Route path="/orders" element={<OrdersPage orders={orders}/>} />
  </Route>


   <Route path="/checkout" element={<CheckoutPage placeOrder={placeOrder} placing={placing} 
   error={error}
   />} />

   </Routes>

    </>
   
  )
}

export default App