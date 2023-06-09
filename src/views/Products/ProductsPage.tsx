import HBar from '@/Layout/HBar';
import Navbar from '@/Layout/Navbar';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid, Skeleton, Heading, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type Props = {};

const ProductsPage = (props: Props) => {
    const { data } =  useGetData(`https://backend.cakesandpastries.ng/api/menu/all`)
    
    const [loading, setLoading] = useState(true);
    
    const [subtotal, setSubtotal] = useState<any>(0);
    const [items, setItems] = useState([]);
    const [proteinBarUp, setProteinBarUp] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <VStack 
            // style={{ backdropFilter: proteinBarUp ? "blur(10px)" : "none" }}
            
            // bg={proteinBarUp ? "rgba(0, 0, 0, 0.6)" : "white"}
            py="" minHeight="100vh">
                <Heading>All Items</Heading>
                <Flex  width="full"  bg="whiteAlpha.800" align="start"  justify="start">
            
                <Box maxW="full" width="full" p="4">
                <SimpleGrid columns={[2, 2, 2, 3, 3, 4]} spacing={{base:"0", md:"4"}} width="full">
                    {
                        data?.map((item: any) => {
                            return (

                                    <Box  key={item?.id}>
                                    <ProductCard item={item} 
                                    subtotal={subtotal}
                                    setSubtotal={setSubtotal}
                                    items={items}
                                    setItems={setItems}
                                    setProteinBarUp={setProteinBarUp}
                                    proteinBarUp={proteinBarUp}
                                    />
                                    </Box>
                                
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
