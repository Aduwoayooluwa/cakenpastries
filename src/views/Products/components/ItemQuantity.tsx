import { handleScoopDecrementQuantity, handleScoopIncrementQuantity } from '@/controller/protein.controller'
import { VStack, Text, Flex, Button as Btn, HStack } from '@chakra-ui/react'
import React from 'react'
import Button from '@/components/buttons/button.component'
type Props = {}

const ItemQuantity = ({scoopQuan, proteinItemsState,setProteinItemsState,setScoopQuantity, setScoopPrice, scoopPrice, itemPrice, items, selectedProtein, selectedProteinArray, ...props}: any) => {
    selectedProtein = false

    
    return (
        <VStack w="full" align="left" my="10px">
            <HStack w="full" justify={"space-between"}>
                <Flex  justifyContent="space-between" alignItems="center" width="40%">
                    <Button
                    onClick={() => {
                        handleScoopDecrementQuantity(proteinItemsState,setProteinItemsState,scoopQuan, setScoopQuantity, setScoopPrice, parseInt(itemPrice), items)
                        
                        }}
                    disabled={true}
                    >

                    -
                    </Button>
                <Text>{scoopQuan}</Text>
                <Button colorScheme="blue" onClick={() => handleScoopIncrementQuantity(
                    proteinItemsState,setProteinItemsState,
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
{/*         
                <Text textColor="black">{scoopPrice}</Text> */}
        </VStack>
    )
    }

export default ItemQuantity