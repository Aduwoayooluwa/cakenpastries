import { useEffect, useState } from 'react';
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
    Skeleton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useOrder from '@/hooks/useOrder';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useAppStore } from '@/lib/store';

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

const CartPage = ({ cartItems }: any) => {
    const [address, setAddress] = useState('');
    const [subtotal, setSubtotal] = useState(0);
    console.log(cartItems)
    //const getItemId = localStorage.getItem('')
    // add to cart button clicked

    const removeItemId = (itemId:string) => {
        localStorage.removeItem(itemId)
    }
    

    const [items, setItems] = useState<CartItem[]>(cartItems);
    const [savedAddress, setSavedAddress] = useState('');

    const { removeFromCart } = useAppStore()

    // Mounting the application
    const router = useRouter();

    // payment refrence 
    const date = new Date()
    console.log(date.getTime())
    

    // Authentication
    let isAuth: any;
    let userInfo;

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

    const order = useOrder();

    const handleIncrement = (item: CartItem) => {
        const updatedQuantity = item.quantity + 1;
      
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
            setSubtotal((prevSubtotal) => prevSubtotal - item.price);
        }
    };
    

    const calculateTotalPrice = () => {
        return items?.reduce((total, item) => total + item?.price * item?.quantity, 0);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSaveAddress = () => {
        console.log('Address saved:', address);
        localStorage.setItem('address', address);
    };

    const handleRemoveFromCart = (itemId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item?.id !== itemId));
        removeFromCart(itemId.toString());
        removeItemId(itemId)
    };
    

    const handleProceedToPayment = () => {
        if (!isAuth) {
        router.push('/login');
        return;
        }

        const payload = {
        address,
        user_id,
        items: cartItems,
        payment_ref,
        amount: calculateTotalPrice()
        };

        order.mutate(payload);
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
                        <Button size="sm" onClick={() => handleIncrement(item)}>
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
                        onClick={() => handleRemoveFromCart(item?.id)}
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
                <Stack direction="column" spacing={4} align="start">
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
                </Stack>

                <Divider my={4} />
                <Box>

                <Skeleton
                isLoaded={!loading}
                bg='white.500'
                color='white'>
                    <Text textColor="black" fontWeight="bold">Subtotal: NGN {calculateTotalPrice()}</Text>
                </Skeleton>
                
                <Skeleton
                isLoaded={!loading}
                bg='white.500'
                color='white'>
                    <Button
                    mt={4}
                    onClick={handleProceedToPayment}
                    disabled={address.trim() === ''}
                    bg="#EAEAFF"
                    color="#000093"
                    _hover={{ bg: "#000093", color: "#EAEAFF" }}
                    >
                        Proceed to Payment
                    </Button>
                </Skeleton>

                </Box>
            </Box>
            </Center>
    
        </>
    );
};

export default CartPage;
