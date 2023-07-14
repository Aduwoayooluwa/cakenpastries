import { Box, Flex, HStack, VStack, Text, Center, Divider, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../buttons/button.component";
import { useAppStore } from "@/lib/store";
import { handleDecrement, handleIncrement } from "@/controller/cartItems.controller";
import useGetData from "@/hooks/useGetData";
import ProteinBottomUp from "@/views/Products/Protein";

type Props = {
    item: any;
    subtotal?: any
    items?: any
    setSubtotal?: any
    setItems?: any
    setProteinBarUp?: any
    proteinBarUp?: boolean
};

const ProductCard = ({ item, setProteinBarUp, proteinBarUp }: Props) => {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);

    const { addToCart } = useAppStore();
    const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState(false);
    const [quantity, setQuantity] = useState(1);
                                                                                                                            
    useEffect(() => {
        const isItemAddedToCart = localStorage.getItem(item?.id);
        setIsAddToCartBtnClicked(!!isItemAddedToCart);
    }, [item?.id]);

    // toggle protin bar
    const [isProteinVisible, setIsProteinVisible] = useState(false)


    return (
        <Box
        minW={{ base: "160px", md: "400px" }}
        height={{ base: "320px", md: "full" }}
        w="full"
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        shadow="md"
        >
        <Center width={"full"} justifyContent={"center"} alignItems={"center"}>
            <Flex opacity={ proteinBarUp? 0.2 : 1 } 
            // style={{ backdropFilter: proteinBarUp ? "blur(10px)" : "none" }} 
            align={{base: "start", md:"center"}}
             direction="column" width="full">
                <Skeleton
                    bg='white.500'
                    color='white'
                    minW={"200px"}
                    isLoaded={!loading}
                    
                >
                <VStack
                borderRadius="10px"
                position="relative"
                border="1px solid gray.300"
                maxWidth={{base:"160px", md:"full"}}
                align={"center"}
                justify={"center"}
                
                
                w={{ base: "full", md: "350px" }}
                h={{ base: "150px", md: "350px" }}
            >
                <Image
                src={item?.image}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "10px", marginLeft:"0px" }}
                />
            </VStack>
                </Skeleton>
            
            <VStack mt={{ base: "5px", md: "10px" }}align="start" justify="start" width="full">
                <Skeleton
                    bg='white.500'
                    color='white'
                    isLoaded={!loading}
                >
                <Text textColor="black" textAlign={"start"} fontSize="16px" mt={{base: "4px", md: "10px"}} fontWeight="medium">
                {item?.name}
                </Text>
                </Skeleton>
            </VStack>
            <Box width="full" pt={{ base: "0px", md: "50px" }}>
                <Divider orientation="horizontal" />
            </Box>

            <VStack align="start" justify="start" width="full" mt="4">
                <Skeleton
                    bg='white.500'
                    color='white'
                    isLoaded={!loading}
                >
                <Text textColor={"black"} fontSize={{ base: "8px", md: "sm" }}>
                Starting from
                </Text>
                </Skeleton>

                <Skeleton
                    bg='white.500'
                    color='white'
                    isLoaded={!loading}
                >
                    <Text fontWeight="extrabold" fontSize={{ base: "14px", md: "lg" }} textColor={"black"} lineHeight="none">
                        NGN {parseInt(item?.price)}
                        </Text>
                </Skeleton>
                
                    <Skeleton
                    bg='white.500'
                    color='white'
                    isLoaded={!loading}
                >
                <Button onClick={() => {
                    setIsProteinVisible(true)
                    setProteinBarUp(true)
                }}>Add to Cart</Button>
                </Skeleton>
            </VStack>
            </Flex>
                
            <Box opacity={1} bg="white" h="full">
              
                {
                isProteinVisible && (<>
                    <ProteinBottomUp itemMeasure={item?.measure} setProteinBarUp={setProteinBarUp} items={item} itemId={item?.id} itemPrice={item?.price} itemImage={item?.image} itemName={item?.name} isProteinVisible={isProteinVisible} setIsProteinVisible={setIsProteinVisible}/>
                </>)
                }
            </Box>
            
        </Center>
        </Box>
    );
};

export default ProductCard;
