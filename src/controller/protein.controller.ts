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
    if (scoopQuan > 0) {
        setScoopQuantity((prevQuantity: number) => prevQuantity - 1);
        setScoopPrice((prevPrice: number) => prevPrice - itemPrice);
    }
}
export  const handleSelectChange = (event: any, itemPrice: string, data: any, setPlates: any, setSelectedOption: any) => {
        const selectedOption = event.target.value;
        const selectedItem = data.find((item: any) => item.name === selectedOption);

        if (selectedItem) {
        setPlates(parseInt(itemPrice) + parseInt(selectedItem.price) || parseInt(itemPrice));
        } else {
        setPlates(parseInt(itemPrice) || 0);
        }
        setSelectedOption(selectedOption);
    };

export const handleAddToCart = (items:any, addToCart: any, setIsAddToCartBtnClicked: any, itemId:string, setCartQuantity: any) => {
        addToCart(items);
        setIsAddToCartBtnClicked(true);
        localStorage.setItem(itemId, "true");
        setCartQuantity((prevQuantity: any) => prevQuantity + 1);
        
};