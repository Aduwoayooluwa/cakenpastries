import { ChangeEvent } from 'react';

export const handleScoopIncrementQuantity = (setScoopQuantity: any,
    setScoopPrice: any, itemPrice: number
) => {
    setScoopQuantity((prevQuantity: number) => prevQuantity + 1)
    setScoopPrice((prevPrice: number) => prevPrice + (itemPrice))
}

export const handleScoopDecrementQuantity = (
    scoopQuan: number, setScoopQuantity: any, setScoopPrice: any,
    itemPrice: number
) => {
    if (scoopQuan > 1) {
        setScoopQuantity((prevQuantity: number) => prevQuantity - 1);
        setScoopPrice((prevPrice: number) => prevPrice - itemPrice);
    }
}
// export  const handleSelectChange = (event: any, itemPrice: string, 
//     data: any, setPlates: any, setSelectedOption: any
//     ) => {
//         const selectedOption = event.target.value;
//         const selectedItem = data.find((item: any) => item.name === selectedOption);

//         if (selectedItem) {
//         setPlates(parseInt(itemPrice) + parseInt(selectedItem.price) || parseInt(itemPrice));
//         } else {
//         setPlates(parseInt(itemPrice) || 0);
//         }
//         setSelectedOption(selectedOption);
//     };

export const handleSelectChange = (
        event: ChangeEvent<HTMLSelectElement>,
        itemPrice: string,
        data: any[],
        setPlates: React.Dispatch<React.SetStateAction<number>>,
        setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
        setScoopPrice: React.Dispatch<React.SetStateAction<number>>,
        items: any,
    ) => {
        const selectedOption = event.target.value;
        setSelectedOption(selectedOption);

         // Find the selected option from the data
        const selectedItem = data.find(item => item.name === selectedOption);
        
        items.protein = {
            name: selectedOption,
            quantity: 1,
            price: selectedItem?.price
        }
    
        if (selectedItem) {
        // Calculate the new scoop price
        let newScoopPrice = parseInt(itemPrice) + (selectedItem ? parseInt(selectedItem.price) : 0) ;
        setScoopPrice(newScoopPrice);
        

        //const a = parseInt(itemPrice) + 
    
        // Update the plates (if needed)
        const newPlates = parseInt(itemPrice) + parseInt(selectedItem.price) || 0;
        setPlates(newPlates);
        }
        else {
            setScoopPrice(parseInt(itemPrice));
        }
};


export const handleAddToCart = (items:any, addToCart: any, setIsAddToCartBtnClicked: any, itemId:string, setCartQuantity: any,
    cartItemsMap: Map<string, number>, setCartItemsMap: any
    ) => {
        addToCart(items);
        setIsAddToCartBtnClicked(true);
        localStorage.setItem(itemId, "true");
        setCartQuantity((prevQuantity: any) => prevQuantity + 1);
        
        // Add the quantity to the cartItemsMap
        const updatedCartItemsMap = new Map(cartItemsMap);
        const quantity = updatedCartItemsMap.get(itemId) || 0;
        updatedCartItemsMap.set(itemId, quantity + 1);
        setCartItemsMap(updatedCartItemsMap);
        
        
        // Save the cartItemsMap in local storage
        localStorage.setItem('cartItems', JSON.stringify(Array.from(updatedCartItemsMap)));
        
};