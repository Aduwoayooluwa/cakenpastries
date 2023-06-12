import { useEffect, useState, useContext } from 'react';
import {
    Box,
    Heading,
    VStack,
    HStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    Divider,
    Stack,
    Center,
    Skeleton,
    Select
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

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    protein?: string
    category?: any
}

const CartPage = ({ cartItems }: any) => {
    //  location of delivery
    const { data } = useGetData(`https://backend.cakesandpastries.ng/api/locations/all`);

    const [subtotal, setSubtotal] = useState(0);
    
    // custom hook to redirect
    const { setOriginalUrl } = useRedirectAfterAuth()

    const removeItemId = (itemId:string) => {
        localStorage.removeItem(itemId)
    }
    
    const { _cartItems }: any = useContext(CartContext)

    const [items, setItems] = useState<CartItem[]>(cartItems);
    const [savedAddress, setSavedAddress] = useState('');


    const { removeFromCart, calculateSubtotal } = useAppStore()

    //selected location
    const [selectedLocation, setSelectedLocation] = useState('');
        // address
    const [address, setAddress] = useState('')

    // dialog open and close
    const [isDialogVisible, setIsPaymentDialogVisible] = useState(false)
    // phone number
    const [phoneNumber, setPhoneNumber] = useState('')
    // success modal 
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    // order success notification
    const [orderSuccess, setOrderSuccess] = useState(false)

    // Mounting the application
    const router = useRouter();

    // payment refrence 
    const date = new Date()
    console.log(date.getTime())
    

    // Authentication
    let isAuth: any;
    let userInfo: any;

    if (typeof window !== 'undefined') {
        isAuth = Cookies.get('isAuth') && JSON.parse(Cookies.get('isAuth')!);
        userInfo = Cookies.get('userDetails') && JSON.parse(Cookies.get('userDetails')!);
    }

    const payment_ref = `${date.getTime()} `
    console.log(payment_ref)
    console.log(isAuth);

    const user_id = userInfo?.id;

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
    const takeaway = 200;

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
            localStorage.setItem(`${item.name}_quantity`, updatedQuantity.toString());
            
            setItems(updatedItems);
            setSubtotal((prevSubtotal) => prevSubtotal - parseInt(getItemPrice(item?.name)!));
        }
    };
    

    // const calculateTotalPrice = () => {
    //     return items?.reduce((total, item) => total + item?.price * item?.quantity, 0);
    // };

    const calculateTotalPrice = () => {
            return items?.reduce((total, item) => {
            const itemPrice = item?.quantity * parseInt(getItemPrice(`${item.name}_price`)!);
            return total + itemPrice;
            }, 0);
    };
        


    useEffect(() => {
        const total = calculateTotalPrice();
        setSubtotal(total);
    }, [items]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };



    const handleRemoveFromCart = (itemId: string, itemName?:string) => {
        setItems((prevItems) => prevItems.filter((item) => item?.id !== itemId));
        removeFromCart(itemId.toString());
        removeItemId(itemId)
        localStorage.removeItem(`${itemName}_quantity`)
        localStorage.removeItem(`${itemName}_price`)
    };
    
    // delivery fee
    let [deliveryFeeAmount, setDeliveryFeeAmount] = useState(0)

     // hook to call order

    const order = useOrder(address, items, payment_ref, (subtotal+takeaway+deliveryFeeAmount), userInfo?.name, phoneNumber, selectedLocation, setOrderSuccess)

    // payment with flutterwave hook
    const { closePaymentModal, handleFlutterPayment } = usePayment((subtotal + takeaway + deliveryFeeAmount))

    const handleProceedToPayment = () => {
        const itemsWithoutCategory = items.map(({ category, ...rest }) => rest);
        console.log(itemsWithoutCategory)
        if (address==="" || phoneNumber==="") {
            setIsPaymentDialogVisible(true)
            return;
        }
        else if (selectedLocation==="") {
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
            sessionStorage.setItem('subtotal', JSON.stringify(subtotal+deliveryFeeAmount+takeaway));
            console.log(itemsWithoutCategory)
            handleFlutterPayment({
                    callback: (response) => {
                        console.log(response);
                        setTimeout(() => {
                            if (response?.status === 'successful') {
                                
                                order.mutate();
                                setIsSuccessModalOpen(true)
                                Cookies.remove('cartItems')
                                setTimeout(() => {
                                    router.reload()
                                    localStorage?.clear()
                                }, 2000)
                                
                            }
                        }, 3000)
                        closePaymentModal()
                        
                    },
                    onClose: () => {
                        console.log("Closed")
                    }
                })
            return;
        }
    };

    // function to handle getting quantuty
    const getItemQuantity = (itemName: any) => {
        return localStorage.getItem(itemName)
    }

    const getItemPrice = (itemName: any) => {
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
                        <Heading textColor={"black"} size="md">{item?.name}</Heading>
                        </Skeleton>

                        <Skeleton
                        isLoaded={!loading}
                        bg='white.500'
                        color='white'
                        >
                        <HStack textColor={"purple.500"} mt={2}>
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
                        </HStack>
                        </Skeleton>

                        <Skeleton
                            isLoaded={!loading}
                            bg='white.500'
                            color='white'
                            textColor={"black"}
                            >
                        <Text mt={2}>Price: NGN {item?.quantity * parseInt(getItemPrice(`${item?.name}_price`)!)}</Text>
                        </Skeleton>

                        <Skeleton
                            isLoaded={!loading}
                            bg='white.500'
                            color='white'
                            >
                        <Button
                        mt={4}
                        onClick={() => handleRemoveFromCart(item?.id, item?.name)}
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
                    <Text textColor="black" mt="20px" fontSize={"sm"} fontWeight="medium">Takeaway: NGN 200</Text>

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
            </Center>
            
            {
                isDialogVisible && (
                    <Box mx="20px">
                        <PaymentModal phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setAddress={setAddress} address={address} setIsPaymentDialogVisible={setIsPaymentDialogVisible} 
                        isDialogVisible={isDialogVisible}/>
                    </Box>
                )            }

                {
                    isSuccessModalOpen && (
                        <Box mx="20px">
                            <SuccessModal isOpen={isSuccessModalOpen} onClose={() => {
                                setIsSuccessModalOpen(false)
                            }}/>
                        </Box>
                    )
                }
        </>
    );
};

export default CartPage;
