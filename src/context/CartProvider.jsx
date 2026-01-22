import{useMemo} from 'react';
import CartContext from './CartContext';
import useCart from './../hooks/useCart';

export default function CartProvider({children})
{
    const cartState = useCart();

    const value = useMemo(()=>({
        cart: cartState.cart,
        addToCart:cartState.addToCart,
        removeFromCart: cartState.removeFromCart,
        updateQuantity: cartState.updateQuantity,
        clearCart: cartState.clearCart
    }), [
        cartState.cart,
        cartState.addToCart,
        cartState.removeFromCart,
        cartState.updateQuantity,
        cartState.clearCart
         ]);

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
