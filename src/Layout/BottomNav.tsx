import { Box, Flex, IconButton, Text, useBreakpointValue, VStack, Badge } from '@chakra-ui/react';
import { FiHome, FiGrid, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useAppStore, useAuthenticationStore } from '@/lib/store';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react'

const BottomNavigation = () => {
    const { isAuthenticated, userDetails } = useAuthenticationStore()

    const router = useRouter();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const {cart } = useAppStore()

    const [userDetail, setUserDetail] = useState<any>()
    const [isAuth, setIsAuth] = useState<string>()
    const [cartItems, setCartItems] = useState<any>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
        setUserDetail(localStorage.getItem('userDetails')!)
        setIsAuth(localStorage.getItem('isAuth')!)
        setCartItems(localStorage.getItem('cartItems')!)
        }
    }, [])

    const itemCount = cart.length;

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    return (
    <Box
        position={isMobile ? 'fixed' : 'relative'}
        bottom={0}
        left={0}
        right={0}
        zIndex={10}
        boxShadow="md"
        bg="white"
        display={{base:"inherit", md:"none"}}
        >
        <Flex justifyContent="space-around" py={2}>
            
            <VStack>
                <IconButton
                icon={<FiHome size={24} />}
                aria-label="Home"
                onClick={() => handleNavigation('/')}
                isActive={router.pathname === '/'}
                variant="ghost"
                colorScheme={router.pathname === '/' ? 'purple' : 'gray'}
                />
                <Text fontSize="md">Home</Text>
            </VStack>
            
            <VStack>
                <IconButton
                icon={<FiGrid size={24} />}
                aria-label="Categories"
                onClick={() => handleNavigation('/categories')}
                isActive={router.pathname === '/categories'}
                variant="ghost"
                colorScheme={router.pathname === '/categories' ? 'purple' : 'gray'}
                />
                <Text fontSize="md">Categories</Text>
            </VStack>
            
            <VStack>
            <Box position="relative">
                <IconButton
                    icon={<FiShoppingCart size={24} />}
                    aria-label="Cart"
                    onClick={() => handleNavigation('/cart_items')}
                    isActive={router.pathname === '/cart_items'}
                    variant="ghost"
                    colorScheme={router.pathname === '/cart_items' ? 'purple' : 'gray'}
                />
                <Badge
                    position="absolute"
                    top="-0.5"
                    right="-0.5"
                    bg={itemCount > 0 ? 'red.500' : 'transparent'}
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    borderRadius="full"
                    px={2}
                    py={1}
                    opacity={itemCount > 0 ? 1 : 0}
                    animation={itemCount > 0 ? 'blinking 1s infinite' : 'none'}
                >
                    {itemCount > 0 ? itemCount : ''}
                </Badge>
                </Box>
                <Text fontSize="md">Cart</Text>
            </VStack>
            
            {
                !isAuth && (
                    <VStack>
                    <IconButton
                        icon={<FiUser size={24} />}
                        aria-label="Login"
                        onClick={() => handleNavigation('/login')}
                        isActive={router.pathname === '/login'}
                        variant="ghost"
                        colorScheme={router.pathname === '/login' ? 'purple' : 'gray'}
                        />
                    <Text fontSize="md">Login</Text>
                </VStack>
                )
            }
        
            {
                isAuth === "true" && (
                    <>
                        <VStack>
                            <IconButton
                                icon={<FaUser size={24} />}
                                aria-label="profile"
                                onClick={() => handleNavigation('/profile')}
                                isActive={router.pathname === '/profile'}
                                variant="ghost"
                                    colorScheme={router.pathname === '/profile' ? 'purple' : 'gray'}
                                    />
                            <Text fontSize="md">Profile</Text>
                        </VStack>
                    </>
                )
            }
            
        </Flex>
        </Box>
    );
};

export default BottomNavigation;
