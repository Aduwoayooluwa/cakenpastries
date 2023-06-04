import useGetData from '@/hooks/useGetData'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Box, Flex, SimpleGrid, Skeleton, Heading, VStack, Divider } from '@chakra-ui/react';
import ProductCard from '@/components/productCard/productcard.component';
import HBar from '@/Layout/HBar';

type Props = {}

const Category = (props: Props) => {
    const router = useRouter()

    const currentCategory = router.query.category

    console.log(router.query.category)
    const { data, error } = useGetData("https://backend.cakesandpastries.ng/api/menu/all")
    const [cat, setCat] = useState("")

    data.forEach((item: any)=> {
        console.log(item.category.name)
    
    })

    const [subtotal, setSubtotal] = useState<any>(0);
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
    
        return () => clearTimeout(timer);
    }, []);

        // if (isLoading) {
        //     return <div>Loading...</div>; // Show a loading indicator while data is being fetched
        // }
        
        // if (error) {
        //     return <div>Error: {error.message}</div>; // Show an error message if there's an error during data fetching
        // }
    
    return (
        <>
            <HBar />
            <Divider orientation="horizontal" />
            <VStack  minHeight="100vh">
                <Heading>{currentCategory}</Heading>
                <Flex  width="full"  bg="whiteAlpha.800" align="start"  justify="start">
            
                <Box maxW="full" width="full" p="4">
                <SimpleGrid columns={[2, 3, 4]} spacing={{base:"0", md:"4"}} width="full">
                    {
                        data !== "undefined" && data?.map((item: any) => {
                            return (<>
                                {
                                    item?.category?.name === currentCategory && (
                                        <Skeleton 
                                            isLoaded={!loading}
                                            bg='white.500'
                                            color='white'
                                            key={item.id}>
                                            <Box >
                                            <ProductCard 
                                            
                                            item={item}
                                            subtotal={subtotal}
                                            setSubtotal={setSubtotal}
                                            items={items}
                                            setItems={setItems} />
                                            </Box>
                                        </Skeleton>
                                    )
                                }
                            
                            </>
                                
                                
                            )
                        })
                    }
                </SimpleGrid>
            </Box>
            </Flex>
            </VStack>
        </>
        
            
    )
}

export default Category