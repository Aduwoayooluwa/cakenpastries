import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Slide,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Divider,
  HStack,
  useMediaQuery,
  Button as Btn

} from '@chakra-ui/react';
import Image from 'next/image';
import useGetData from '@/hooks/useGetData';
import Link from 'next/link';
import Button from '@/components/buttons/button.component';
import { useAppStore } from '@/lib/store';
import { handleScoopDecrementQuantity, handleScoopIncrementQuantity, handleSelectChange, handleAddToCart } from '@/controller/protein.controller';
import { CartContext } from '@/context/CartContext';
import { AES } from "crypto-js"
import { service_key } from '@/utils/util';


const ProteinBottomUp = ({ isProteinVisible, setIsProteinVisible, itemName, itemImage, itemPrice, itemId, items, setProteinBarUp, itemMeasure }: any) => {
  const { data } = useGetData(`https://backend.cakesandpastries.ng/api/menu/protein`);

  const [price, setPrice] = useState(parseInt(itemPrice) || 0);
  const [selectedOption, setSelectedOption] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0);

  // number of plates
  const [plates, setPlates] = useState(parseInt(itemPrice) || 0);

  // cart
  const [cartItemsMap, setCartItemsMap] = useState(new Map());

  // handling scooping
  let [scoopQuan, setScoopQuantity] = useState(1);
  const [scoopPrice, setScoopPrice] = useState(parseInt(itemPrice) || 0);

  const { addToCart, proteinCart } = useAppStore();
  const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState(false);

  useEffect(() => {
    const isItemAddedToCart = localStorage.getItem(itemId);
    setIsAddToCartBtnClicked(!!isItemAddedToCart);
  }, [itemId]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItemsMap(new Map(parsedCartItems));
    }
  }, []);

  useEffect(() => {
    const totalPrice = cartQuantity === 1 ? scoopPrice : plates + scoopPrice;
    setPrice(totalPrice);
  }, [cartQuantity, plates, scoopPrice]);

  useEffect(() => {
    const storedCartItems = Array.from(cartItemsMap);
    localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
  }, [cartItemsMap]);

  const [isMediumDevice] = useMediaQuery("(min-width: 768px)");

  if (isMediumDevice) {
    return (
      <Modal isOpen={isProteinVisible} onClose={() => {
        setIsProteinVisible(false)
        setProteinBarUp(false)
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="full">
              <HStack justifyContent="space-between">
                <Text fontSize="sm">Select Options</Text>
                <Box
                  onClick={() => {
                    setIsProteinVisible(false);
                    setProteinBarUp(false);
                  }}
                >
                  Close
                </Box>
              </HStack>
              <Divider orientation="horizontal" width="full" my="20px" />
            </Box>

            <HStack my="20px">
              <Box>
                <Image src={itemImage} alt="image" width={100} height={100} />
              </Box>
              <Text>{itemName}</Text>
            </HStack>

            {/* number of scoops */}
            <VStack align="left" my="20px">
            <Text textColor="black">How many {itemMeasure}?</Text>
              <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                <Button
                  disabled={cartQuantity === 1}
                  colorScheme="blue"
                  onClick={() =>
                    handleScoopDecrementQuantity(scoopQuan, setScoopQuantity, setScoopPrice, parseInt(itemPrice))
                  }
                >
                  -
                </Button>
                <Text>{scoopQuan}</Text>
                <Button colorScheme="blue" onClick={() => handleScoopIncrementQuantity(setScoopQuantity, setScoopPrice, parseInt(itemPrice))}>
                  +
                </Button>
              </Flex>
              {/* <Text textColor="black">{scoopPrice}</Text> */}
            </VStack>
            <VStack spacing={2} width="full" align="start">
              <FormControl>
                <FormLabel>Add Protein</FormLabel>
                <Select
                  value={selectedOption}
                  onChange={(event) =>{

                    handleSelectChange(event, itemPrice, data, setPlates, setSelectedOption, setScoopPrice, items, proteinCart) // Pass setScoopPrice as a prop
                  
                    console.log(items)
                  }
                  }
                  placeholder="Select an option"
                >
                  {data?.map((item: any) => (
                    <option key={item?.id}>{item?.name}</option>
                  ))}
                </Select>
              </FormControl>
            </VStack>

            <Box mt="20px">
              <Text fontSize="xl" fontWeight="extrabold">
                NGN {scoopPrice}
              </Text>
            </Box>

            <Divider orientation="horizontal" width="full" my="20px" />
            <HStack width="full" justifyContent="space-between">
            <Button onClick={() => {
              localStorage.setItem(`${itemName}_quantity`, scoopQuan.toString());
              localStorage.setItem(`${itemName}_price`, AES.encrypt(scoopPrice.toString(), service_key).toString());
            }} width="30%" colorScheme="green">
              <Link href="/cart_items">Go to Cart</Link>
            </Button>

            {!isAddToCartBtnClicked ? (
              <Btn _hover={{background: "#EAEAFF", textColor:"blue"}} width="30%" bg="blue" textColor="white" onClick={() => {
                handleAddToCart(  
                  items,
                  addToCart,
                  setIsAddToCartBtnClicked,
                  itemId,
                  setCartQuantity,
                  cartItemsMap,
                  setCartItemsMap
                );

                localStorage.setItem(`${itemName}_quantity`, scoopQuan.toString());
                localStorage.setItem(`${itemName}_price`, AES.encrypt(scoopPrice.toString(), service_key).toString());
              }}>
                Add To Cart
              </Btn>
            ) : (
              <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                {/* <Button disabled={cartQuantity === 1} colorScheme="blue" onClick={handleDecrement}>
                  -
                </Button>
                <Text>{cartQuantity}</Text>
                <Button colorScheme="blue" onClick={handleIncrement}>
                  +
                </Button> */}
                
              </Flex>
            )}
          </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Box zIndex={1000} opacity={1} position="absolute" width="full" bottom="0" textColor="black" bg="white" p={4}>
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
              <Box onClick={() => {
                setIsProteinVisible(false);
                setProteinBarUp(false);
              }}>Close</Box>
            </HStack>
            <Divider orientation="horizontal" width="full" my="20px" />
          </Box>

          <HStack my="20px">
            <Box>
              <Image src={itemImage} alt="image" width={100} height={100} />
            </Box>
            <Text>{itemName}</Text>
          </HStack>

          {/* number of scoops */}
          <VStack align="left" my="20px">
            <Text textColor="black">How many {itemMeasure}?</Text>
            <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                <Btn
                  size="sm"
                  onClick={() => {
                    handleScoopDecrementQuantity(scoopQuan, setScoopQuantity, setScoopPrice, parseInt(itemPrice))
                    
                    }}
                  disabled={true}
                >
                -
              </Btn>
              <Text>{scoopQuan}</Text>
              <Button colorScheme="blue" onClick={() => handleScoopIncrementQuantity(setScoopQuantity, setScoopPrice, parseInt(itemPrice))}>
                +
              </Button>
            </Flex>
            <Text textColor="black">{scoopPrice}</Text>
          </VStack>
          <VStack spacing={2} width="full" align="start">
      <FormControl>
        <FormLabel>Add Protein</FormLabel>
        <Select
          value={selectedOption}
          onChange={(event) =>
            handleSelectChange(
              event,
              itemPrice,
              data,
              setPlates,
              setSelectedOption,
              setScoopPrice, // Pass setScoopPrice as a prop,
              items,
              proteinCart
            )
          }
          placeholder="Select an option"
        >
          {data?.map((item: any) => (
            <option key={item?.id}>{item?.name}</option>
          ))}
        </Select>
      </FormControl>
          </VStack>

          <Box mt="20px">
            <Text fontSize="xl" fontWeight="extrabold">
              NGN {scoopPrice}
            </Text>
          </Box>

          <Divider orientation="horizontal" width="full" my="20px" />
          <HStack width="full" justifyContent="space-between">
            <Button onClick={() => {
              localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
              localStorage.setItem(`${itemName}_price`, AES.encrypt(scoopPrice.toString(), service_key).toString());
            }} width="30%" colorScheme="green">
              <Link href="/cart_items">Go to Cart</Link>
            </Button>

            {!isAddToCartBtnClicked ? (
              <Btn  width="30%" bg="blue" textColor="white" onClick={() => {
                handleAddToCart(
                  items,
                  addToCart,
                  setIsAddToCartBtnClicked,
                  itemId,
                  setCartQuantity,
                  cartItemsMap,
                  setCartItemsMap
                );

                localStorage.setItem(`${itemName}_quantity`, scoopQuan.toString());
                localStorage.setItem(`${itemName}_price`, AES.encrypt(scoopPrice.toString(), service_key).toString());
                
              }}>
                Add To Cart
              </Btn>
            ) : (
              <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                {/* <Button disabled={cartQuantity === 1} colorScheme="blue" onClick={handleDecrement}>
                  -
                </Button>
                <Text>{cartQuantity}</Text>
                <Button colorScheme="blue" onClick={handleIncrement}>
                  +
                </Button> */}
                {/* <Button  disabled={true} width="full" p={"3px"}>Added</Button> */}
              </Flex>
            )}
          </HStack>
        </Box>
      </Slide>
    </Box>
  );
};

export default ProteinBottomUp;
