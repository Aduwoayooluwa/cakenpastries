import React from 'react'
import { Box, VStack, Text  }  from "@chakra-ui/react"
type Props = {}

const ErrorFallbackRender = () => {
    return (
        <VStack justify={"center"} align="center" width="100%" padding={"20px"} height={"80vh"}>
            <Box shadow={"md"} border={"1px solid grey"}>
                <Box as="pre" textColor={"red"}>Something Went wrong</Box>
                <Text fontSize={"sm"}>An Error occured</Text>
            </Box>
        </VStack>
    )
}

export default ErrorFallbackRender