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

export const handleSelectLocationChange = (
    event: React.FormEvent<HTMLSelectElement>,
    subtotal: number,
    setSubtotal: React.Dispatch<React.SetStateAction<number>>,
    data: any[],
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>
    ): void => {
        event.preventDefault();
    
        // Access the selected value from event.currentTarget.value
        const selectedLocation = event.currentTarget.value;
    
        // Perform any necessary operations based on the selected location
        // Update state or trigger other actions as needed
        setSelectedLocation(selectedLocation);
    
        // Find the selected location in the data array
        const selectedPlace = data.find((location) => location.name === selectedLocation);
    
        if (selectedPlace) {
        // Calculate the new subtotal by adding the price of the selected location to the previous subtotal
        const newSubTotal = subtotal + parseInt(selectedPlace.price);
        setSubtotal(newSubTotal);
        }
}