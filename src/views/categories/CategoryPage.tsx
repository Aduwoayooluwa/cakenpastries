import Navbar from '@/Layout/Navbar';
import CategoryCard from '@/components/productCard/caregory.component';
import Categories from '@/components/productCard/caregory.component';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const CategoryPage = (props: Props) => {
    const { data } =  useGetData("https://backend.cakesandpastries.ng/api/categories/all")

    return (
        <>
            <Navbar />
            <Flex width="full" py="100px" bg="whiteAlpha.800" align="center" justify="center">
            <Box maxW="1200px" width="full" p="4">
                <Text fontWeight={"bold"} fontSize={{base: "2xl", md:"4xl"}} my="10px" textAlign={"center"}>Categories</Text>
                <SimpleGrid columns={[2, null, 3]} spacing="4" justifyItems="center">
                    {
                        data?.data.map((category: any) => {
                            return (
                                <Box key={category.id}>
                                    <CategoryCard category={category} />
                                </Box>
                            )
                        })
                    }
                </SimpleGrid>
            </Box>
            </Flex>
        </>
        
    );
};

export default CategoryPage;