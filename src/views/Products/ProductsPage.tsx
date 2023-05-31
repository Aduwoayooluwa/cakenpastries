import Navbar from '@/Layout/Navbar';
import ProductCard from '@/components/productCard/productcard.component';
import useGetData from '@/hooks/useGetData';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const ProductsPage = (props: Props) => {
    const { data } =  useGetData("https://backend.cakesandpastries.ng/api/menu/all")

    return (
        <>
            <Navbar />
            <Flex width="full" py="100px" bg="whiteAlpha.800" align="center" justify="center">
            <Box maxW="1200px" width="full" p="4">
                <SimpleGrid columns={[1, null, 3]} spacing="4" justifyItems="center">
                    {
                        data?.data.map((item: any) => {
                            return (
                                <Box key={item.id}>
                                    <ProductCard item={item} />
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

export default ProductsPage;
