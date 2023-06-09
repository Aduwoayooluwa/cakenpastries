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
  useMediaQuery
} from '@chakra-ui/react';
import Image from 'next/image';
import useGetData from '@/hooks/useGetData';
import Link from 'next/link';
import Button from '@/components/buttons/button.component';
import { useAppStore } from '@/lib/store';
import { handleScoopDecrementQuantity, handleScoopIncrementQuantity, handleSelectChange, handleAddToCart } from '@/controller/protein.controller';
import { CartContext } from '@/context/CartContext';

const ProteinBottomUp = ({ isProteinVisible, setIsProteinVisible, itemName, itemImage, itemPrice, itemId, items, setProteinBarUp }: any) => {
  const { data } = useGetData(`https://backend.cakesandpastries.ng/api/menu/protein`);

  const [price, setPrice] = useState(parseInt(itemPrice) || 0);
  const [selectedOption, setSelectedOption] = useState('');
  const [cartQuantity, setCartQuantity] = useState(1);

  // number of plates
  const [plates, setPlates] = useState(parseInt(itemPrice) || 0);

  // cart
  const [cartItemsMap, setCartItemsMap] = useState(new Map());

  // handling scooping
  const [scoopQuan, setScoopQuantity] = useState(1);
  const [scoopPrice, setScoopPrice] = useState(parseInt(itemPrice) || 0);

  const { addToCart } = useAppStore();
  const [isAddToCartBtnClicked, setIsAddToCartBtnClicked] = useState(false);

  // context
  const { setCartItems } = useContext(CartContext);

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

  // const handleIncrement = () => {
  //   setCartQuantity((prevQuantity) => prevQuantity + 1);
  //   setPrice((prevPrice) => prevPrice + parseInt(itemPrice));
  //   setPlates((prevPlates) => prevPlates + parseInt(itemPrice));
  // };

  // const handleDecrement = () => {
  //   if (cartQuantity > 0) {
  //     setCartQuantity((prevQuantity) => prevQuantity - 1);
  //     setPrice((prevPrice) => prevPrice - parseInt(itemPrice));
  //     setPlates((prevPlates) => prevPlates - parseInt(itemPrice));
  //   }
  // };

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
              <Text textColor="black">Number of Scoop/Wrap</Text>
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
              <Text textColor="black">{scoopPrice}</Text>
            </VStack>
            <VStack spacing={2} width="full" align="start">
              <FormControl>
                <FormLabel>Add Protein</FormLabel>
                <Select
                  value={selectedOption}
                  onChange={(event) =>
                    handleSelectChange(event, itemPrice, data, setPlates, setSelectedOption, setScoopPrice) // Pass setScoopPrice as a prop
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
              {!isAddToCartBtnClicked ? (
                <Button
                  width="30%"
                  onClick={() => {
                    handleAddToCart(
                      items,
                      addToCart,
                      setIsAddToCartBtnClicked,
                      itemId,
                      setCartQuantity,
                      cartItemsMap,
                      setCartItemsMap
                    );

                    localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
                    localStorage.setItem(`${itemName}_price`, price.toString());
                  }}
                >
                  Add To Cart
                </Button>
              ) : (
                <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                  <Button disabled={true} width="full" p={'3px'}>
                    Added
                  </Button>
                </Flex>
              )}

              <Button onClick={() => {
                localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
                localStorage.setItem(`${itemName}_price`, price.toString());
              }} width="30%" colorScheme="green">
                <Link href="/cart_items">Go to Cart</Link>
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Box zIndex={1000} position="absolute" width="full" bottom="0" textColor="black" bg="white" p={4}>
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
            <Text textColor="black">Number of Scoop/Wrap</Text>
            <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
              <Button  disabled={cartQuantity  === 1} colorScheme="blue" onClick={() => handleScoopDecrementQuantity(scoopQuan, setScoopQuantity, setScoopPrice, parseInt(itemPrice))}>
                -
              </Button>
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
              setScoopPrice // Pass setScoopPrice as a prop
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
            {!isAddToCartBtnClicked ? (
              <Button  width="30%" onClick={() => {
                handleAddToCart(
                  items,
                  addToCart,
                  setIsAddToCartBtnClicked,
                  itemId,
                  setCartQuantity,
                  cartItemsMap,
                  setCartItemsMap
                );

                localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
                localStorage.setItem(`${itemName}_price`, price.toString());
              }}>
                Add To Cart
              </Button>
            ) : (
              <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
                {/* <Button disabled={cartQuantity === 1} colorScheme="blue" onClick={handleDecrement}>
                  -
                </Button>
                <Text>{cartQuantity}</Text>
                <Button colorScheme="blue" onClick={handleIncrement}>
                  +
                </Button> */}
                <Button  disabled={true} width="full" p={"3px"}>Added</Button>
              </Flex>
            )}

            <Button onClick={() => {
              localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
              localStorage.setItem(`${itemName}_price`, price.toString());
            }} width="30%" colorScheme="green">
              <Link href="/cart_items">Go to Cart</Link>
            </Button>
          </HStack>
        </Box>
      </Slide>
    </Box>
  );
};

export default ProteinBottomUp;
