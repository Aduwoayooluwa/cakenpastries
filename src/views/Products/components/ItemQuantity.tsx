import { handleScoopDecrementQuantity, handleScoopIncrementQuantity } from '@/controller/protein.controller'
import { VStack, Text, Flex, Button as Btn, HStack } from '@chakra-ui/react'
import React from 'react'
import Button from '@/components/buttons/button.component'
type Props = {}

const ItemQuantity = ({scoopQuan, setScoopQuantity, setScoopPrice, scoopPrice, itemPrice, items, selectedProtein, selectedProteinArray, ...props}: any) => {
    selectedProtein = false
    //console.log(items)
    return (
        <VStack w="full" align="left" my="20px">
            <HStack w="full" justify={"space-between"}>
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
                <Text mx="3">{scoopQuan}</Text>
                <Button colorScheme="blue" onClick={() => handleScoopIncrementQuantity(
                    setScoopQuantity, 
                    setScoopPrice, parseInt(itemPrice), scoopQuan, items)}>
                    +
                </Button>
                </Flex>
                { 
                    selectedProtein && (
                        <Flex>
                            <Btn colorScheme="red">X</Btn>
                        </Flex>
                        )
                    }
                
            </HStack>
        
                <Text textColor="black">{scoopPrice}</Text>
        </VStack>
    )
    }

export default ItemQuantity