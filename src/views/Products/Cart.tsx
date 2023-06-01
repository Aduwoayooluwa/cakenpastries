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
interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}


const CartPage = ({ cartItems }: any) => {
    const [address, setAddress] = useState('');
    const [subtotal, setSubtotal] = useState(0);

    const [items, setItems] = useState<CartItem[]>(cartItems);
    const [savedAddress, setSavedAddress] = useState('')

    //  mounting the application
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    const router = useRouter()


    // authentication
    let isAuth: any;
    let userInfo;

    if (typeof window !== 'undefined') {
        //const carts: any = Cookies.get(cartItems)
        //console.log(carts)
        isAuth = Cookies.get('isAuth') && JSON.parse(Cookies.get('isAuth')!)
        userInfo = Cookies.get('userDetails') && JSON.parse(Cookies.get('userDetails')!)
    }

    console.log(isAuth)

    const user_id = userInfo?.id

    // skeleton 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulating an API request delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setSavedAddress(localStorage.getItem('address')!)
    }, [])

    const order = useOrder()

    const handleIncrement = (item: CartItem) => {
        item.quantity += 1;
        setSubtotal((prevSubtotal) => prevSubtotal + item?.price);
        };
        
        const handleDecrement = (item: CartItem) => {
            if (item.quantity > 1) {
            item.quantity -= 1;
            setSubtotal((prevSubtotal) => prevSubtotal - item?.price);
            }
        };

    const calculateTotalPrice = () => {
        return items?.reduce((total, item) => total + item?.price * item?.quantity, 0);
    };


    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSaveAddress = () => {
        // Perform save address logic
        console.log('Address saved:', address);
        localStorage.setItem('address', address);
    };

    const handleProceedToPayment = () => {
        if (!isAuth) {
            router.push('/login')
            return;
        }
        // Perform proceed to payment logic
        console.log('Proceed to payment');
        const payload = {
            address,
            user_id,
            items: cartItems,
            payment_ref:"",
            amount: calculateTotalPrice()
        }
        console.log(payload);
        order.mutate(payload)

    };

    return (<>
        {
            mount && <Center width={"full"}>
            <Box p={4}>
            <Heading mb={4}>Cart</Heading>
            <VStack spacing={4} align="start">
                {cartItems?.map((item: any) => (
                    <Skeleton
                    key={item.id}
                    isLoaded={!loading}
                    fadeDuration={1}
                    >
                    <motion.div
                        
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    
                    >
                        <Box
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        width={{base:"300px", md:"500px"}}
                        textColor={"black"}
                        >
                        <Heading size="md">{item?.name}</Heading>
                        <HStack mt={2}>
                            <Button
                            size="sm"
                            onClick={() => handleDecrement(item)}
                            disabled={item?.quantity === 1}
                            >
                            -
                            </Button>
                            <Text>{item?.quantity }</Text>
                            <Button size="sm" onClick={() => handleIncrement(item)}>
                            +
                            </Button>
                        </HStack>
                        <Text mt={2}>Price: NGN {item?.price*item?.quantity}</Text>
                        </Box>
                    </motion.div>
                </Skeleton>
                ))}
            </VStack>
            <Divider my={4} />
            <Stack direction="column" spacing={4} align="start">
                <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                    type="text"
                    value={address || savedAddress }
                    onChange={handleAddressChange}
                />
                </FormControl>
                <Button bg="#EAEAFF"
            color="#000093"
            _hover={{ bg: "#000093", color: "#EAEAFF" }} onClick={handleSaveAddress}>
                Save Address
                </Button>
            </Stack>
            <Divider my={4} />
            <Box>
                <Text fontWeight="bold">Subtotal: NGN {calculateTotalPrice()}</Text>
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
            </Box>
            </Box>
        </Center>
        }
    </>
   
    
);
};

export default CartPage;
