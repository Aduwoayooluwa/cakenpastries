import React, { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store';
type Props = {}

const useProtein = (items: any) => {

        const [price, setPrice] = useState(parseInt(items?.itemPrice) || 0);
        const [selectedOption, setSelectedOption] = useState('');
        const [cartQuantity, setCartQuantity] = useState(1);
    
        // number of plates
        const [plates, setPlates] = useState(parseInt(items?.itemPrice) || 0);
    
        // cart
        const [cartItemsMap, setCartItemsMap] = useState(new Map());
    
        // handling scooping
        const [scoopQuan, setScoopQuantity] = useState(1);
        const [scoopPrice, setScoopPrice] = useState(parseInt(items?.itemPrice) || 0);
    
        const { addToCart } = useAppStore();
        const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState(false);
    
    
        useEffect(() => {
        const isItemAddedToCart = localStorage.getItem(items?.itemId);
        setIsAddToCartBtnClicked(!!isItemAddedToCart);
        }, [items?.itemId]);
    
        useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            setCartItemsMap(new Map(parsedCartItems));
        }
        }, []);
    

        return { 
            price, setPrice,
            selectedOption, setSelectedOption,
            cartQuantity, setCartQuantity,
            plates, setPlates,
            cartItemsMap, setCartItemsMap,
            scoopQuan, setScoopQuantity,
            scoopPrice, setScoopPrice,
            addToCart,
            isAddToCartBtnClicked, setIsAddToCartBtnClicked
        }
}

export default useProtein