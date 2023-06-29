import React from 'react'
import { Input, Button, SimpleGrid, Text, Box, InputGroup, InputRightElement, IconButton, Stack, VStack } from '@chakra-ui/react';

type Props = {}

const SearchDisplayPage = ({ isSearchedBtnClicked, isLoading, isError, filteredFoods}: any) => {
        return (
            <Stack>
            {
                isSearchedBtnClicked && (
                    <VStack>
                        {isLoading && <Text>Loading...</Text>}
                        {isError && <Text>Error occurred while fetching food data.</Text>}
                        {filteredFoods && filteredFoods.length === 0 && <Text>No results found.</Text>}

                <Box maxW="full" width="full" p="4">
                <SimpleGrid columns={[2, 2, 2, 3, 3, 4]} spacing={{base:"0", md:"4"}} width="full">
                        {filteredFoods &&
                            filteredFoods.map((food:any) => (
                            <Box key={food.id} borderWidth="1px" p={4} mt={4}>
                                <Text fontWeight="bold">{food.name}</Text>
                        </Box>
                            ))}
                </SimpleGrid>
                </Box>
                    </VStack>
                )
            }
        </Stack>
        )
}

export default SearchDisplayPage