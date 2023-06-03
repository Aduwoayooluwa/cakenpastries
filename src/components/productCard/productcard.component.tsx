import { Box, Flex, HStack, VStack, Text, Center, Divider } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../buttons/button.component";
import { useAppStore } from "@/lib/store";
import { handleDecrement, handleIncrement } from "@/controller/cartItems.controller";
import useGetData from "@/hooks/useGetData";
import ProteinBottomUp from "@/views/Products/Protein";

type Props = {
    item: any;
    subtotal: any
    items: any
    setSubtotal: any
    setItems: any
};

const ProductCard = ({ item, items, subtotal, setSubtotal, setItems }: Props) => {
    


    const { addToCart } = useAppStore();
    const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const isItemAddedToCart = localStorage.getItem(item?.id);
        setIsAddToCartBtnClicked(!!isItemAddedToCart);
    }, [item?.id]);

    // toggle protin bar
    const [isProteinVisible, setIsProteinVisible] = useState(false)

    const handleAddToCart = () => {
        addToCart(item);
        setIsAddToCartBtnClicked(true);
        localStorage.setItem(item?.id, "true");
    };

    const handleIncrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        handleIncrement(item);
    };

    const handleDecrementQuantity = () => {
        if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        handleDecrement(item);
        }
    };


    return (
        <Box
        minW={{ base: "160px", md: "500px" }}
        height={{ base: "300px", md: "full" }}
        w="full"
        p="4"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        bg="white"
        shadow="md"
        >
        <Center width={"full"} alignItems={"center"}>
            <Flex align={"center"} direction="column" width="full">
            <Box
                borderRadius="10px"
                position="relative"
                border="1px solid gray.300"
                p="2"
                w={{ base: "full", md: "350px" }}
                h={{ base: "150px", md: "350px" }}
            >
                <Image
                src={item?.image}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "10px" }}
                />
            </Box>
            <VStack mt={{ base: "5px", md: "0px" }} align={"start"} justify={"start"}>
                <Text textColor="black" textAlign={"start"} fontSize="16px" fontWeight="medium">
                {item?.name}
                </Text>
            </VStack>

            <Box width="full" pt={{ base: "0px", md: "50px" }}>
                <Divider orientation="horizontal" />
            </Box>

            <VStack align="start" justify="start" width="full" mt="4">
                <Text textColor={"black"} fontSize={{ base: "8px", md: "sm" }}>
                Starting from
                </Text>
                <Text fontWeight="extrabold" fontSize={{ base: "14px", md: "lg" }} textColor={"black"} lineHeight="none">
                NGN {parseInt(item?.price)}
                </Text>
                {!isAddToCartBtnClicked ? (
                <Button onClick={() => {
                    setIsProteinVisible(true)
                }}>Add to Cart</Button>
                ) : (
                <>
                    <Button disabled={true} onClick={() => {
                    
                }}>Added</Button>
                </>
                )}
            </VStack>
            </Flex>

            {
                isProteinVisible && (<>
                    <ProteinBottomUp items={item} itemId={item?.id} itemPrice={item?.price} itemImage={item?.image} itemName={item?.name} isProteinVisible={isProteinVisible} setIsProteinVisible={setIsProteinVisible}/>
                </>)
            }
        </Center>
        </Box>
    );
};

export default ProductCard;
