import React from 'react'
import { Box, Flex, HStack, VStack, Text, Center } from "@chakra-ui/react";
import Button from '@/components/buttons/button.component';
import Image from "next/image";
import Link from 'next/link';

type Props = {
    category: any
}

const CategoryCard = ({ category }: Props) => {
    return (
        <Box
        minW={{ base: "180px", md: "400px" }}
        height={{ base: "250px", md: "full" }}
        w="full"
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        shadow="md"
        >
            <Center width={"full"} alignItems={"center"}>
                <Flex align={"center"} direction="column" width="full">
                    <Box position="relative" w="full" h={{base:"100px", md:"150px"}}>
                    <object data="https://stackoverflow.com/does-not-exist.png" type="image/png">
                            <Image
                            src={category?.image || "/default.png"}
                            alt="Product Image"
                            layout="fill"
                            objectFit="cover"
                            />
                    </object>
                
                    </Box>
                    <Link href={``}>
                        <VStack align="start" spacing="2" mt="4" flex="1">
                            <Text textColor={"black"} fontSize={{baee:"sm", md:"lg" }}fontWeight="medium">
                                {category?.name}
                            </Text>
                            <Text fontSize="xs" textColor={"black"} fontWeight="normal">
                                {category?.menu_items?.length} items
                            </Text>
                        
                        </VStack>
                    </Link>
                    
                </Flex>
            </Center>

        </Box>
    );
}

export default CategoryCard