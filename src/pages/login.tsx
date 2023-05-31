import Login from '@/components/Auth/Login'
import { VStack } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const login = (props: Props) => {
    return (
        <>
            <VStack px={{base:"10px", md:"0px"}} minH={"100vh"} align={"center"} justify={"center"}>
                <Login />
            </VStack>
        </>
        
    )
}

export default login