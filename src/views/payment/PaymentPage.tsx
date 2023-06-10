import usePayment from '@/hooks/usePayment'
import React from 'react'
import { Box, Text, VStack } from "@chakra-ui/react"
import Button from '@/components/buttons/button.component'
type Props = {
    amount: number
    public_key: string
}

const PaymentPage = () => {
    const {  handleFlutterPayment, closePaymentModal }  = usePayment();


    return (
        <Box>
            <Box>
                
            </Box>

            <VStack>
                <Box>
                    <Button onClick={() => {
                        handleFlutterPayment({
                            callback: (response) => {
                                console.log(response);
                                closePaymentModal()
                            },
                            onClose: () => {
                                console.log("Closed")
                            }
                        })
                    }}>
                            Proceed To Payment
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}

export default PaymentPage