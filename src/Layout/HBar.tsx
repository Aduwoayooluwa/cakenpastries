import React, { useState, useEffect } from 'react'
import { Box, Text, Flex, VStack, HStack, Skeleton } from "@chakra-ui/react"
import Link from "next/link"
import useGetData from '@/hooks/useGetData'
import { useRouter } from 'next/router'
type Props = {}

const HBar = (props: Props) => {
    const { data } = useGetData("https://backend.cakesandpastries.ng/api/categories/all")
    
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    console.log(router)
    useEffect(() => {
    // Simulating an API request delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <Flex pt="100px">
                {
                        data?.data.map((category: any) => {
                            return (
                                <Skeleton 
                                isLoaded={!loading}
                                color='white'
                                fadeDuration={1}
                                key={category.id}>
                                    <Box p="4">
                                    <Link  href={`/category/${category?.name}`}>
                                        <Text fontWeight="medium" textColor={router.asPath === `/category/${category?.name}` ? "#000093" : "black"}>{category?.name}</Text>
                                    </Link>
                                    
                                    </Box>
                                </Skeleton>
                                
                            )
                        })
                    }
        </Flex>
    )
}

export default HBar