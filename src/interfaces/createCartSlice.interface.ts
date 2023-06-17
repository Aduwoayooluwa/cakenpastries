import { Products } from "./crateProductSlice.interface";

export interface cartSlice {
    cart: Products[]
    proteinCart: any[]
    addToCart: (product: Products) => void
    removeFromCart: (productId:string) => void
    updateQuantity: (productId: string, action: 'increase' | 'decrease') => void
    showCart: boolean, 
    toggleCart: () => void,
    calculateSubtotal?: any

}
