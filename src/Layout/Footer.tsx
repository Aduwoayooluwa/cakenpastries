import { Box, Center, Divider, Flex, Link, Text, useBreakpointValue } from '@chakra-ui/react';

const Footer = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box bg="#16213E" textColor={"white"} px={10} height={{base:"500px", md:"200px"}} py={6}>
            <Flex direction={isMobile ? 'column' : 'row'} pt={"20px"} alignItems="center" justify={{base:"center", md:"space-between"}}>
            <Text fontSize={isMobile ? 'xl' : '2xl'} textColor="white" fontWeight="bold">
                Cake &amp; Pastries
            </Text>
            {/* <Divider my={"20px"} orientation={isMobile ? 'horizontal' : 'vertical'} mx={4} /> */}
            <Text my={{base:"20px", md:"0px"}} fontSize={{base:"sm", md:"md"}}>All rights reserved</Text>
            {/* <Divider my={"20px"} orientation={isMobile ? 'horizontal' : 'vertical'} mx={4} /> */}
            <Text my={{base:"20px", md:"0px"}} fontSize={{base:"sm", md:"md"}}>Stateline, SouthGate</Text>
            {/* <Divider my={"20px"} orientation={isMobile ? 'horizontal' : 'vertical'} mx={4} /> */}
            <Link my={{base:"20px", md:"0px"}} fontSize={{base:"sm", md:"md"}} color="white" href="#">
                Terms of Service
            </Link>
            </Flex>
        </Box>
    );
};

export default Footer;
