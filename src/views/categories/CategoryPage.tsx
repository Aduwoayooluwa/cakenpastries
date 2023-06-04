import Navbar from '@/Layout/Navbar';
import CategoryCard from '@/components/productCard/caregory.component';
import Categories from '@/components/productCard/caregory.component';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type Props = {};

const CategoryPage = (props: Props) => {
    const { data } =  useGetData("https://backend.cakesandpastries.ng/api/categories/all")

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulating an API request delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Flex width="full" minH={"100vh"} py="100px" bg="whiteAlpha.800" align="center" justify="center">
            <Box maxW="1200px" width="full" p="4">
                <Text fontWeight={"bold"} fontSize={{base: "2xl", md:"4xl"}} my="10px" textAlign={"center"}>Categories</Text>
                <SimpleGrid columns={[2, null, 3]} spacing="4" justifyItems="center">
                    {
                        data?.map((category: any) => {
                            return (
                                <Skeleton 
                                isLoaded={!loading}
                                bg='green.500'
                                color='white'
                                fadeDuration={1}
                                key={category.id}>
                                    <Box >
                                    <CategoryCard category={category} />
                                    </Box>
                                </Skeleton>
                                
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