import React, { createContext, useState } from 'react';

export const CartContext = createContext<any>([]);

interface ProviderProps {
    children: JSX.Element
}
export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
    const [_cartItems, setCartItems] = useState<any>([]);
    
    console.log(_cartItems)

    return (
        <CartContext.Provider value={{ _cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
