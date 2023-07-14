import { useEffect, useState, useContext, useMemo } from 'react';
import {
    Box,
    Heading,
    VStack,
    HStack,
    Button,
    FormControl,
    FormLabel,
    Text,
    Divider,
    Center,
    Skeleton,
    Select,
    Stack,
    Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useOrder from '@/hooks/useOrder';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useAppStore } from '@/lib/store';
import { CartContext } from '@/context/CartContext';
import useGetData from '@/hooks/useGetData';
import { handleSelectLocationChange } from '@/controller/cartItems.controller';
import PaymentModal from './dialogs/PaymentModal';
import { toast } from 'react-hot-toast';
import usePayment from '@/hooks/usePayment';
import { useRedirectAfterAuth } from './helper';
import SuccessModal from './dialogs/SuccessModal';
import { ModalContext } from '@/context/ModalContext';
import usePostSubtotal from '@/hooks/usePostSubtotal';
import { AES, enc } from 'crypto-js';
import { service_key } from '@/utils/util';
import useConfirmOrder from '@/hooks/useConfirmOrder';

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    protein?: any
    category?: any
    protein_select?: any
    other_protein?: any
}

const CartPage = ({ cartItems }: any) => {
    //  location of delivery
    console.log(cartItems, 'cartItems')
    const { data } = useGetData(`https://backend.cakesandpastries.ng/api/locations/all`);

    const [subtotal, setSubtotal] = useState(0);

    // custom hook to redirect
    const { setOriginalUrl } = useRedirectAfterAuth()

    const removeItemId = (itemId: string) => {
        localStorage.removeItem(itemId)
    }

    const { _cartItems }: any = useContext(CartContext)

    const [items, setItems] = useState<CartItem[]>(cartItems);
    const [savedAddress, setSavedAddress] = useState('');

    console.log(items, 'items')
    const { removeFromCart, removeProteinfromCart } = useAppStore()

    //selected location
    const [selectedLocation, setSelectedLocation] = useState('');
    // address
    const [address, setAddress] = useState('')

    // dialog open and close
    const [isDialogVisible, setIsPaymentDialogVisible] = useState(false)
    // phone number
    const [phoneNumber, setPhoneNumber] = useState('')
    // bringing the success modal from the useContext
    const { isSuccessModalOpen, setIsSuccessModalOpen } = useContext(ModalContext)
    // order success notification
    const [orderSuccess, setOrderSuccess] = useState(false)

    // Mounting the application
    const router = useRouter();
    // removing the category object from the items array
    const itemsWithoutCategory = items?.map(({ category, ...rest }) => rest);
    // payment refrence 
    const staticId = Math.floor(Math.random() * 10000000000000) + Math.floor(Math.random() * 10000)
    //console.log(date.getTime())

    // Authentication
    let isAuth: any;
    let userInfo: any;

    // bringing proteinCart
    let proteinCart: any[] = []


    if (typeof window !== 'undefined') {
        isAuth = Cookies.get('isAuth') && JSON?.parse(Cookies.get('isAuth')!);
        userInfo = Cookies.get('userDetails') && JSON?.parse(Cookies.get('userDetails')!);
        proteinCart = Cookies.get('proteinCart') && JSON?.parse(Cookies.get('proteinCart')!);
    }

    let payment_ref = useMemo(() => Math.floor(Math.random() * 10000000000000) + Math.floor(Math.random() * 10000), [])

    // let payment_ref = staticId;

    //console.log(payment_ref)
    //console.log(isAuth);
    // const getPaymentRef = () => {
    //     const tx_ref = `${date.getTime()}`
    //     payment_ref = tx_ref
    // }

    const user_id = userInfo?.id;

    const [numberOfPlates, setNumberOfPlates] = useState(1)
    // Skeleton 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating an API request delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setSavedAddress(localStorage.getItem('address')!);
    }, []);


    // takeaway
    const takeaway = 210;

    const handleIncrement = (item: CartItem) => {
        const updatedQuantity = item?.quantity + 1;

        // Update the quantity in the items array
        const updatedItems = items.map((i) => {
            if (i.id === item.id) {
                return {
                    ...i,
                    quantity: updatedQuantity
                };
            }
            return i;
        });

        // Update the quantity in localStorage
        localStorage.setItem(`${item.name}_quantity`, updatedQuantity.toString());

        // Update the state variables
        setItems(updatedItems);
        console.log(getItemPrice(item?.name), 'getItemPrice(item?.name)')
        setSubtotal((prevSubtotal) => prevSubtotal + parseInt(getItemPrice(item?.name)!));
    };

    const handleDecrement = (item: CartItem) => {

        const updatedQuantity = item.quantity - 1;
        if (item.quantity > 1) {
            const updatedItems = items.map((i) => {
                if (i.id === item.id) {
                    return {
                        ...i,
                        quantity: updatedQuantity
                    };
                }
                return i;
            });
            localStorage.setItem(`${item?.name}_quantity`, updatedQuantity.toString());

            setItems(updatedItems);

            setSubtotal((prevSubtotal) => prevSubtotal - parseInt(getItemPrice(item?.name)!));
        }
    };


    // const calculateTotalPrice = () => {
    //     return items?.reduce((total, item) => total + item?.price * item?.quantity, 0);
    // };

    const calculateTotalPrice = () => {

        let totalPrice = 0

        return items?.reduce((total, item) => {

            let itemPrice = getItemPrice(`${item?.name}_price`) && parseInt(AES?.decrypt(getItemPrice(`${item.name}_price`)!, service_key)?.toString(enc.Utf8)) as number;
            //
            console.log(typeof itemPrice,'typeof itemPrice')
            if (typeof itemPrice=="number") {

                totalPrice += itemPrice
            }
            // 
            // 
            // const itemPrice = parseInt(getItemPrice(`${item.name}_quantity`)!) * parseInt(AES?.decrypt(getItemPrice(`${item.name}_price`)!, service_key).toString(enc.Utf8));
            //console.log('hello', itemPrice, total)

            console.log(totalPrice, 'itemPrice')
            return totalPrice;
            // return itemPrice;
            // return total + itemPrice;
        }, 0);
    };




    useEffect(() => {
        const total = calculateTotalPrice();
        setSubtotal(total);


    }, [items]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };



    const handleRemoveFromCart = (itemId: string, itemName?: string) => {
        setItems((prevItems) => prevItems.filter((item) => item?.id !== itemId));
        removeFromCart(itemId.toString());

        removeItemId(itemId)
        localStorage.removeItem(`${itemName}_quantity`)
        localStorage.removeItem(`${itemName}_price`)
    };

    const handleRemoveProteinFromCart = (itemId: string) => {
        removeProteinfromCart(itemId?.toString())
        console.log(itemId)
        //removeProteinfromCart(otherProteinId?.toString() || itemId.toString())
        //console.log('removed')
    }

    // delivery fee
    let [deliveryFeeAmount, setDeliveryFeeAmount] = useState(0)

    // hook to call order

    const order = useOrder(address, itemsWithoutCategory, payment_ref.toString(), (subtotal + takeaway + deliveryFeeAmount), userInfo?.name, phoneNumber, selectedLocation, deliveryFeeAmount, setOrderSuccess)

    // confirm order hook
    const confirmOrder = useConfirmOrder(payment_ref.toString())

    // payment with flutterwave hook
    const { closePaymentModal, handleFlutterPayment } = usePayment((subtotal + takeaway + deliveryFeeAmount), payment_ref.toString())

    // success notification
    const successNotification = () => toast('You have successfully ordered...')
    // error notification
    const errorNotification = (error: string) => toast(error)

    // API TO SEND THE SUBTOTAL TO SERVER
    const { handlePostSubtotal } = usePostSubtotal((subtotal + deliveryFeeAmount + takeaway))
    const handleProceedToPayment = () => {
        if (address === "" || phoneNumber === "") {
            setIsPaymentDialogVisible(true)
            return;
        }
        else if (selectedLocation === "") {
            toast("Please Select location", {
                style: {
                    color: "red"
                }
            })
            return;
        }
        else {
            if (!isAuth) {
                router.push('/login')
                return;
            }
            sessionStorage.setItem('subtotal', JSON.stringify(subtotal + deliveryFeeAmount + takeaway));
            order.mutate();
            //console.log(itemsWithoutCategory)

            handleFlutterPayment({
                callback: (response) => {
                    console.log(response, 'flutterwave response');
                    setTimeout(() => {
                        if (response?.status === 'successful' || 'completed') {
                            confirmOrder.mutate();
                            successNotification()
                            setOrderSuccess(true)
                            setIsSuccessModalOpen(true)
                            setTimeout(() => {
                                Cookies.remove('cartItems')
                                Cookies.remove('proteinCart')
                                localStorage.clear()
                                router.reload()
                                router.push('/')
                            }, 2000)


                        }
                        else {
                            errorNotification('error')
                        }
                    }, 3000)
                    closePaymentModal()

                },
                onClose: () => {
                    //console.log("Closed")
                }
            })
            return;

        }
    };

    // function to handle getting quantuty
    const getItemQuantity = (itemName: string) => {
        return localStorage.getItem(itemName)
    }

    const getItemPrice = (itemName: string) => {
        return localStorage.getItem(itemName)
    }





    return (
        <>

            <Center width={"full"}>
                <Box textColor="black" p={4}>
                    <Heading mb={4}>Cart</Heading>
                    <VStack spacing={4} align="start">
                        {items?.map((item: CartItem) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Box
                                    p={4}
                                    borderWidth={1}
                                    borderRadius="md"
                                    boxShadow="md"
                                    width={{ base: "300px", md: "500px" }}
                                    textColor={"black"}
                                >
                                    <Skeleton
                                        isLoaded={!loading}
                                        bg='white.500'
                                        color='white'
                                    >

                                        <Heading textColor={"black"} size="md">{item?.name} </Heading>



                                    </Skeleton>

                                    <Skeleton
                                        isLoaded={!loading}
                                        bg='white.500'
                                        color='white'
                                    >
                                        {/* <HStack textColor={"purple.500"} mt={2}>
                        <Button
                            size="sm"
                            onClick={() => handleDecrement(item)}
                            disabled={item?.quantity === 1}
                        >
                            -
                        </Button>
                        
                        <Text>{parseInt(getItemQuantity(`${item?.name}_quantity`)!)}</Text>
                        <Button size="sm" onClick={() => {handleIncrement(item)
                            
                        }}>
                            +
                        </Button>
                        </HStack> */}
                                        {/* <HStack mt="3" w="full" overflowX={"scroll"}>
                            {
                                proteinCart[0]?.map((protein: any) => {
                                    return(
                                        <Text textColor={"black"} fontSize={"xs"} key={protein?.id}>
                                            { protein?.foodId === item?.id && protein?.name }
                                        </Text>
                                    )
                                })
                            }
                        </ HStack> */}
                                    </Skeleton>

                                    <Skeleton
                                        isLoaded={!loading}
                                        bg='white.500'
                                        color='white'
                                        textColor={"black"}
                                    >
                                        <Flex mt={4} direction="column" align="start">
                                            {console.log(item, 'item')}
                                            {(item.protein?.map((item: any) => <>
                                                <Text mt={2}>
                                                    <b>
                                                        {item.name}:&#9;
                                                    </b>
                                                    NGN {item.price} QTY {item.quantity}
                                                </Text>
                                            </>))}
                                        </Flex>

                                        <Text mt={6}><b>
                                            {/* {console.log(item,'this is cart item')} */}
                                            Price: NGN {getItemPrice(`${item.name}_price`) && parseInt(AES?.decrypt(getItemPrice(`${item.name}_price`)!, service_key).toString(enc.Utf8))}
                                        </b>
                                        </Text>


                                        {/* <Text mt={2}>Price: NGN {parseInt(getItemPrice(`${item.name}_quantity`)!) * parseInt(AES?.decrypt(getItemPrice(`${item.name}_price`)!, service_key).toString(enc.Utf8))}</Text> */}
                                    </Skeleton>

                                    <Skeleton
                                        isLoaded={!loading}
                                        bg='white.500'
                                        color='white'
                                    >
                                        <Button
                                            mt={4}
                                            onClick={() => {
                                                handleRemoveFromCart(item?.id, item?.name)
                                                handleRemoveProteinFromCart(item?.id)
                                                //router.reload()
                                            }}
                                            disabled={address.trim() === ''}
                                            bg="red.600"
                                            color="#EAEAFF"
                                            _hover={{ bg: "red.700", color: "#EAEAFF" }}
                                        >
                                            Remove
                                        </Button>
                                    </Skeleton>
                                </Box>
                            </motion.div>
                        ))}
                    </VStack>
                    <Divider my={4} />
                    {/* <Stack direction="column" spacing={4} align="start">
                <Skeleton
                isLoaded={!loading}
                bg='white.500'
                color='white'
                >
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                    type="text"
                    value={address || savedAddress}
                    onChange={handleAddressChange}
                    textColor={"black"}
                    />
                </FormControl>
                </Skeleton>

                <Skeleton
                isLoaded={!loading}
                bg='white.500'
                color='white'
                >
                <Button
                    bg="#EAEAFF"
                    color="#000093"
                    _hover={{ bg: "#000093", color: "#EAEAFF" }}
                    onClick={handleSaveAddress}
                >
                    Save Address
                </Button>
                </Skeleton>
                </Stack> */}

                    <Divider my={4} />
                    <Box>

                        <Skeleton
                            isLoaded={!loading}
                            bg='white.500'
                            color='white'
                        >
                            <VStack mt="20px" spacing={2} textColor={"black"} width="full" align="start">
                                <FormControl>
                                    <FormLabel>Choose Location</FormLabel>
                                    <Select
                                        value={selectedLocation}
                                        onChange={(event) =>
                                            handleSelectLocationChange(
                                                event,
                                                subtotal,
                                                setSubtotal,
                                                data,
                                                setSelectedLocation,
                                                setDeliveryFeeAmount
                                            )
                                        }
                                        placeholder="Select your location"
                                    >
                                        {data?.map((item: any) => (
                                            <option key={item?.id}>{item?.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </VStack>
                        </Skeleton>

                        <Skeleton
                            isLoaded={!loading}
                            bg='white.500'
                            color='white'>
                            <Text textColor="black" mt="20px" fontSize={"sm"} fontWeight="medium">Takeaway: NGN {takeaway}</Text>

                            <Text textColor="black" mt="20px" fontSize={"sm"} fontWeight="medium">Delivery: NGN {deliveryFeeAmount}</Text>

                            <Text textColor="black" mt="20px" fontWeight="bold">Subtotal: NGN {subtotal + takeaway + deliveryFeeAmount}</Text>
                        </Skeleton>

                        <Skeleton
                            isLoaded={!loading}
                            bg='white.500'
                            color='white'>
                            <Button
                                mt={4}
                                onClick={() => {
                                    if (!address && !phoneNumber) {

                                    }
                                    handlePostSubtotal()
                                    handleProceedToPayment()


                                }}
                                disabled={selectedLocation.trim() === ""}
                                bg={"#000093"}
                                color={"#EAEAFF"}
                                _hover={{ bg: "#EAEAFF", color: "#000093" }}
                            >
                                {address && phoneNumber ? "Proceed to Payment" : "Add Address"}
                            </Button>
                        </Skeleton>

                    </Box>
                </Box>
            </Center >

            {
                isDialogVisible && (
                    <Box mx="20px">
                        <PaymentModal phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setAddress={setAddress} address={address} setIsPaymentDialogVisible={setIsPaymentDialogVisible}
                            isDialogVisible={isDialogVisible} />
                    </Box>
                )
            }

            {
                isSuccessModalOpen && (
                    <Box mx="20px">
                        <SuccessModal isOpen={isSuccessModalOpen} onClose={() => {
                            setIsSuccessModalOpen(false)
                        }} />
                    </Box>
                )
            }
        </>
    );
};

export default CartPage;