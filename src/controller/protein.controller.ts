import Cookies from 'js-cookie';
import { ChangeEvent } from 'react';

export const handleScoopIncrementQuantity = (setScoopQuantity: any,
    setScoopPrice: any, itemPrice: number, scoopQuantity: number, items:any
) => {
    
    items.quantity += 1
    setScoopQuantity((prevQuantity: number) => prevQuantity + 1)
    setScoopPrice((prevPrice: number) => prevPrice + (itemPrice))
}

export const handleScoopDecrementQuantity = (
    scoopQuan: number, setScoopQuantity: any, setScoopPrice: any,
    itemPrice: number, items:any
) => {
    
    
    if (scoopQuan > 1) {
        items.quantity -= 1
        setScoopQuantity((prevQuantity: number) => prevQuantity - 1)
        setScoopPrice((prevPrice: number) => prevPrice - (itemPrice))
        // setScoopQuantity((prevQuantity: number) => prevQuantity - 1);
        // setScoopPrice((prevPrice: number) => prevPrice - itemPrice);
        // items['quantity'] = scoopQuan
        // console.log(items['quantity'])
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
        proteinCart: any[],
        cart: any[],
        scoopQuan: number,
        setProteinDetails: React.Dispatch<React.SetStateAction<any>>,
        setProteinPrice?: any,
        setInitialProteinPrice?: any,
        setSelectedProteinQuantity?:any,
        proteinQuantity?: number,
        setSelectedProteinArray?: any,
        selectedProteinArray?: any[],
        addMoreProteinDialog?: boolean,
        
    ) => {
        const selectedOption = event.target.value;


        if (selectedOption !== items.protein_select?.name) {
            setSelectedProteinQuantity(1)
        }
        setSelectedOption(selectedOption);

         // Find the selected option from the data
        const selectedItem = data.find(item => item.name === selectedOption);

        items.protein = selectedItem?.id
        items.protein_select = {
            name: selectedItem?.name,
            price: selectedItem?.price
        }
        
        if (selectedOption !== "" && !selectedProteinArray?.includes(selectedItem)) {
            setSelectedProteinArray([...selectedProteinArray!, {name: selectedOption, quantity: proteinQuantity, price: selectedItem?.price, id: selectedItem?.id}])
        }
        
        console.log(selectedProteinArray)
        // proteinCart.push({name: selectedOption, quantity: proteinQuantity, price: selectedItem?.price, id: selectedItem?.id})
        // Cookies.set('proteinCart', JSON.stringify(proteinCart))

        
        //console.log(proteinCart)
        const newP = selectedProteinArray?.reduce((accumulator, item) => accumulator + parseInt(item?.price), 0)
        console.log(newP)
        
        if (selectedItem) {
        // Calculate the new scoop price
        setProteinDetails(selectedItem)
        let newScoopPrice = (scoopQuan * parseInt(itemPrice)) + (selectedItem ? newP : 0) ;
        setScoopPrice(newScoopPrice);
        setProteinPrice(parseInt(selectedItem?.price))
        setInitialProteinPrice(parseInt(selectedItem?.price))

        
        

        //const a = parseInt(itemPrice) + 
    
        // Update the plates (if needed)
        const newPlates = parseInt(itemPrice) + parseInt(selectedItem.price) || 0;
        setPlates(newPlates);
        }
        else {
            if (!addMoreProteinDialog) {
                setScoopPrice(parseInt(itemPrice) * scoopQuan);
                setProteinPrice(0)
                setInitialProteinPrice(0)
                setSelectedProteinQuantity(1)
                proteinCart.pop()
            }
            
        }
        
};

export const handleRemoveProtein = (proteinId: string, proteinsCart: any[], setProteinsCart: any) => {
    const updatedCart = proteinsCart.filter((protein) => {
        return protein?.id.toString() !== proteinId.toString()
    })
    //console.log(proteinId)
    setProteinsCart(updatedCart)
    console.log(updatedCart)
}


export const handleSelectAdditionalProteinChange = (event: React.ChangeEvent<HTMLSelectElement>,
    data: any[], proteinCart: any[], setselectedProteinChange: any, scoopQuan: number,
    itemPrice: string, setScoopPrice: React.Dispatch<React.SetStateAction<number>>,
    prevProteinPrice: number, items: any, setSelectedAdditionalProtein: any
    ) => {
        const selectedAdditionalProtein = event.target.value

        
        setselectedProteinChange(selectedAdditionalProtein)
        // remove the last item the user selects
        const selectedItem  = data.find((item) => item.name === selectedAdditionalProtein);
        
        items.other_protein = selectedItem?.id
        items.protein_select.name1 = selectedItem?.name
        items.protein_select.price1 = selectedItem?.price
        console.log(selectedItem)
        setSelectedAdditionalProtein(selectedItem)

        // proteinCart[1] = {name: selectedAdditionalProtein, quantity: 1, price: selectedItem?.price, id: selectedItem?.id}
        // Cookies.set('proteinCart', JSON.stringify(proteinCart))
        console.log(proteinCart)

        if (selectedAdditionalProtein) {
            let newItemPrice = (scoopQuan * parseInt(itemPrice)) + (parseInt(selectedItem?.price) + prevProteinPrice) || 0
            setScoopPrice(newItemPrice)
        }
        else {
            setScoopPrice(parseInt(itemPrice) * scoopQuan)
            proteinCart.pop()
        }


}

export const handleAddToCart = (items:any, addToCart: any, setIsAddToCartBtnClicked: any, itemId:string, setCartQuantity: any,
    cartItemsMap: Map<string, number>, setCartItemsMap: any, scoopQuan: number
    ) => {
        addToCart({...items, quantity: scoopQuan});
        setIsAddToCartBtnClicked(true);
        localStorage.setItem(itemId, "true");
        setCartQuantity((prevQuantity: any) => prevQuantity + 1);
        
        // Add the quantity to the cartItemsMap
        const updatedCartItemsMap = new Map(cartItemsMap);
        const quantity = updatedCartItemsMap.get(itemId) || 0;
        updatedCartItemsMap.set(itemId, quantity + 1);
        setCartItemsMap(updatedCartItemsMap);
        
        
        // Save the cartItemsMap in local storage
        items.quantity = scoopQuan
        //console.log('items', items)
        localStorage.setItem('cartItems', JSON.stringify(Array.from(updatedCartItemsMap)));
        
}; 