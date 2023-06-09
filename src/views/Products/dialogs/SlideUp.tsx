// import React from 'react'
// import { Box, Slide, Flex, Text, HStack, VStack, Divider, Select, FormLabel, FormControl } from '@chakra-ui/react'
// import Button from "@/components/buttons/button.component"
// import Image from "next/image"

// type Props = {
//     setIsProteinVisible: React.Dispatch<React.SetStateAction<boolean>>
//     setProteinBarUp: React.Dispatch<React.SetStateAction<boolean>>
//     isProteinVisible: boolean
//     handleSelectChange: () => any
// }

// const SlideUp = ({ isProteinVisible, setIsProteinVisible, setProteinBarUp, handleSelectChange}: Props) => {
//     return (
//         <Box zIndex={1000} position="absolute" width="full" bottom="0" textColor="black" bg="white" p={4}>
//         <Slide
//         in={isProteinVisible}
//         direction="bottom"
//         style={{ transition: 'height 0.3s ease-in-out' }}
//         >
//         <Box
//             bg="white"
//             p={4}
//             mt={4}
//             borderRadius="md"
//             shadow="md"
//             minHeight="400px"
//             overflowY="scroll"
//             width={{ base: 'full', md: '400px' }}
//         >
//             <Box w="full">
//             <HStack justifyContent="space-between">
//                 <Text fontSize="sm">Select Options</Text>
//                 <Box onClick={() => {
//                 setIsProteinVisible(false);
//                 setProteinBarUp(false);
//                 }}>Close</Box>
//             </HStack>
//             <Divider orientation="horizontal" width="full" my="20px" />
//             </Box>

//             <HStack my="20px">
//             <Box>
//                 <Image src={itemImage} alt="image" width={100} height={100} />
//             </Box>
//             <Text>{itemName}</Text>
//             </HStack>

//             {/* number of scoops */}
//             <VStack align="left" my="20px">
//             <Text textColor="black">Number of Scoop/Wrap</Text>
//             <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
//                 <Button  disabled={cartQuantity  === 1} colorScheme="blue" onClick={() => handleScoopDecrementQuantity(scoopQuan, setScoopQuantity, setScoopPrice, parseInt(itemPrice))}>
//                 -
//                 </Button>
//                 <Text>{scoopQuan}</Text>
//                 <Button colorScheme="blue" onClick={() => handleScoopIncrementQuantity(setScoopQuantity, setScoopPrice, parseInt(itemPrice))}>
//                 +
//                 </Button>
//             </Flex>
//             <Text textColor="black">{scoopPrice}</Text>
//             </VStack>
//             <VStack spacing={2} width="full" align="start">
//         <FormControl>
//         <FormLabel>Add Protein</FormLabel>
//         <Select
//             value={selectedOption}
//             onChange={(event) =>
//             handleSelectChange(
//                 event,
//                 itemPrice,
//                 data,
//                 setPlates,
//                 setSelectedOption,
//                 setScoopPrice // Pass setScoopPrice as a prop
//             )
//             }
//             placeholder="Select an option"
//         >
//             {data?.map((item: any) => (
//             <option key={item?.id}>{item?.name}</option>
//             ))}
//         </Select>
//         </FormControl>
//             </VStack>

//             <Box mt="20px">
//             <Text fontSize="xl" fontWeight="extrabold">
//                 NGN {scoopPrice}
//             </Text>
//             </Box>

//             <Divider orientation="horizontal" width="full" my="20px" />
//             <HStack width="full" justifyContent="space-between">
//             {!isAddToCartBtnClicked ? (
//                 <Button  width="30%" onClick={() => {
//                 handleAddToCart(
//                     items,
//                     addToCart,
//                     setIsAddToCartBtnClicked,
//                     itemId,
//                     setCartQuantity,
//                     cartItemsMap,
//                     setCartItemsMap
//                 );

//                 localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
//                 localStorage.setItem(`${itemName}_price`, price.toString());
//                 }}>
//                 Add To Cart
//                 </Button>
//             ) : (
//                 <Flex my="10px" justifyContent="space-between" alignItems="center" width="40%">
//                 {/* <Button disabled={cartQuantity === 1} colorScheme="blue" onClick={handleDecrement}>
//                     -
//                 </Button>
//                 <Text>{cartQuantity}</Text>
//                 <Button colorScheme="blue" onClick={handleIncrement}>
//                     +
//                 </Button> */}
//                 <Button  disabled={true} width="full" p={"3px"}>Added</Button>
//                 </Flex>
//             )}

//             <Button onClick={() => {
//                 localStorage.setItem(`${itemName}_quantity`, cartQuantity.toString());
//                 localStorage.setItem(`${itemName}_price`, price.toString());
//             }} width="30%" colorScheme="green">
//                 <Link href="/cart_items">Go to Cart</Link>
//             </Button>
//             </HStack>
//         </Box>
//         </Slide>
//     </Box>
//     )
// }

// export default SlideUp

const a =''
console.log(a)