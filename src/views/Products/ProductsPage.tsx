import HBar from '@/Layout/HBar';
import Navbar from '@/Layout/Navbar';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid, Skeleton, Heading, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type Props = {};

const ProductsPage = (props: Props) => {
    const { data } =  useGetData("https://backend.cakesandpastries.ng/api/menu/all")
    const [loading, setLoading] = useState(true);
    
    const [subtotal, setSubtotal] = useState<any>(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <VStack py="" minHeight="100vh">
                <Heading>All Items</Heading>
                <Flex  width="full"  bg="whiteAlpha.800" align="start"  justify="start">
            
                <Box maxW="full" width="full" p="4">
                <SimpleGrid columns={[2, 3, 4]} spacing={{base:"0", md:"4"}} width="full">
                    {
                        data?.data.map((item: any) => {
                            return (
                                <Skeleton 
                                    isLoaded={!loading}
                                    bg='white.500'
                                    color='white'
                                    key={item.id}>
                                    <Box >
                                    <ProductCard item={item} 
                                    subtotal={subtotal}
                                    setSubtotal={setSubtotal}
                                    items={items}
                                    setItems={setItems}
                                    />
                                    </Box>
                                </Skeleton>
                                
                            )
                        })
                    }
                </SimpleGrid>
            </Box>
            </Flex>
            </VStack>
            
        </>
        
    );
};

export default ProductsPage;
