import { Box, Flex, HStack, VStack, IconButton, Input, Text, useBreakpointValue, Badge } from '@chakra-ui/react';
import { FiMenu, FiInfo, FiLayers, FiUser, FiLogIn, FiSearch, FiShoppingCart } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthenticationStore } from '@/lib/store';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

const Navbar = (props: Props) => {
    const { isAuthenticated, userDetails } = useAuthenticationStore()
    const [userDetail, setUserDetail] = useState<any>()
    const [isAuth, setIsAuth] = useState<string>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
        setUserDetail(localStorage.getItem('userDetails')!)
        setIsAuth(localStorage.getItem('isAuth')!)
        }
    }, [])
    
    //console.log(JSON.parse(userDetail).name)
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { cart } = useAppStore()
    const router = useRouter()
    const itemCount = cart.length
    
    const handleNavigation = (route: string) => {
        router.push(route);
    };
    return (
        <Flex
        as="nav"
        align="center"
        justify="space-between"
        px={[4, 8, 16]}
        py={4}
        bg="white"
        color="gray.800"
        shadow={"md"}
        position={"fixed"}
        width={"full"}
        zIndex={20}
        >
        <Text fontSize="lg" fontWeight="bold">
            <Link href="/">Cakes & Pastries</Link>
            
        </Text>

        {isMobile ? (
            <Box>
            {/* Search bar component */}
            <Input
                type="text"
                placeholder="Search..."
                size="md"
                bg="white"
                color="gray.800"
                borderRadius="md"
                px={4}
                py={2}
                _placeholder={{ color: 'gray.400' }}
                _focus={{ outline: 'none', boxShadow: 'outline' }}
            />
            </Box>
        ) : (
            <HStack spacing={4}>
            {/* Search bar component */}
            <Input
                type="text"
                placeholder="Search..."
                bg="white"
                color="gray.800"
                borderRadius="md"
                px={4}
                py={2}
                _placeholder={{ color: 'gray.400' }}
                _focus={{ outline: 'none', boxShadow: 'outline' }}
            />

            {/* Menu items */}
            <HStack spacing={2}>
                <HStack spacing={1}>
                <IconButton
                    aria-label="Info"
                    icon={<FiInfo />}
                    size="lg"
                    variant="ghost"
                    colorScheme="gray.800"
                />
                <Text fontSize="lg">Info</Text>
                </HStack>
                <HStack spacing={1}>
                <IconButton
                    aria-label="Categories"
                    icon={<FiLayers />}
                    size="lg"
                    variant="ghost"
                    colorScheme="gray.800"
                />
                <Text fontSize="lg">Categories</Text>
                </HStack>
                {/* start not auth */}
                {
                    !isAuthenticated || !isAuth && (
                        <>
                        <Link href="/login">
                            <HStack spacing={1}>
                            <IconButton
                                aria-label="Login"
                                icon={<FiUser />}
                                size="lg"
                                variant="ghost"
                                colorScheme="gray.800"
                            />
                            
                            <Text fontSize="lg">Login</Text>
                            </HStack>
                            </Link>
                            <Link href="/register">
                            <HStack spacing={1}>
                            <IconButton
                            aria-label="Register"
                            icon={<FiLogIn />}
                            size="lg"
                            variant="ghost"
                            colorScheme="gray.800"
                        />
                        <Text fontSize="lg">Register</Text>
                        </HStack>
                        </Link>
                        
                        </>
                    )
                }
                {
                    isAuthenticated || isAuth  && (
                        <>
                        <Link href={"/"}>
                            <HStack spacing={1}>
                            <IconButton
                                aria-label="Profile"
                                icon={<FiUser />}
                                size="lg"
                                variant="ghost"
                                colorScheme="gray.800"
                            />
                            <Text fontSize="lg">{JSON.parse(userDetail).name}</Text>
                            </HStack>
                        </Link>
                        
                        </>
                    )
                }
                
                {/* end not auth */}
                <HStack  spacing={1}>
                <HStack position={"relative"} spacing={1}>
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
                    <VStack direction={"column"} top={"-10px"} right={0} position={"absolute"} bg="red" align={"center"} justify="center" width={"30px"} height="30px" borderRadius={"100%"}>
                        <Text textAlign="center" size="sm" textColor={"white"}>{cart?.length}</Text>
                    </VStack>
                </HStack>
                
                
                <Text fontSize="lg"><Link href="/cart_items">Cart</Link></Text>
                </HStack>
            </HStack>
            </HStack>
        )}
        </Flex>
    );
};

export default Navbar;
