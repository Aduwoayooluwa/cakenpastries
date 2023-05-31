import React from 'react'
import { Box } from "@chakra-ui/react"
import CartPage from '@/views/Products/Cart'
import { useAppStore } from '@/lib/store'
import Navbar from '@/Layout/Navbar'
type Props = {}

const CartItems = (props: Props) => {
    const { cart } = useAppStore()
    return (
        <Box>
            <Navbar />   
            <Box pt="20px">

            </Box>
            <CartPage cartItems={cart}/>
        </Box>
    )
}

export default CartItems