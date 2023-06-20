import { handleScoopDecrementQuantity, handleScoopIncrementQuantity } from '@/controller/protein.controller'
import { VStack, Text, Flex, Button as Btn } from '@chakra-ui/react'
import React from 'react'
import Button from '@/components/buttons/button.component'
type Props = {}

const ItemQuantity = ({scoopQuan, setScoopQuantity, setScoopPrice, scoopPrice, itemPrice, items, ...props}: any) => {
    return (
        <VStack align="left" my="20px">
                <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                    <Btn
                    size="sm"
                    onClick={() => {
                        handleScoopDecrementQuantity(scoopQuan, setScoopQuantity, setScoopPrice, parseInt(itemPrice), items)
                        
                        }}
                    disabled={true}
                    >
                    -
                </Btn>
                <Text>{scoopQuan}</Text>
                <Button colorScheme="blue" onClick={() => handleScoopIncrementQuantity(
                    setScoopQuantity, 
                    setScoopPrice, parseInt(itemPrice), scoopQuan, items)}>
                    +
                </Button>
                </Flex>
                <Text textColor="black">{scoopPrice}</Text>
        </VStack>
    )
    }

export default ItemQuantity