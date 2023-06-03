import { useState, useEffect } from 'react';
import { Box, Button, Slide, Text, VStack, FormControl, FormLabel, Select, Flex, Divider, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import useGetData from '@/hooks/useGetData';
import Link from "next/link"
import { useAppStore } from '@/lib/store';

const ProteinBottomUp = ({ isProteinVisible, setIsProteinVisible, itemName, itemImage, itemPrice, itemId, items }: any) => {
  const { data } = useGetData("https://backend.cakesandpastries.ng/api/menu/protein");
  const [price, setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0);

  const { addToCart } = useAppStore();
    const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState(false);

    useEffect(() => {
      const isItemAddedToCart = localStorage.getItem(itemId);
      setIsAddToCartBtnClicked(!!isItemAddedToCart);
  }, [itemId]);

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    const selectedItem = data.find((item: any) => item.name === selectedOption);

    if (selectedItem) {
      setPrice(selectedItem.price);
    } else {
      setPrice('');
    }
    setSelectedOption(selectedOption);
  };

  const handleAddToCart = () => {
    addToCart(items);
      setIsAddToCartBtnClicked(true);
      localStorage.setItem(itemId, "true");
    setCartQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleIncrement = () => {
    setCartQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      setCartQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Box zIndex={50} position="absolute" width="full" bottom="0" textColor="black" p={4}>
      <Slide
        in={isProteinVisible}
        direction="bottom"
        style={{ transition: 'height 0.3s ease-in-out' }}
      >
        <Box
          bg="white"
          p={4}
          mt={4}
          borderRadius="md"
          shadow="md"
          minHeight="400px"
          overflowY="scroll"
          width={{ base: 'full', md: '400px' }}
        >  
          <Box w="full">
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Select Options</Text>
              <Box onClick={() => setIsProteinVisible(false)}>Close</Box>
            </HStack>
            <Divider orientation="horizontal" width="full" my="20px" />
          </Box>

          <HStack my="20px">
            <Box>
              <Image src={itemImage} alt="image" width={100} height={100} />
            </Box>
            <Text>{itemName}</Text>
          </HStack>

          <VStack spacing={2} width="full" align="start">
            <FormControl>
              <FormLabel>Add Protein</FormLabel>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Select an option"
              >
                {data?.map((item: any) => (
                  <option key={item?.id}>{item.name}</option>
                ))}
              </Select>
            </FormControl>
          </VStack>

          <Box mt="20px">
            <Text fontSize="xl" fontWeight="extrabold">
              NGN {parseInt(itemPrice) + parseInt(price) || parseInt(itemPrice)}
            </Text>
          </Box>

          <Divider orientation="horizontal" width="full" my="20px" />
          <HStack width={"full"} justifyContent={"space-between"}>
          {!isAddToCartBtnClicked ? (
            <Button colorScheme="blue" width={"30%"} onClick={handleAddToCart}>
              Add To Cart
            </Button>
          ) : (
            <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
              <Button colorScheme="blue" onClick={handleDecrement}>
                -
              </Button>
              <Text>{cartQuantity}</Text>
              <Button colorScheme="blue" onClick={handleIncrement}>
                +
              </Button>
            </Flex>
          )}

          <Button width={"30%"} colorScheme="green">
            <Link href="/cart_items">
              Go to Cart {cartQuantity > 0 ? cartQuantity : ''}
            </Link>
            
            </Button>
          </HStack>
          
        </Box>
      </Slide>
    </Box>
  );
};

export default ProteinBottomUp;
