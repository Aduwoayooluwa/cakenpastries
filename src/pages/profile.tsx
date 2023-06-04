import { Box, Avatar, Text, Skeleton, SkeletonCircle, Divider, VStack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

    const ProfilePage = () => {
    const user = {
        name: '',
        email: '',
        role: 'User',
        address: '',
        phone: '',
        country: 'Nigeria',
        city: 'Akure'
    };

    let userInfo = user;
    if (typeof window !== 'undefined') {
        userInfo = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')!) : null;
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <VStack align={{base:"start", md:"center"}} width="full">
        <Box minH={{ base: "100vh", md: "100vh" }} pt={"100px"} px={4}>
            <SkeletonCircle isLoaded={!loading}>
            <Avatar mb={"20px"} size="xl" name={userInfo?.name} src="/default-avatar.jpg" />
            </SkeletonCircle>
            
            <Box my="40px">
            <Divider orientation="horizontal" />
            </Box>
            
            <Skeleton isLoaded={!loading}>
            <Text fontSize="xl" fontWeight="bold" mt={4}>
                {userInfo.name}
            </Text>
            </Skeleton>
            
            <Skeleton isLoaded={!loading}>
            <Text mt={2}>Email: {userInfo?.email}</Text>
            </Skeleton>
            
            <Skeleton isLoaded={!loading}>
            <Text mt={2}>Role: {userInfo?.role}</Text>
            </Skeleton>
            
            <Skeleton isLoaded={!loading}>
            <Text mt={2}>Address: {userInfo?.address || null}</Text>
            </Skeleton>
            
            <Skeleton isLoaded={!loading}>
            <Text mt={2}>Phone Number: {userInfo.phone || null}</Text>
            </Skeleton>
            
            <Skeleton isLoaded={!loading}>
            <Text mt={2}>City: {userInfo?.city || null}</Text>
            </Skeleton>
            
            <Skeleton isLoaded={!loading}>
            <Text mt={2}>Country: {userInfo?.country || "Nigeria"}</Text>
            </Skeleton>
        </Box>
        </VStack>
    );
};

export default ProfilePage;
