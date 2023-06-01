import React from 'react'
import { Box } from "@chakra-ui/react"
import CartPage from '@/views/Products/Cart'
import { useAppStore } from '@/lib/store'
import Navbar from '@/Layout/Navbar'
import {useState, useEffect } from 'react'
type Props = {}

const CartItems = (props: Props) => {
    const [cartItems, setCartItems] = useState()

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem('cartItems')!))
    }, [])
    console.log(cartItems)
    return (
        <Box minH={"100vh"}>
            <Box pt="20px" >

            </Box>
            <CartPage cartItems={cartItems }/>
        </Box>
    )
}

export default CartItems