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
  Button as Btn,
  Stack

} from '@chakra-ui/react';
import Image from 'next/image';
import useGetData from '@/hooks/useGetData';
import Link from 'next/link';
import Button from '@/components/buttons/button.component';
import { useAppStore } from '@/lib/store';
import { handleScoopDecrementQuantity, handleScoopIncrementQuantity, handleSelectChange, handleAddToCart, handleRemoveProtein } from '@/controller/protein.controller';
import { CartContext } from '@/context/CartContext';
import { AES } from "crypto-js"
import { service_key } from '@/utils/util';
import ItemQuantity from './components/ItemQuantity';
import AddProteinModal from './dialogs/AddProteinModal';
import Cookies from 'js-cookie';


const ProteinBottomUp = ({ isProteinVisible, setIsProteinVisible, itemName, itemImage, itemPrice, itemId, items, setProteinBarUp, itemMeasure }: any) => {
  const { data } = useGetData(`https://backend.cakesandpastries.ng/api/menu/protein`);

  const [price, setPrice] = useState(parseInt(itemPrice) || 0);
  const [selectedOption, setSelectedOption] = useState('');
  // additonal protein
  const [selectedProteinChange, setselectedProteinChange] = useState('')
  // quantity of selected option or protein
  const [selectedProteinQuantity, setSelectedProteinQuantity] = useState(1)
  // selected protein price
  const [selectedProteinProce, setslectedProteinPrice] = useState(1)
  const [initialProteinPrice, setInitialProteinPrice] = useState(1)
  // add more protein state
  const [addMoreProteinDialog, setAddMoreProteinDialog] = useState<boolean>(false)

  const [cartQuantity, setCartQuantity] = useState(0);

  // number of plates
  const [plates, setPlates] = useState(parseInt(itemPrice) || 0);

  // number of plates to be ordered is 1 by default here. to increase the number, user will get to the cart page
  const [numberOfPlates, setNumberOfPlates] = useState(1)
  // cart
  const [cartItemsMap, setCartItemsMap] = useState(new Map());

  // protein array
  const [selectedProteinArray, setSelectedProteinArray] = useState<any[]>([])
  // normal protein details
  const [proteinDetails, setProteinDetails] = useState<any>()
  // more protein details
  const [selectedAdditionalProtein, setSelectedAdditionalProtein] = useState<any>()

  // handling scooping
  let [scoopQuan, setScoopQuantity] = useState(1);
  const [scoopPrice, setScoopPrice] = useState(parseInt(itemPrice) || 0);
  // total protein Price 
  const [totalProteinPrice, setTotalProteinPrice] = useState(0)

  let { addToCart, proteinCart, cart } = useAppStore();
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

  interface IProteinData {
    id: string;
    name: string;
    price: string;
    quantity: number
  }
  const [proteinItems, setProteinItems] = useState<any>([])

  const [singleOrderData, setSingleOrderData] = useState<any>()

 
  const handleSaveProtein = (event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemName = event.target.value
    const filteredData = data.filter((item: any) => item.name == selectedItemName)
    const itemIsPresent = proteinItems.filter((item: any) => item.name == selectedItemName)

    var proteinData = {
      vid: proteinItems.length + 1,
      id: filteredData[0]?.id,
      name: filteredData[0]?.name,
      price: filteredData[0]?.price,
      quantity: 1
    }

    if (itemIsPresent.length == 0) {
      setProteinItems((prev: any) => [...prev, proteinData])
    }

  }


  const handleSetRemoveProtein = (item: any) => {

    const filteredData = proteinItems.filter((data: any) => data?.name !== item?.name)
    filteredData.sort((a:any, b:any) => a.vid - b.vid);
    setProteinItems(filteredData)
  }

  const decrementSingleProtein = (item: any) => {
    const selectedItem = proteinItems.filter(
      (data: any) => data.name == item.name
    );

    const filteredItem = proteinItems.filter(
      (data: any) => data.name != item.name
    );
    const selectedPrice = data.filter(
      (singleData: any) => singleData?.name == item.name
    )[0].price

    if (selectedItem[0].quantity !== 1) {

      selectedItem[0].quantity -= 1;
      selectedItem[0].price -= Math.abs(parseInt(selectedPrice))

      const finalData = [...filteredItem, selectedItem[0]]
      finalData.sort((a:any, b:any) => a.vid - b.vid);

      setProteinItems(finalData)
    }
  }

  const incrementSingleProtein = (item: any) => {

    const selectedItem = proteinItems.filter(
      (data: any) => data?.name == item.name
    );

    const copySelectedItem = data.filter(
      (singleData: any) => singleData?.name == item.name
    )[0].price

    selectedItem[0].quantity += 1;
    selectedItem[0].price = parseInt(copySelectedItem) * parseInt(selectedItem[0].quantity);
    const filteredItem = proteinItems.filter(
      (data: any) => data?.name != item.name
    );
    const finalData = [...filteredItem, selectedItem[0]]
    finalData.sort((a:any, b:any) => a.vid - b.vid);

    setProteinItems(finalData)
  }


  const calculatePrices = () => {
    const copyProteinItems = proteinItems.filter((item: any) => item.name !== '')
    return copyProteinItems.map((data: any) => parseInt(data.price)).reduce(function (a:any, b:any) { return a + b; }, 0)
  }

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
                {/* <Text fontSize="sm">Select Options</Text>
                <Box
                  onClick={() => {
                    setIsProteinVisible(false);
                    setProteinBarUp(false);
                  }}
                >
                  Close
                </Box> */}
              </HStack>
              {/* <Divider orientation="horizontal" width="full" my="20px" /> */}
            </Box>

            <HStack my="5px">
              <Box>
                <Image src={itemImage} alt="image" width={200} height={200} />
              </Box>
              <Text>{itemName}</Text>
            </HStack>

            {/* number of scoops */}
            <VStack align="left" >
              <Text textColor="black">How many scoops? </Text>
              {/* <Text textColor="black">How many Scoops? {itemMeasure}?</Text> */}
              <ItemQuantity
                scoopQuan={scoopQuan} setScoopQuantity={setScoopQuantity}
                setScoopPrice={setScoopPrice} itemPrice={itemPrice}
                items={items}
              />

            </VStack>
            <VStack spacing={2} width="full" align="start">
              <FormControl>
                <FormLabel>Add Proteins</FormLabel>
                <Select
                  value={selectedOption}
                  onChange={(event) => {
                    handleSaveProtein(event)

                    handleSelectChange(
                      event,
                      itemPrice,
                      data,
                      setPlates,
                      setSelectedOption,
                      setScoopPrice, // Pass setScoopPrice as a prop,
                      items,
                      proteinCart,
                      cart,
                      scoopQuan,
                      setProteinDetails,
                      setslectedProteinPrice,
                      setInitialProteinPrice,
                      setSelectedProteinQuantity,
                      selectedProteinQuantity,
                      setSelectedProteinArray,
                      selectedProteinArray

                    )
                  }
                  }
                  placeholder="Select an option"
                >
                  {data?.map((item: any) => (
                    <option key={item?.id}>{item?.name} </option>
                  ))}
                </Select>
              </FormControl>

              {/* display proteins */}
              <Stack w="full" p="4" maxH="200px" overflowY={"scroll"}>
                {proteinItems.map((item: any, index: number) => (
                  <>
                    {item.name.length > 0 &&


                      <VStack w="full" key={index}>

                        <HStack w="full" justify={"space-between"}>

                          <Text w="full">{item?.name && item?.name}</Text>
                          <Flex my="3px" justifyContent="space-between" alignItems="center" width="40%">
                            <Button onClick={() => decrementSingleProtein(item)}>
                              -
                            </Button>
                            <Text mx="3">{item?.quantity}</Text>
                            <Button onClick={() => incrementSingleProtein(item)}>
                              +
                            </Button>
                          </Flex>
                          <Flex>
                            <Btn onClick={() => {
                              handleSetRemoveProtein(item)
                            }} colorScheme="red">X</Btn>
                          </Flex>
                        </HStack>
                      </VStack>
                    }

                  </>
                ))}
                {/* {
                  selectedProteinArray?.map((protein, index) => {
                    return (
                      <VStack w="full" key={index}>
                        <HStack w="full" justify={"space-between"}>
                          <Text w="full">{protein?.name}</Text>

                          <ItemQuantity
                            setProteinItemsState={setProteinItems}
                            proteinItemsState={proteinItems}
                            scoopQuan={selectedProteinQuantity} setScoopQuantity={setSelectedProteinQuantity}
                            scoopPrice={parseFloat(protein?.price)}
                            setScoopPrice={setslectedProteinPrice} itemPrice={parseFloat(protein?.price)}
                            items={protein} selectedProteinArray={selectedProteinArray}
                          />

                          <Flex>
                            <Btn onClick={() => {
                              handleRemoveProtein(protein?.id, selectedProteinArray, setSelectedProteinArray, scoopPrice, itemPrice, setslectedProteinPrice)
                            }} colorScheme="red">X</Btn>
                          </Flex>


                        </HStack>


                      </VStack>
                    )
                  })
                } */}
              </Stack>

              {/* add more protein section */}
            </VStack>
            <Box mt="20px">
              <Text fontSize="xl" fontWeight="extrabold">
                {/* NGN {scoopPrice + (selectedProteinProce === 1 ? 0 : selectedProteinProce)} */}
                NGN: {calculatePrices() + scoopPrice}

              </Text>
              {/* <Text>{totalProteinPrice}</Text> */}
            </Box>

            <Divider orientation="horizontal" width="full" my="20px" />
            <HStack width="full" justifyContent="flex-end">
              {/* <Button onClick={() => {
                // localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
                // localStorage.setItem(`${itemName}_price`, AES.encrypt((scoopPrice + (selectedProteinProce === 1 ? 0 : selectedProteinProce)).toString(), service_key).toString());
              }} width="30%" colorScheme="green">
                <Link href="/cart_items">Go to Cart</Link>
              </Button> */}


              {!isAddToCartBtnClicked ? (
                <Btn _hover={{ background: "#EAEAFF", textColor: "blue" }} width="30%" bg="blue" textColor="white" onClick={() => {
                  handleAddToCart(
                    items,
                    addToCart,
                    setIsAddToCartBtnClicked,
                    itemId,
                    setCartQuantity,
                    cartItemsMap,
                    setCartItemsMap,
                    scoopQuan,
                    proteinItems
                  );
                  localStorage.setItem(`${itemName}_quantity`, scoopQuan.toString());
                  localStorage.setItem(`${itemName}_price`, AES.encrypt((scoopPrice + calculatePrices()).toString(), service_key).toString());
                  proteinCart.push(selectedProteinArray)
                  Cookies.set('proteinCart', JSON.stringify(proteinItems.filter((item: any) => item.name != "")))
                }}>
                  Add To Cart
                </Btn>
              ) : (
                <Flex justifyContent="space-between" alignItems="center" >
                  <Link href="/cart_items">
                  <Btn onClick={() => {
                  }} colorScheme="green">
                    Go to Cart
                  </Btn>
                    </Link>


                </Flex>
              )}
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal >
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
          <VStack align="left" >
            <Text textColor="black">How many {itemMeasure || 'scoop'}?</Text>
            <ItemQuantity
              scoopQuan={scoopQuan} setScoopQuantity={setScoopQuantity}
              setScoopPrice={setScoopPrice} itemPrice={itemPrice}
              items={items}
            />
            {/* <Text textColor="black">{scoopPrice}</Text> */}
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
                    proteinCart,
                    cart,
                    scoopQuan,
                    setProteinDetails,
                    setslectedProteinPrice,
                    setInitialProteinPrice,
                    setSelectedProteinQuantity,
                    selectedProteinQuantity,
                    setSelectedProteinArray,
                    selectedProteinArray
                  )
                }
                placeholder="Select an option"
              >
                {
                  data?.map((item: any) => (
                    <option key={item?.id}>{item?.name}</option>
                  ))}
              </Select>
            </FormControl>
            {/* display proteins */}
            <Stack w="full" p="4" maxH="200px" overflowY={"scroll"}>
              {
                selectedProteinArray?.map((protein, index) => {
                  return (
                    <VStack w="full" key={index}>
                      <HStack w="full" justify={"space-between"}>
                        <Text w="full">{protein?.name}</Text>

                        <ItemQuantity
                          scoopQuan={protein?.quantity} setScoopQuantity={setSelectedProteinQuantity}
                          scoopPrice={parseFloat(protein?.price)}
                          setScoopPrice={setslectedProteinPrice} itemPrice={parseFloat(protein?.price)}
                          items={protein} selectedProteinArray={selectedProteinArray}
                        />

                        <Flex>
                          <Btn onClick={() => {
                            handleRemoveProtein(protein?.id, selectedProteinArray, setSelectedProteinArray, scoopQuan, itemPrice, setslectedProteinPrice)
                          }} colorScheme="red">X</Btn>
                        </Flex>

                      </HStack>
                    </VStack>
                  )
                })
              }
            </Stack>

          </VStack>

          {/* protein Quantity */}

          <Box mt="20px">
            <Text fontSize="xl" fontWeight="extrabold">
              NGN {scoopPrice + (selectedProteinProce === 1 ? 0 : selectedProteinProce)}
            </Text>
          </Box>

          <Divider orientation="horizontal" width="full" my="20px" />
          <HStack width="full" justifyContent="space-between">
            <Button onClick={() => {
              // localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
              // localStorage.setItem(`${itemName}_price`, AES.encrypt((scoopPrice + selectedProteinProce).toString(), service_key).toString());
            }} width="30%" colorScheme="green">
              <Link href="/cart_items">Go to Cart</Link>
            </Button>

            {!isAddToCartBtnClicked ? (
              <Btn width="30%" bg="blue" textColor="white" onClick={() => {
                handleAddToCart(
                  items,
                  addToCart,
                  setIsAddToCartBtnClicked,
                  itemId,
                  setCartQuantity,
                  cartItemsMap,
                  setCartItemsMap,
                  scoopQuan
                );
                localStorage.setItem(`${itemName}_quantity`, scoopQuan.toString());
                localStorage.setItem(`${itemName}_price`, AES.encrypt((scoopPrice + (selectedProteinProce === 1 ? 0 : selectedProteinProce)).toString(), service_key).toString());
                proteinCart.push(selectedProteinArray)
                Cookies.set('proteinCart', JSON.stringify(proteinCart))
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
