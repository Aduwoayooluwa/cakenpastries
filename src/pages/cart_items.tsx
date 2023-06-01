import React from 'react'
import { Box } from "@chakra-ui/react"
import CartPage from '@/views/Products/Cart'
import { useAppStore } from '@/lib/store'
import Navbar from '@/Layout/Navbar'
import {useState, useEffect } from 'react'
import Cookies from 'js-cookie';

type Props = {}

const CartItems = (props: Props) => {
    let cartItems;

    if (typeof window !== 'undefined') {
        //const carts: any = Cookies.get(cartItems)
        cartItems = Cookies.get('cartItems') && JSON.parse(Cookies.get('cartItems')!)
    }

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