import RegisterPage from '@/components/Auth/Register'
import { useAuthenticationStore } from '@/lib/store'
import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {}

const Register = (props: Props) => {
    const router = useRouter()
    const { isAuthenticated } = useAuthenticationStore()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [router, isAuthenticated])
    return (
        <>
            <VStack px={{base:"10px", md:"0px"}} minH={"100vh"} align={"center"} justify={"center"}>
                <RegisterPage />
            </VStack>
        </>
        
    )
}

export default Register