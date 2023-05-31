import { useState } from 'react';
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
  Center
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

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

    const handleIncrement = (item: CartItem) => {
        item.quantity += 1;
        setSubtotal((prevSubtotal) => prevSubtotal + item.price);
        };
        
        const handleDecrement = (item: CartItem) => {
            if (item.quantity > 1) {
            item.quantity -= 1;
            setSubtotal((prevSubtotal) => prevSubtotal - item.price);
            }
        };

    const calculateTotalPrice = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };


    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSaveAddress = () => {
        // Perform save address logic
        console.log('Address saved:', address);
    };

    const handleProceedToPayment = () => {
        // Perform proceed to payment logic
        console.log('Proceed to payment');
    };

    return (
    <Center width={"full"}>
        <Box p={4}>
        <Heading mb={4}>Cart</Heading>
        <VStack spacing={4} align="start">
            {cartItems.map((item: any) => (
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
                width={{base:"300px", md:"500px"}}
                >
                <Heading size="md">{item.name}</Heading>
                <HStack mt={2}>
                    <Button
                    size="sm"
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity === 1}
                    >
                    -
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button size="sm" onClick={() => handleIncrement(item)}>
                    +
                    </Button>
                </HStack>
                <Text mt={2}>Price: NGN {item.price}</Text>
                </Box>
            </motion.div>
            ))}
        </VStack>
        <Divider my={4} />
        <Stack direction="column" spacing={4} align="start">
            <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
                type="text"
                value={address}
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
    
  );
};

export default CartPage;
