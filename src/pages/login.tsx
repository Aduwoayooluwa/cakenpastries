import Login from '@/components/Auth/Login'
import { useAuthenticationStore } from '@/lib/store'
import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import gsap from 'gsap'

type Props = {}

const Signin = (props: Props) => {
    const router = useRouter()


        // gsap animation
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
        tl.fromTo('.page-background', { x: 0 }, { x: '-100%', duration: 8, ease: 'power2' });
    }, []);

    
    
    return (
        <>
            <VStack backdropBlur={"20px"} bg="whiteAlpha.200" px={{base:"10px", md:"0px"}} minH={"100vh"} align={"center"} justify={"center"}>
                    {/* <motion.div
                        className="page-background"
                        style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to right, #A3E7FC, #76A6EF)',
                        filter: 'blur(20px)',
                        opacity: 0.5,
                        }}
                    /> */}
                <Login />
            </VStack>
        </>
        
    )
}

export default Signin