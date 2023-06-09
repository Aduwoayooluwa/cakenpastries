import usePayment from '@/hooks/usePayment'
import React from 'react'
import { Box, Text, VStack } from "@chakra-ui/react"
import Button from '@/components/buttons/button.component'
type Props = {
    amount: number
    public_key: string
}

const PaymentPage = ({ amount, public_key }: Props) => {
    const { userInfo, handleFlutterPayment, closePaymentModal }  = usePayment(public_key, amount);


    return (
        <Box>
            <Box>
                <Text>Hello {userInfo?.name}</Text>
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
                            Pay
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}

export default PaymentPage