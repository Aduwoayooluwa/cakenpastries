import RegisterPage from '@/components/Auth/Register'
import { VStack } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const login = (props: Props) => {
    return (
        <>
            <VStack px={{base:"10px", md:"0px"}} minH={"100vh"} align={"center"} justify={"center"}>
                <RegisterPage />
            </VStack>
        </>
        
    )
}

export default login