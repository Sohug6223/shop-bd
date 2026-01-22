import {useState,useEffect,useCallback} from 'react'

export default function useCart() {
    const [cart,setCart] = useState(()=>{
        const saved=localStorage.getItem('cart');
        return saved? JSON.parse(saved):[];
    });
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]
    );
    const addToCart = useCallback((product) =>{
        setCart(prev =>{
            const exists = prev.find(item=>item.id===product.id);
            if(exists){
                return prev.map(item=> item.id === product.id ? 
                    {...item,quantity:item.quantity+1}
                    :item
                );
            }
            return [...prev,{...product,quantity:1}];
        });
    },[] );

    const removeFromCart = useCallback((id) =>{
        setCart(prev=>prev.filter(item=> item.id !==id));
    },[]);

    const updateQuantity = useCallback((id,quantity)=>{
        if(quantity<1) 
            return;
        setCart(prev =>
            prev.map(item=>
                item.id===id? {...item,quantity}:item
            )
        );
    },[] );
    const clearCart = useCallback(() => {
        setCart([]);
    },[]);
   
  return{
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
