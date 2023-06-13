import Navbar from '@/Layout/Navbar';
import CategoryCard from '@/components/productCard/caregory.component';
import Categories from '@/components/productCard/caregory.component';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type Props = {};

const CategoryPage = (props: Props) => {
    const { data } =  useGetData(`https://backend.cakesandpastries.ng/api/categories/all`)

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
            <Box maxW="full" width="full" p="4">
                <Text fontWeight={"bold"} fontSize={{base: "2xl", md:"4xl"}} my="10px" textAlign={"center"}>Categories</Text>
                <SimpleGrid  columns={[2, 2, 2, 3, 3, 4]} spacing={{base:"0", md:"4"}} width="full" justifyItems="center">
                    {
                        data?.map((category: any) => {
                            return (
                                <Box 
                                color='white'
                                key={category.id}>
                                    <Box >
                                    <CategoryCard category={category} />
                                    </Box>
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