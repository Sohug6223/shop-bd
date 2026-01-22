import { useState, useEffect, useCallback } from 'react';
import { createOrder } from '../services/orderService';

export default function useOrders() {
  const [orders, setOrders] = useState(() => {
    try{
          const saved = localStorage.getItem('orders');
    
    return saved ? JSON.parse(saved) : [];
  }
  catch {
      return [];
  }
});
const [placing,setPlacing] = useState(false);
const [error,setError] = useState(null);

 useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

     const placeOrder =useCallback(async({
      items, totalPrice}) => {
    if (!items || items.length === 0) return;

    setPlacing(true);
    setError(null);

    try{
      const newOrder = await createOrder({
        items:items.map(i=>({...i})),
        totalPrice,
      });

      setOrders(prev=>[newOrder,...prev]);
      return newOrder;
    }
    catch(err){
      setError(err.message || 'Failed to place order');
      throw err;
    }
    finally{
      setPlacing(false);
    }
    },[]);

  return {
    orders,
    placeOrder,
    placing,
    error,
  };
}