import { StateCreator } from "zustand";
import { cartSlice } from "@/interfaces/createCartSlice.interface";
import { Products } from "@/interfaces/crateProductSlice.interface";
import Cookie from "js-cookie";

export const createCartSlice: StateCreator<cartSlice> = (set, get) => {

    const existingCartItems = Cookie.get('cartItems');
    const initialState = {
        cart: existingCartItems ? JSON.parse(existingCartItems) : [],
        showCart: false,
    };

    return {
        ...initialState,
        addToCart: (product: Products) => {
        const cart = get().cart;
        const findProduct = cart.find((p) => p.id === product.id);

        if (findProduct) {
            findProduct.quantity! += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        set({ cart });
        Cookie.set('cartItems', JSON.stringify(cart));
        console.log(cart);
        },
        removeFromCart: (productId: string) => {
            const updatedCart = get().cart.filter((product) => product.id.toString() !== productId);
            set({ cart: updatedCart });
            Cookie.set('cartItems', JSON.stringify(updatedCart));
            console.log(updatedCart);
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
    };
};
