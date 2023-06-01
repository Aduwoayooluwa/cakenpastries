import Navbar from '@/Layout/Navbar';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid, Skeleton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type Props = {};

const ProductsPage = (props: Props) => {
    const { data } =  useGetData("https://backend.cakesandpastries.ng/api/menu/all")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Navbar />
            <Flex width="full" py="100px" bg="whiteAlpha.800" align="center" minHeight="100vh" justify="center">
            <Box maxW="1200px" width="full" p="4">
                <SimpleGrid columns={[2, null, 3]} spacing="4" justifyItems="center">
                    {
                        data?.data.map((item: any) => {
                            return (
                                <Skeleton 
                                    isLoaded={!loading}
                                    bg='blue.500'
                                    color='white'
                                    key={item.id}>
                                    <Box >
                                    <ProductCard item={item} />
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

export default ProductsPage;
