import { StateCreator } from "zustand";
import { cartSlice } from "@/interfaces/createCartSlice.interface";
import { Products } from "@/interfaces/crateProductSlice.interface";
import Cookie from "js-cookie";

export const createCartSlice: StateCreator<cartSlice> = (set, get) => {

    const existingCartItems = Cookie.get('cartItems');
    const existingProteinItems = Cookie.get('proteinCart');
    const initialState = {
        cart: existingCartItems ? JSON.parse(existingCartItems) : [],
        showCart: false,
        proteinCart: existingProteinItems ? JSON.parse(existingProteinItems) :[]
    };
    const calculateSubtotal = () => {
        const cart = get().cart;
        let subtotal = 0;
    
        cart.forEach((product) => {
          subtotal += product.price * product.quantity;
        });
    
        return subtotal;
    };

    return {
        ...initialState,
    

        addToCart: (product: Products) => {
        const cart = get().cart;
        const findProduct = cart.find((p) => p.id === product.id);

        
        if (findProduct) {
            findProduct.quantity! += 1;
        } else {
            cart.push({ ...product });
        }

        set({ cart });
        Cookie.set('cartItems', JSON.stringify(cart));
        },
        removeFromCart: (productId: string) => {
            const updatedCart = get().cart.filter((product) => product.id?.toString() !== productId);
            set({ cart: updatedCart });
            Cookie.set('cartItems', JSON.stringify(updatedCart));
            
        },

        removeProteinfromCart: (proteinId: string) => {
            const updatedCart = get().proteinCart.filter((protein) =>protein?.id?.toString() !== proteinId);
            //console.log('dtf', proteinId)
            set({ proteinCart:updatedCart });
            Cookie.set('proteinCart', JSON.stringify(updatedCart))
        },
        
        updateQuantity: (productId: string, action: 'increase' | 'decrease') => {
        const cart = get().cart;
        const findProduct = cart.find((p) => p.id === productId);

        if (findProduct) {
            if (action === 'increase') {
            findProduct.quantity! += 1;
            } else {
            findProduct.quantity! > 1 ? (findProduct.quantity! -= 1) : findProduct.quantity!;
            }
        }

        set({ cart });
        },
    
        toggleCart: () => {
        set({ showCart: !get().showCart });
        },
        calculateSubtotal,
        
    };
};
