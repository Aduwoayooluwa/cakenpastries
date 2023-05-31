export interface Products {
    caegory: {
        id: number
        name: string
        image: string
    }
    description: string
    id: string
    image: string
    price: number
    name: string
    quantity: number
}

export interface ProductSlice {
    products: Products[]
    fetchProduct: () => void
}