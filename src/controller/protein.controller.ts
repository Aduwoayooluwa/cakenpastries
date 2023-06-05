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