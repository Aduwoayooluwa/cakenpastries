export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}


export const handleIncrement = (item: CartItem, setSubtotal?: any) => {
    item.quantity += 1;
    //setSubtotal((prevSubtotal: any) => prevSubtotal + item?.price);
};

export const handleDecrement = (item: CartItem, setSubtotal?: any, items?: any, setItems?: any) => {
    if (item.quantity > 1) {
        const updatedItems = items.map((i: any) => {
            if (i.id === item.id) {
                return {
                    ...i,
                    quantity: i.quantity - 1
                };
            }
            return i;
        });

        setItems(updatedItems);
        //setSubtotal((prevSubtotal: any) => prevSubtotal - item.price);
    }
};
