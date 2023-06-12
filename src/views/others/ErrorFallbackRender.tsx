import React from 'react'
import { Box, VStack, Text  }  from "@chakra-ui/react"
type Props = {}

const ErrorFallbackRender = () => {
    return (
        <VStack bg="white" justify={"center"} align="center" width="100%" padding={"20px"} height={"100vh"}>
            <Box shadow={"md"} border={"1px solid grey"}>
                <Box as="pre" p={"20px"} textColor={"red"}>Something Went wrong</Box>
                <Text textAlign={"center"} textColor={"black"} fontSize={"sm"}>An Error occured</Text>
            </Box>
        </VStack>
    )
}

export default ErrorFallbackRender