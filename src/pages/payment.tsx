"use client"

import React, { useState, useEffect } from 'react'
import { Box } from "@chakra-ui/react"
import PaymentPage from '@/views/payment/PaymentPage'
type Props = {}

const Payment = (props: Props) => {
    const [amountToBePayed, setAmountToBePayed] = useState(0)

    const publickey = "FLWPUBK_TEST-472906320af3dd68ae9c21f4c0197ada-X"

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAmountToBePayed(JSON.parse(window.sessionStorage.getItem('subtotal')!))
        }
    }, [])
    
    return (
        <Box textColor={"black"} pt={"100px"} minH={"100vh"}>
            <PaymentPage  amount={amountToBePayed} public_key={publickey} />
            doings
        </Box>
    )
}

export default Payment